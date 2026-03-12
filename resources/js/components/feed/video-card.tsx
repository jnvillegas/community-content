import { Play, Share2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function VideoCard({ activity }: { activity: any }) {
    const { subject } = activity;

    if (!subject) return null;

    // Determine if it's "NEW" (created in the last 7 days)
    const isNew = subject.created_at ? (new Date().getTime() - new Date(subject.created_at).getTime()) < 7 * 24 * 60 * 60 * 1000 : false;

    const relativeTime = subject.created_at
        ? formatDistanceToNow(new Date(subject.created_at), { addSuffix: true, locale: es })
        : '';

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const shareUrl = `${window.location.origin}/videos/${subject.id}`;
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
        <article className="group relative bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 mb-8">
            <div className="flex flex-col md:flex-row p-4 gap-6">

                {/* Left: Thumbnail Section */}
                <div className="relative w-full md:w-64 lg:w-80 shrink-0 aspect-video rounded-xl overflow-hidden shadow-sm group/thumb">
                    {subject.thumbnail_url ? (
                        <img
                            src={subject.thumbnail_url}
                            alt={subject.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black" />
                    )}

                    {/* Play Overlay (Visible on hover) */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover/thumb:scale-100 transition-transform">
                            <Play className="h-6 w-6 text-white fill-current" />
                        </div>
                    </div>

                    {/* Duration Badge */}
                    {subject.duration && (
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded shadow-sm">
                            {subject.duration}
                        </div>
                    )}
                </div>

                {/* Right: Info Section */}
                <div className="flex flex-col flex-1 min-w-0 py-1">

                    {/* Top Metadata */}
                    <div className="flex items-center gap-2 mb-2">
                        {isNew && (
                            <span className="bg-orange-50 dark:bg-orange-950/30 text-[#f25e1c] text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                NEW
                            </span>
                        )}
                        <span className="text-zinc-400 dark:text-zinc-500 text-[11px] font-medium flex items-center gap-1.5">
                            {relativeTime}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl lg:text-2xl font-extrabold text-zinc-900 dark:text-white mb-4 line-clamp-2 leading-tight">
                        {subject.title}
                    </h2>


                    {/* Action Buttons */}
                    <div className="mt-auto flex items-center gap-3">
                        <Link
                            href={route('videos.show', subject.id)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#f25e1c] hover:bg-[#d94e10] text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-orange-500/20 active:scale-95"
                        >
                            <Play className="h-4 w-4 fill-current" />
                            Watch Video
                        </Link>

                        <button
                            onClick={handleShare}
                            className="p-2.5 bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-xl transition-all active:scale-95 border border-transparent dark:border-zinc-800/50 shadow-sm"
                            title="Compartir"
                        >
                            <Share2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

/**
 * OLD IMPLEMENTATION (RESERVE)
 * 
 * function OldVideoCard({ activity }: { activity: any }) {
 *     const { subject } = activity;
 *     if (!subject) return null;
 * 
 *     return (
 *         <article className="glass-card bg-card rounded-xl overflow-hidden group transition-all duration-500 p-5">
 *             <div className="relative aspect-video overflow-hidden rounded-xl">
 *                 {subject.youtube_id ? (
 *                     <iframe
 *                         src={`https://www.youtube.com/embed/${subject.youtube_id}`}
 *                         title={subject.title}
 *                         className="w-full h-full"
 *                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 *                         allowFullScreen
 *                     />
 *                 ) : (
 *                     <div className="w-full h-full bg-gradient-to-br from-[#000000] to-[#0f0f0f]" />
 *                 )}
 *             </div>
 *         </article>
 *     );
 * }
 */
