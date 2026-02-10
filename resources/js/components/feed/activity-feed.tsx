
import FeedItem from './feed-item';

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
            {activities.data.map((activity) => (
                <FeedItem key={activity.id} activity={activity} />
            ))}

            {/* Pagination Loading / Infinite Scroll trigger could go here */}
        </div>
    );
}
