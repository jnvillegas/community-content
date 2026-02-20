import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Calendar, Clock, MapPin, ArrowRight, MessageCircle, Share2, Bookmark } from 'lucide-react';
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

    const isEvent = activity.subject_type.includes('Event');
    const isStory = activity.subject_type.includes('Story');
    const isArticle = activity.subject_type.includes('Article');

    if (!subject) return null;

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
            <article
                // onClick={handleCardClick}
                className="glass-card rounded-xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xs hover:shadow-black/40 bg-background border border-gray-200 dark:border-white/5 w-[100%] mb-10"
            >
                {/* Imagen superior - aspect-video */}
                <div className="relative aspect-video overflow-hidden">
                    {subject.cover_image || subject.content_url ? (
                        <img
                            src={subject.cover_image || subject.content_url}
                            alt={subject.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a2a1a] to-[#0f0f0f]" />
                    )}

                    {/* Tag superior izquierdo */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-zinc-900/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10">
                            {subject.type}
                        </span>
                    </div>
                </div>

                {/* Contenido inferior */}
                <div className="p-6 md:p-8">
                    {/* Título + bookmark opcional */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                        <h2 className="text-2xl font-bold leading-tight text-zinc-800  dark:text-white transition-colors">
                            {subject.title}
                        </h2>

                        {/* Bookmark (puedes conectar lógica después o quitarlo) */}
                        <Bookmark className="h-5 w-5  text-zinc-800 dark:text-white" />
                    </div>

                    {/* Descripción (usa excerpt si existe, fallback genérico) */}
                    {subject.excerpt || subject.description ? (
                        <p className="text-slate-400 text-base leading-relaxed mb-6 line-clamp-3">
                            {subject.excerpt || subject.description}
                        </p>
                    ) : (
                        <p className="text-slate-500 text-base mb-6 line-clamp-3">
                            {isEvent
                                ? `Evento en ${subject.location || 'Tucumán'}. Únete y no te lo pierdas.`
                                : 'Contenido interesante disponible ahora.'}
                        </p>
                    )}

                    {/* Info de fecha / hora / lugar */}
                    <div className="flex flex-wrap items-center gap-5 md:gap-6 mb-8 text-sm text-zinc-800 dark:text-white">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-zinc-800 dark:text-white" />
                            <span>
                                {isEvent && subject.start_date
                                    ? format(new Date(subject.start_date), "d MMM yyyy", { locale: es })
                                    : 'Disponible'}
                            </span>
                        </div>

                        {isEvent && subject.start_date && (
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-zinc-800 dark:text-white" />
                                <span>{format(new Date(subject.start_date), "HH:mm 'hs'", { locale: es })}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-zinc-800 dark:text-white" />
                            <span>{subject.location || 'Location'}</span>
                        </div>
                    </div>

                    {/* Footer: interacciones a la izquierda + botón a la derecha */}
                    <div className="flex items-center justify-between pt-6 border-t border-black/10 dark:border-white/10">
                        {/* Izquierda: like, comentarios, compartir */}
                        <div className="flex items-center gap-6 md:gap-8">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 transition-all ${subject.is_liked
                                    ? 'text-red-400 scale-105'
                                    : 'text-zinc-800 hover:text-red-400 dark:text-white dark:hover:text-red-400'
                                    }`}
                            >
                                <Heart
                                    className={`h-6 w-6 ${subject.is_liked ? 'fill-current' : ''}`}
                                />
                                <span className="text-sm font-semibold">{likesCount}</span>
                            </button>

                            <Link href={`/events/${subject.slug}`} className="flex items-center gap-2 text-zinc-800 dark:text-white transition-colors">
                                <MessageCircle className="h-6 w-6" />
                                <span className="text-sm font-semibold">{commentsCount}</span>
                            </Link>

                            <button
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 text-zinc-800 dark:text-white transition-colors"
                            >
                                <Share2 className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Derecha: botón principal */}
                        <Link
                            href={`/events/${subject.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#1d9bf0] text-white font-bold py-3 px-6 md:px-8 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-[#1d9bf0]/20 flex items-center gap-2 text-base"
                        >
                            Detalhes
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </article>

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