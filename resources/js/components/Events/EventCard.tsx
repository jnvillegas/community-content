import { Event } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Heart, Calendar1Icon as Calendar, Clock2 as Clock, MapPin, MessageCircle, Share2, BookmarkIcon as Bookmark, SendHorizonal } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const [isLiked, setIsLiked] = useState(event.is_liked || false);
    const [likesCount, setLikesCount] = useState(event.likes_count || 0);
    const commentsCount = event.comments_count ?? event.comments?.length ?? 0;

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.post(`/events/${event.id}/like`, {}, { preserveScroll: true });
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    };

    return (
        <article className="glass-card bg-card rounded-xl overflow-hidden group transition-all duration-500 p-5 h-full w-full sm:max-w-[500px]">
            {/* Imagen superior - aspect-video */}
            <div className="relative aspect-video overflow-hidden rounded-xl">
                {event.cover_image ? (
                    <Link href={`/events/${event.slug || event.id}`}>
                        <img
                            src={event.cover_image}
                            alt={event.title}
                            className="w-full h-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-102"
                        />
                    </Link>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#000000] to-[#0f0f0f]" />
                )}

                {/* Tag superior izquierdo */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-zinc-900/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10">
                        {event.type || 'EVENT'}
                    </span>
                </div>
            </div>

            {/* Interacciones superiores */}
            <div className="flex items-center justify-between pt-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLike}
                        className={`flex bg-background p-2 rounded-2xl border-2 border-solid border-border cursor-pointer items-center gap-2 transition-all ${isLiked
                            ? 'text-red-400 scale-105'
                            : 'text-zinc-800 hover:text-red-400 dark:text-white dark:hover:text-red-400'
                            }`}
                    >
                        <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-semibold">{likesCount}</span>
                    </button>

                    <Link href={`/events/${event.slug || event.id}`} className="flex items-center bg-background p-2 rounded-2xl border-2 border-solid border-border gap-2 text-zinc-800 dark:text-white transition-colors">
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

                <button
                    onClick={(e) => e.stopPropagation()}
                    className="flex bg-background p-2 rounded-2xl border-2 border-solid border-border items-center gap-2 text-zinc-800 dark:text-white transition-colors"
                >
                    <Bookmark className="h-6 w-6" />
                </button>
            </div>

            {/* Contenido */}
            <div className="my-4">
                <h2 className="text-2xl font-bold leading-tight text-zinc-800 dark:text-white transition-colors">
                    {event.title}
                </h2>
                <p className="text-zinc-600 dark:text-white/70 text-base leading-relaxed mb-4 line-clamp-3 mt-2">
                    {event.description || `Evento en ${event.location || 'Location'}. Únete y no te lo pierdas.`}
                </p>
            </div>

            {/* Info Tags */}
            <div className="flex flex-col md:flex-row sm:flex-col gap-3 md:gap-4 text-sm text-zinc-800 dark:text-white">
                <div className="flex items-center gap-2 bg-background p-2 rounded-2xl border-2 border-solid border-border">
                    <Calendar className="h-5 w-5 text-zinc-800 dark:text-white" />
                    <span>
                        {event.start_date && isValid(new Date(event.start_date))
                            ? format(new Date(event.start_date), "d MMM yyyy", { locale: es })
                            : 'Por definir'}
                    </span>
                </div>

                {event.start_date && (
                    <div className="flex items-center gap-2 bg-background p-2 rounded-2xl border-2 border-solid border-border">
                        <Clock className="h-5 w-5 text-zinc-800 dark:text-white" />
                        <span>
                            {isValid(new Date(event.start_date))
                                ? format(new Date(event.start_date), "HH:mm 'hs'", { locale: es })
                                : '--:-- hs'}
                        </span>
                    </div>
                )}

                {event.location && (
                    <div className="flex items-center gap-2 bg-background p-2 rounded-2xl border-2 border-solid border-border">
                        <MapPin className="h-5 w-5 text-zinc-800 dark:text-white" />
                        <span>{event.location}</span>
                    </div>
                )}
            </div>
        </article>
    );
}
