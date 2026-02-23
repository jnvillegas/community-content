import { ChevronLeft, ChevronRight } from 'lucide-react';
import FeedItem from './feed-item';
import { Button } from '@/components/ui/button';

interface ActivityFeedProps {
    activities: {
        data: any[];
        links: any[];
    };
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
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
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Próximos Eventos
            </h3>

            <div className="flex flex-col items-center gap-6">
                {upcoming.map((activity) => (
                    <FeedItem key={activity.id} activity={activity} />
                ))}
            </div>
        </div>
    );
}