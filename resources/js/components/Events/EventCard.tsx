import { Event } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Calendar, Clock, MapPin, ArrowRight, MessageCircle, Share2, Bookmark, Heart } from 'lucide-react';
import { format } from 'date-fns';
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
        <article className="glass-card rounded-xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-sm hover:shadow-black/40 bg-background border border-gray-200 dark:border-white/5 h-full w-full sm:max-w-[500px]">
            {/* Imagen superior - aspect-video */}
            <div className="relative aspect-video overflow-hidden flex-shrink-0">
                {event.cover_image ? (
                    <img
                        src={event.cover_image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a2a1a] to-[#0f0f0f]" />
                )}

                {/* Tag superior izquierdo */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-zinc-900/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10">
                        {event.type}
                    </span>
                </div>
            </div>

            {/* Contenido inferior */}
            <div className="p-4 sm:p-6 md:p-8 flex flex-col">
                {/* Título + bookmark opcional */}
                <div className="flex justify-between items-start gap-3 mb-3 sm:mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold leading-tight text-zinc-800 dark:text-white transition-colors line-clamp-2">
                        {event.title}
                    </h2>

                    {/* Bookmark */}
                    <Bookmark className="sm:h-5 sm:w-5 text-zinc-800 dark:text-white mt-1" />
                </div>

                {/* Descripción */}
                {event.description ? (
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                        {event.description}
                    </p>
                ) : (
                    <p className="text-slate-500 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-2">
                        Evento en {event.location || 'Tucumán'}. Únete y no te lo pierdas.
                    </p>
                )}

                {/* Info de fecha / hora / lugar */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 md:gap-6 mb-6 sm:mb-8 text-xs sm:text-sm text-zinc-800 dark:text-white">
                    <div className="flex items-center gap-2 min-w-0">
                        <Calendar className="sm:h-5 sm:w-5 text-zinc-800 dark:text-white" />
                        <span className="truncate">
                            {event.start_date
                                ? format(new Date(event.start_date), 'd MMM', { locale: es })
                                : 'Disponible'}
                        </span>
                    </div>

                    {event.start_date && (
                        <div className="flex items-center gap-2 min-w-0">
                            <Clock className="sm:h-5 sm:w-5 text-zinc-800 dark:text-white" />
                            <span className="truncate">{format(new Date(event.start_date), "HH:mm 'hs'", { locale: es })}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2 min-w-0">
                        <MapPin className="sm:h-5 sm:w-5 text-zinc-800 dark:text-white" />
                        <span className="truncate">{event.location || 'Location'}</span>
                    </div>
                </div>

                {/* Footer: interacciones a la izquierda + botón a la derecha */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 sm:gap-3 pt-4 sm:pt-6 border-t border-black/10 dark:border-white/10">
                    {/* Izquierda: like, comentarios, compartir */}
                    <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap ${isLiked
                                ? 'text-red-400 scale-105'
                                : 'text-zinc-800 hover:text-red-400 dark:text-white dark:hover:text-red-400'
                                }`}
                        >
                            <Heart className={`sm:h-6 sm:w-6 ${isLiked ? 'fill-current' : ''}`} />
                            <span className="text-xs sm:text-sm font-semibold">{likesCount}</span>
                        </button>

                        <Link href={`/events/${event.slug}`} className="flex items-center gap-1.5 sm:gap-2 text-zinc-800 dark:text-white transition-colors whitespace-nowrap">
                            <MessageCircle className="sm:h-6 sm:w-6" />
                            <span className="text-xs sm:text-sm font-semibold">{commentsCount}</span>
                        </Link>

                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 sm:gap-2 text-zinc-800 dark:text-white transition-colors "
                        >
                            <Share2 className="sm:h-6 sm:w-6" />
                        </button>
                    </div>

                    <Link
                        href={`/events/${event.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#1d9bf0] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-[#1d9bf0]/20 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-base whitespace-nowrap"
                    >
                        Detalhes
                        <ArrowRight className="sm:h-5 sm:w-5" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
