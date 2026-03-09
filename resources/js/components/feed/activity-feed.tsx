import FeedItem from './feed-item';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface ActivityFeedProps {
    activities: {
        data: any[];
        links: any[];
    };
    courses?: {
        id: number;
        title: string;
        description: string;
        cover_image: string;
        slug: string;
        instructor: {
            name: string;
            avatar: string;
        };
        modules_count: number;
    }[];
}

export type ActivityFilterType = 'all' | 'courses' | 'events' | 'articles' | 'videos';

export default function ActivityFeed({ activities, courses = [] }: ActivityFeedProps) {
    const [filter, setFilter] = useState<ActivityFilterType>('all');

    const filterOptions: { value: ActivityFilterType; label: string }[] = [
        { value: 'all', label: 'All' },
        { value: 'events', label: 'Events' },
        { value: 'courses', label: 'Courses' },
        { value: 'articles', label: 'Articles' },
        { value: 'videos', label: 'Videos' },
    ];

    if (!activities.data.length) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>No activity yet. Be the first to create something!</p>
            </div>
        );
    }

    const now = new Date();

    const upcoming = activities.data.filter((activity) => {
        // No es Evento → siempre mostrar
        if (!activity.subject_type?.includes('Event')) return true;

        // Sin subject → ocultar
        if (!activity.subject) return false;

        const subj = activity.subject;
        const now = new Date();

        // Caso 1: tiene end_date → debe estar vigente o futuro
        if (subj.end_date) {
            const end = new Date(subj.end_date);
            if (Number.isNaN(end.getTime())) return true; // fecha inválida → fallback mostrar
            return end > now;
        }

        // Caso 2: tiene start_date pero no end_date
        if (subj.start_date) {
            const start = new Date(subj.start_date);
            if (Number.isNaN(start.getTime())) return true;
            return start > now;           // o >= now si querés incluir los que empiezan "ahora"
        }

        // Caso 3: sin fechas → fallback (acá decidís)
        return true;   // o return false; si preferís ocultarlos
    });

    const feedItems = [
        ...upcoming.map((activity) => ({ type: 'activity', id: `act-${activity.id}`, data: activity })),
        ...courses.map((course) => ({ type: 'course', id: `course-${course.id}`, data: course })),
    ].sort((a, b) => {
        const dateA = new Date(a.data.created_at || 0).getTime();
        const dateB = new Date(b.data.created_at || 0).getTime();
        return dateB - dateA; // Descending
    });

    return (
        <div className="space-y-6 w-full">
            {/* Filter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 my-8">
                <div className="flex items-center gap-4 flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 shrink-0">Feed</h3>
                    <div className="h-[1px] bg-gradient-to-r from-white to-transparent flex-grow rounded-full hidden sm:block"></div>
                </div>
                <Select value={filter} onValueChange={(value) => setFilter(value as ActivityFilterType)}>
                    <SelectTrigger className="w-full sm:w-40 bg-background/50 backdrop-blur-sm border-2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {filterOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Combined Feed Content */}
            <div className="space-y-8 w-full">
                <div className="flex flex-col items-stretch w-full gap-6">
                    {feedItems.map((item) => (
                        <FeedItem
                            key={item.id}
                            activity={item.type === 'activity' ? item.data : undefined}
                            course={item.type === 'course' ? item.data : undefined}
                            filter={filter}
                        />
                    ))}
                </div>

                {/* Fallback for empty state based on arrays (doesn't account for filter results returning null, but preserves structure) */}
                {feedItems.length === 0 && (
                    <div className="text-center py-10 w-full text-gray-500">
                        <p>No hay contenido para mostrar</p>
                    </div>
                )}
            </div>
        </div>
    );
}
