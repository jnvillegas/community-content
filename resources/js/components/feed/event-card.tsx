import { Heart, Calendar, Clock, MapPin, ArrowRight, MessageCircle, Share2, Bookmark, Share, Share2Icon, Calendar1, Calendar1Icon, Clock1, Clock2, BookmarkIcon, Send, SendHorizonal } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import EventModal from './EventModal';
import StoryModal from './StoryModal';

export default function EventCard({ activity }: { activity: any }) {
    const { subject } = activity;
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!subject) return null;

    const isEvent = activity.subject_type === 'App\\Models\\Event';
    const isStory = activity.subject_type === 'App\\Models\\Story';

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        let url = '';
        if (isEvent) url = `/events/${subject.id}/like`;
        else if (isStory) url = `/stories/${subject.id}/like`;
        if (!url) return;

        router.post(url, {}, { preserveScroll: true });
    };

    const handleCardClick = () => {
        if (isEvent || isStory) {
            setIsModalOpen(true);
        }
    };

    const likesCount = subject.likes_count || 0;
    const commentsCount = subject.comments_count || subject.comments?.length || 0;

    return (
        <>
            <article className="glass-card bg-card rounded-xl overflow-hidden group transition-all duration-500 p-5">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                    {subject.cover_image || subject.content_url ? (
                        <Link href={subject.slug ? `/events/${subject.slug}` : '#'} >
                            <img
                                src={subject.cover_image || subject.content_url}
                                alt={subject.title}
                                className="w-full h-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-102"
                            />
                        </Link>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#000000] to-[#0f0f0f]" />
                    )}

                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-zinc-900/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10">
                            {subject.type}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-6">
                    <div className="flex items-center gap-4 md:gap-4">
                        <button
                            onClick={handleLike}
                            className={`flex bg-background p-2 rounded-2xl border-2 border-solid border-border cursor-pointer items-center gap-2 transition-all ${subject.is_liked
                                ? 'text-red-400 scale-105'
                                : 'text-zinc-800 hover:text-red-400 dark:text-white dark:hover:text-red-400'
                                }`}
                        >
                            <Heart
                                className={`h-6 w-6 ${subject.is_liked ? 'fill-current' : ''}`}
                            />
                            <span className="text-sm font-semibold">{likesCount}</span>
                        </button>

                        <Link href={subject.slug ? `/events/${subject.slug}` : '#'} className="flex items-center bg-background p-2 rounded-2xl border-2 border-solid border-border gap-2 text-zinc-800 dark:text-white transition-colors bg-background p-2 rounded-2xl">
                            <MessageCircle className="h-6 w-6" />
                            <span className="text-sm font-semibold">{commentsCount}</span>
                        </Link>

                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="flex bg-background p-2 rounded-2xl border-2 border-solid border-border items-center gap-2 text-zinc-800 dark:text-white transition-colors"
                        >
                            <SendHorizonal className="h-6 w-6" />
                        </button>
                    </div>

                    <div className='flex gap-2'>

                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="flex bg-background p-2 rounded-2xl border-2 border-solid border-border items-center gap-2 text-zinc-800 dark:text-white transition-colors"
                        >
                            <BookmarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className='my-4'>
                    <h2 className="text-2xl font-bold leading-tight text-zinc-800 dark:text-white transition-colors">
                        {subject.title}
                    </h2>
                    <p className="text-white/70 text-base leading-relaxed mb-4 line-clamp-3">
                        {subject.excerpt || subject.description || (isEvent ? `Evento en ${subject.location || 'Location'}. Únete y no te lo pierdas.` : 'Contenido interesante disponible ahora.')}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row sm:flex-col gap-5 md:gap-4 text-sm text-zinc-800 dark:text-white">
                    <div className="flex items-center gap-2 bg-background p-2 rounded-2xl border-2  border-solid border-border">
                        <Calendar1Icon className="h-5 w-5 text-zinc-800 dark:text-white" />
                        <span>
                            {isEvent && subject.start_date && isValid(new Date(subject.start_date))
                                ? format(new Date(subject.start_date), "d MMM yyyy", { locale: es })
                                : 'Por definir'}
                        </span>
                    </div>

                    {isEvent && subject.start_date && (
                        <div className="flex items-center gap-2 bg-background p-2 rounded-2xl border-2 border-solid border-border">
                            <Clock2 className="h-5 w-5 text-zinc-800 dark:text-white" />
                            <span>
                                {isValid(new Date(subject.start_date))
                                    ? format(new Date(subject.start_date), "HH:mm 'hs'", { locale: es })
                                    : '--:-- hs'}
                            </span>
                        </div>
                    )}

                    {subject.location && (
                        <div className="flex items-center gap-2 bg-background p-2 rounded-2xl border-2  border-solid border-border">
                            <MapPin className="h-5 w-5 text-zinc-800 dark:text-white" />
                            <span>{subject.location || 'Location'}</span>
                        </div>
                    )}
                </div>
            </article>
        </>
    );
}
