import { ChevronLeft, ChevronRight } from 'lucide-react';
import FeedItem from './feed-item';
import CourseCard from './course-card';
import { Button } from '@/components/ui/button';
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

export default function ActivityFeed({ activities, courses = [] }: ActivityFeedProps) {
    const [filter, setFilter] = useState<'all' | 'courses' | 'events'>('all');

    const filterOptions = [
        { value: 'all', label: 'Todos' },
        { value: 'events', label: 'Eventos' },
        { value: 'courses', label: 'Cursos' },
    ] as const;

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

    return (
        <div className="space-y-6">
            {/* Filter Header */}
            <div className="flex items-center gap-4">
                <div className="h-[2px] bg-gradient-to-r from-gray-600 to-transparent flex-grow rounded-full"></div>
                <Select value={filter} onValueChange={(value) => setFilter(value as 'all' | 'courses' | 'events')}>
                    <SelectTrigger className="w-40">
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

            {/* Próximos Eventos */}
            {(filter === 'all' || filter === 'events') && (
                <div>
                    {/* <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Próximos Eventos
                    </h3> */}

                    <div className="flex flex-col items-center gap-6">
                        {upcoming.length > 0 ? (
                            upcoming.map((activity) => (
                                <FeedItem key={activity.id} activity={activity} />
                            ))
                        ) : (
                            <div className="text-center py-10 w-full text-gray-500">
                                <p>No hay eventos proximos</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="space-y-8">
                {/* Cursos Disponibles */}
                {(filter === 'all' || filter === 'courses') && courses.length > 0 && (
                    <div className="space-y-4">
                        {/* <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Cursos Disponibles
                        </h3> */}
                        <div className="flex flex-col items-center gap-6">
                            {courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </div>
                )}


                {/* Empty State */}
                {filter === 'courses' && courses.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        <p>No hay cursos disponibles</p>
                    </div>
                )}
            </div>
        </div>
    );
}
