import { Calendar, Clock, MapPin, ArrowRight, Bookmark, Heart, MessageCircle, Share2 } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import EventModal from './EventModal';

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

    const startDate = isEvent && subject.start_date ? new Date(subject.start_date) : null;
    const dateStr = startDate && isValid(startDate) ? format(startDate, "MMM d, yyyy", { locale: es }) : 'Por definir';
    const timeStr = startDate && isValid(startDate) ? format(startDate, "hh:mm a", { locale: es }) : 'Por definir';

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const shareUrl = `${window.location.origin}/events/${subject.id}`;
        const shareTitle = subject.title;

        if (navigator.share) {
            navigator.share({
                title: shareTitle,
                url: shareUrl,
            }).catch((err) => {
                console.error('Error sharing:', err);
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareUrl);
            alert('¡Enlace copiado al portapapeles!');
        }
    };

    return (
        <>
            <article className="group relative bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 mb-8">
                <div className="flex flex-col md:flex-row min-h-[320px]">
                    {/* Left: Image Section */}
                    <div className="relative w-full md:w-[45%] lg:w-[40%] shrink-0 overflow-hidden">
                        {subject.cover_image || subject.content_url ? (
                            <img
                                src={subject.cover_image || subject.content_url}
                                alt={subject.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black" />
                        )}

                        {/* Type Badge */}
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-extrabold text-[#f25e1c] uppercase tracking-wider shadow-sm">
                                {subject.type || 'EVENTO'}
                            </span>
                        </div>
                    </div>

                    {/* Right: Info Section */}
                    <div className="flex flex-col flex-1 p-6 lg:p-8 min-w-0">
                        {/* Title */}
                        <h2 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-white mb-4 line-clamp-2 leading-tight">
                            {subject.title}
                        </h2>

                        {/* Date & Time Row */}
                        <div className="flex flex-wrap items-center gap-6 mb-6">
                            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                                <Calendar className="h-4 w-4 text-[#f25e1c]" />
                                <span className="text-sm font-semibold">{dateStr}</span>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                                <Clock className="h-4 w-4 text-[#f25e1c]" />
                                <span className="text-sm font-semibold tracking-tight">{timeStr}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                            {subject.excerpt || subject.description || 'Únete a este increíble evento de la comunidad. ¡No te lo pierdas!'}
                        </p>

                        {/* Location Box */}
                        {subject.location && (
                            <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-xl p-4 mb-8 flex items-start gap-3 border border-zinc-100 dark:border-zinc-800/50">
                                <MapPin className="h-5 w-5 text-[#f25e1c] shrink-0 mt-0.5" />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate">
                                        {subject.location}
                                    </span>
                                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                        {subject.location_details || 'Ubicación confirmada'}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons Row */}
                        <div className="mt-auto flex items-center gap-3">
                            <Link
                                href={subject.slug ? `/events/${subject.slug}` : '#'}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#f25e1c] hover:bg-[#d94e10] text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-orange-500/20 active:scale-95"
                            >
                                Ver detalles del evento
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <button
                                onClick={handleShare}
                                className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-xl transition-all active:scale-95 border border-zinc-100 dark:border-zinc-800"
                                title="Compartir"
                            >
                                <Share2 className="h-5 w-5" />
                            </button>

                            <button
                                className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-xl transition-all active:scale-95 border border-zinc-100 dark:border-zinc-800"
                                title="Guardar"
                            >
                                <Bookmark className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            {isEvent && (
                <EventModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    event={subject}
                />
            )}
        </>
    );
}

/**
 * OLD IMPLEMENTATION (RESERVE)
 * 
 * function OldEventCard({ activity }: { activity: any }) {
 *     const { subject } = activity;
 *     const [isModalOpen, setIsModalOpen] = useState(false);
 * 
 *     if (!subject) return null;
 * 
 *     const isEvent = activity.subject_type === 'App\\Models\\Event';
 *     const isStory = activity.subject_type === 'App\\Models\\Story';
 * 
 *     const handleLike = (e: React.MouseEvent) => {
 *         e.stopPropagation();
 *         let url = '';
 *         if (isEvent) url = `/events/${subject.id}/like`;
 *         else if (isStory) url = `/stories/${subject.id}/like`;
 *         if (!url) return;
 * 
 *         router.post(url, {}, { preserveScroll: true });
 *     };
 * 
 *     const likesCount = subject.likes_count || 0;
 *     const commentsCount = subject.comments_count || subject.comments?.length || 0;
 * 
 *     return (
 *         <article className="glass-card bg-card rounded-xl overflow-hidden group transition-all duration-500 p-5">
 *             <div className="relative aspect-video overflow-hidden rounded-xl">
 *                 {subject.cover_image || subject.content_url ? (
 *                     <Link href={subject.slug ? `/events/${subject.slug}` : '#'} >
 *                         <img
 *                             src={subject.cover_image || subject.content_url}
 *                             alt={subject.title}
 *                             className="w-full h-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-102"
 *                         />
 *                     </Link>
 *                 ) : (
 *                     <div className="w-full h-full bg-gradient-to-br from-[#000000] to-[#0f0f0f]" />
 *                 )}
 * 
 *                 <div className="absolute top-4 left-4">
 *                     <span className="px-3 py-1.5 bg-zinc-900/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10">
 *                         {subject.type}
 *                     </span>
 *                 </div>
 *             </div>
 *             <div className="flex items-center justify-between pt-6">
 *                 <div className="flex items-center gap-4 md:gap-4">
 *                     <button
 *                         onClick={handleLike}
 *                         className={`flex bg-background p-2 rounded-2xl border-2 border-solid border-border cursor-pointer items-center gap-2 transition-all ${subject.is_liked
 *                             ? 'text-red-400 scale-105'
 *                             : 'text-zinc-800 hover:text-red-400 dark:text-white dark:hover:text-red-400'
 *                             }`}
 *                     >
 *                         <Heart className={`h-6 w-6 ${subject.is_liked ? 'fill-current' : ''}`} />
 *                         <span className="text-sm font-semibold">{likesCount}</span>
 *                     </button>
 * 
 *                     <Link href={subject.slug ? `/events/${subject.slug}` : '#'} className="flex items-center bg-background p-2 rounded-2xl border-2 border-solid border-border gap-2 text-zinc-800 dark:text-white transition-colors bg-background p-2 rounded-2xl">
 *                         <MessageCircle className="h-6 w-6" />
 *                         <span className="text-sm font-semibold">{commentsCount}</span>
 *                     </Link>
 *                 </div>
 * 
 *                 <div className='flex gap-2'>
 *                     <button className="flex bg-background p-2 rounded-2xl border-2 border-solid border-border items-center gap-2 text-zinc-800 dark:text-white transition-colors">
 *                         <BookmarkIcon className="h-6 w-6" />
 *                     </button>
 *                 </div>
 *             </div>
 * 
 *             <div className='my-4'>
 *                 <h2 className="text-2xl font-bold leading-tight text-zinc-800 dark:text-white transition-colors">
 *                     {subject.title}
 *                 </h2>
 *                 <p className="text-white/70 text-base leading-relaxed mb-4 line-clamp-3">
 *                     {subject.excerpt || subject.description}
 *                 </p>
 *             </div>
 * 
 *             <div className="flex flex-col md:flex-row sm:flex-col gap-5 md:gap-4 text-sm text-zinc-800 dark:text-white">
 *                 <div className="flex items-center gap-2 bg-background p-2 rounded-2xl border-2  border-solid border-border">
 *                     <Calendar1Icon className="h-5 w-5 text-zinc-800 dark:text-white" />
 *                     <span>{format(new Date(subject.start_date), "d MMM yyyy", { locale: es })}</span>
 *                 </div>
 *             </div>
 *         </article>
 *     );
 * }
 */
