
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle2, Heart, MessageCircle, MoreHorizontal, Share2, Video, Calendar, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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
    activity: Activity;
}

export default function FeedItem({ activity }: FeedItemProps) {
    const { user, subject, type, created_at } = activity;

    // Determine icon and content based on type
    const isEvent = type === 'created_event';
    const isArticle = type === 'created_article';
    const isVideo = type === 'created_video';

    if (!subject) return null; // Handle deleted subjects

    return (
        <Card className="border-none bg-white shadow-sm dark:bg-gray-900 overflow-hidden mb-6">
            <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6 pb-2">
                <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 border-2 border-emerald-50 dark:border-gray-800">
                        <AvatarImage src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold text-gray-900 dark:text-gray-100">{user.name}</span>
                            <CheckCircle2 className="h-3.5 w-3.5 fill-blue-500 text-white" />
                            <span className="text-gray-500 font-normal">
                                {isEvent && 'created an event'}
                                {isArticle && 'published an article'}
                                {isVideo && 'shared a video'}
                            </span>
                        </div>
                        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                            {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
                        </span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {subject.title}
                </h3>

                {subject.description && (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base line-clamp-3">
                        {subject.description || subject.excerpt}
                    </p>
                )}

                {/* Media Preview - Placeholder for now or use actual images if available */}
                <div className="relative aspect-video w-full rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 dark:border-gray-800 dark:bg-gray-800">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        {isEvent && <Calendar className="h-12 w-12 opacity-20" />}
                        {isArticle && <FileText className="h-12 w-12 opacity-20" />}
                        {isVideo && <Video className="h-12 w-12 opacity-20" />}
                    </div>
                    {/* If we had images: <img src={...} /> */}
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-4 mt-4 md:mt-6">
                    <div className="flex gap-1 md:gap-4">
                        <Button variant="ghost" className="text-gray-500 hover:text-red-500 font-bold gap-2 text-xs">
                            <Heart className="h-4 w-4 md:h-5 md:w-5" />
                            Like
                        </Button>
                        <Button variant="ghost" className="text-gray-500 hover:text-blue-500 font-bold gap-2 text-xs">
                            <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                            Comment
                        </Button>
                        <Button variant="ghost" className="text-gray-500 hover:text-emerald-500 font-bold gap-2 text-xs">
                            <Share2 className="h-4 w-4 md:h-5 md:w-5" />
                            Share
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
