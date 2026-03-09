import ArticleCard from './article-card';
import VideoCard from './video-card';
import EventCard from './event-card';
import WallpaperCard from './wallpaper-card';
import CourseCard from './course-card';

interface Activity {
    id: number;
    user: {
        id: number;
        name: string;
        avatar?: string;
    };
    type: string;
    subject_type: string;
    subject: any;
    created_at: string;
}

interface FeedItemProps {
    activity?: Activity;
    course?: any;
    filter?: 'all' | 'courses' | 'events' | 'articles' | 'videos';
}

export default function FeedItem({ activity, course, filter = 'all' }: FeedItemProps) {
    if (course) {
        if (filter !== 'all' && filter !== 'courses') return null;
        return <CourseCard course={course} />;
    }

    if (!activity) return null;

    const { type, subject_type } = activity;

    const isVideo = type === 'created_video';
    const isArticle = type === 'created_article';
    const isWallpaper = type === 'created_wallpaper';
    const isEvent = subject_type?.includes('Event') || subject_type?.includes('Story');

    // Apply filtering logic at the item level
    if (filter === 'courses') return null;
    if (filter === 'events' && !isEvent) return null;
    if (filter === 'articles' && !isArticle) return null;
    if (filter === 'videos' && !isVideo) return null;
    if (filter === 'all' && !isEvent && !isArticle && !isVideo && !isWallpaper) return null;

    if (isVideo) {
        return <VideoCard activity={activity} />;
    }

    if (isArticle) {
        return <ArticleCard activity={activity} />;
    }

    if (isWallpaper) {
        return <WallpaperCard activity={activity} />;
    }

    return <EventCard activity={activity} />;
}