import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Calendar, MessageCircle, Share2, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import EventModal from './EventModal';
import StoryModal from './StoryModal';

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
    const { user, subject, type } = activity;
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Determine content type
    const isEvent = activity.subject_type.includes('Event');
    const isStory = activity.subject_type.includes('Story');
    const isArticle = activity.subject_type.includes('Article');

    if (!subject) return null;

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation(); // Don't trigger modal
        let url = '';
        if (isEvent) url = `/events/${subject.id}/like`;
        else if (isStory) url = `/stories/${subject.id}/like`;

        if (!url) return;

        router.post(url, {}, {
            preserveScroll: true,
        });
    };

    const handleCardClick = () => {
        if (isEvent || isStory) {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <Card
                onClick={handleCardClick}
                className="group relative border-none bg-[#111] overflow-hidden mb-12 w-full max-w-[780px] mx-auto h-[350px] rounded-[3rem] shadow-2xl transition-all duration-700 hover:shadow-black/60 cursor-pointer"
            >
                {/* Full Background Image */}
                <div className="absolute inset-0 z-0">
                    {subject.cover_image || subject.content_url ? (
                        <img
                            src={subject.cover_image || subject.content_url}
                            alt={subject.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#2a3a2a] to-[#111]" />
                    )}
                    {/* Visual Depth Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-20 h-full flex flex-col pl-2 pr-2 md:pr-6 md:pl-6 lg:pr-8 lg:pl-8 pointer-events-none">

                    {/* Top Section: Author & Location */}
                    <div className="flex items-center gap-4 pointer-events-auto shrink-0">
                        <div className="h-14 w-14 rounded-full border-2 border-white/40 overflow-hidden shadow-2xl ring-2 ring-white/10">
                            <img
                                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                alt={user.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-xl font-bold text-white leading-tight drop-shadow-md">
                                {user.name}
                            </h4>
                            <span className="text-sm font-semibold text-white/70 drop-shadow-md">
                                {isEvent ? (subject.location || 'tucuman') : 'Artículo'}
                            </span>
                        </div>
                    </div>

                    {/* Right Side: Action Tower */}
                    <div className="absolute right-10 top-22 -translate-y-1/2   flex flex-col items-center gap-2 pointer-events-auto">
                        <div className="flex flex-col items-center group/action cursor-pointer">
                            <button
                                onClick={handleLike}
                                className={`drop-shadow-lg transition-all transform active:scale-125 ${subject.is_liked ? 'text-red-500 scale-110' : 'text-white group-hover/action:text-red-500'}`}
                            >
                                <Heart className={`h-7 w-7 ${subject.is_liked ? 'fill-current' : ''}`} />
                            </button>
                            <span className="text-xs font-bold text-white/80 mt-1 drop-shadow-md">
                                {subject.likes_count || 0}
                            </span>
                        </div>

                        <div className="flex flex-col items-center group/action cursor-pointer">
                            <button className="text-white drop-shadow-lg group-hover/action:text-blue-400 transition-colors">
                                <MessageCircle className="h-7 w-7" />
                            </button>
                            <span className="text-xs font-bold text-white/80 mt-1 drop-shadow-md">
                                {subject.comments_count || subject.comments?.length || 0}
                            </span>
                        </div>

                        <div className="flex flex-col items-center group/action cursor-pointer">
                            <button
                                onClick={(e) => e.stopPropagation()}
                                className="text-white drop-shadow-lg group-hover/action:text-white transition-opacity"
                            >
                                <Share2 className="h-7 w-7 opacity-80 group-hover:opacity-100" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom-Left Section: Title and Date */}
                    <div className="mt-auto space-y-2 pointer-events-auto max-w-[99%] ml-2">
                        {/* Title: 22px Left Aligned */}
                        <h3 className="text-[22px] md:text-2xl max-w-[80%] font-bold text-white leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                            {subject.title}
                        </h3>

                        {/* Footer Row: Divider + Date */}
                        <div className="flex flex-col gap-2 ">
                            <div className="h-[1px] w-full bg-white/20" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-white drop-shadow-lg">
                                    <Calendar className="h-5 w-5 " />
                                    <span className="text-lg font-bold">
                                        {isEvent && subject.start_date
                                            ? `${format(new Date(subject.start_date), "d MMM", { locale: es })} - ${subject.end_date ? format(new Date(subject.end_date), "d MMM", { locale: es }) : format(new Date(subject.start_date), "d MMM", { locale: es })}`
                                            : 'Contenido Disponible'}
                                    </span>
                                </div>

                                <Link
                                    onClick={(e) => e.stopPropagation()}
                                    href={isEvent ? `/events/${subject.slug}` : `/articles/${subject.slug}`}
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/40 "
                                >
                                    <MapPin className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {isEvent && (
                <EventModal
                    event={subject}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            {isStory && (
                <StoryModal
                    story={subject}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}
