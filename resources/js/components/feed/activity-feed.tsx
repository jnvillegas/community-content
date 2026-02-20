
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FeedItem from './feed-item';
import { Button } from '@/components/ui/button';

interface ActivityFeedProps {
    activities: {
        data: any[];
        links: any[]; // For pagination
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

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Próximos Eventos</h3>

            <div className='flex flex-col items-center gap-6'>
                {activities.data.map((activity) => (
                    <FeedItem key={activity.id} activity={activity} />
                ))}
            </div>
        </div>
    );
}
