import { ArrowRight, Share2, Monitor, Database, Heart, MessageCircle, Send } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function WallpaperCard({ activity }: { activity: any }) {
    const { subject } = activity;
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!subject) return null;

    // Determine if it's "NEW" (created in the last 7 days)
    const isNew = subject.created_at ? (new Date().getTime() - new Date(subject.created_at).getTime()) < 7 * 24 * 60 * 60 * 1000 : false;

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(route('wallpapers.like', subject.id), {}, { preserveScroll: true });
    };

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const shareUrl = `${window.location.origin}/wallpapers/${subject.id}`;
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

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);
        router.post(route('wallpapers.comment', subject.id), {
            content: comment
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setComment('');
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <article className="group relative bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 mb-8">
            <div className="flex flex-col md:flex-row p-4 gap-6">
                {/* Left: Image Section */}
                <div className="relative w-full md:w-56 lg:w-72 shrink-0 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                    {subject.src ? (
                        <img
                            src={subject.src}
                            alt={subject.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" />
                    )}

                    {subject.is_locked && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold uppercase rounded shadow-sm">
                            Premium
                        </div>
                    )}
                </div>

                {/* Right: Info Section */}
                <div className="flex flex-col flex-1 min-w-0 py-1">
                    {/* Accent Text */}
                    <p className="text-blue-600 dark:text-blue-400 text-[11px] font-semibold tracking-wide uppercase mb-3 text-start">
                        ¡Descubre este increíble fondo de pantalla para tu dispositivo!
                    </p>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        {isNew && (
                            <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">
                                NEW
                            </span>
                        )}
                        <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                            <Monitor className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">Resolution: {subject.resolution || 'HD'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                            <Database className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">Size: {subject.file_size || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-4 truncate text-start">
                        {subject.title}
                    </h2>

                    {/* Action Buttons Row */}
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-1.5 transition-all ${subject.is_liked
                                ? 'text-red-500 scale-105'
                                : 'text-zinc-500 hover:text-red-500'
                                }`}
                            title="Me gusta"
                        >
                            <Heart className={`h-5 w-5 ${subject.is_liked ? 'fill-current' : ''}`} />
                            <span className="text-sm font-bold">{subject.likes_count || 0}</span>
                        </button>

                        <Link
                            href={route('wallpapers.show', subject.id)}
                            className="flex items-center gap-1.5 text-zinc-500 hover:text-blue-500 transition-colors"
                            title="Comentarios"
                        >
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-sm font-bold">{subject.comments_count || 0}</span>
                        </Link>
                    </div>

                    {/* Quick Comment Section */}
                    <div className="mt-auto pt-3 border-t border-gray-100 dark:border-white/5">
                        <form onSubmit={handleSubmitComment} className="relative flex items-center gap-2">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Escribe un comentario..."
                                className="flex-1 bg-gray-50 dark:bg-zinc-800/50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-inner"
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting || !comment.trim()}
                                className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 text-white rounded-xl transition-all active:scale-95 shadow-md shadow-blue-500/10"
                            >
                                <Send className="h-3.5 w-3.5" />
                            </button>
                        </form>
                    </div>

                    {/* Footer Row (Minimal Layout) */}
                    <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100 dark:border-zinc-800">
                        <Link
                            href={route('wallpapers.show', subject.id)}
                            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-bold text-sm transition-colors group/link"
                        >
                            Ver Wallpaper
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>

                        <button
                            onClick={handleShare}
                            className="p-2 bg-gray-50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-xl transition-all active:scale-95 shadow-sm"
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
 * function OldWallpaperCard({ activity }: { activity: any }) {
 *     const { subject } = activity;
 *     if (!subject) return null;
 * 
 *     return (
 *         <article className="glass-card rounded-xl overflow-hidden group transition-all duration-500 hover:shadow-2xs hover:shadow-black/40 bg-background border border-gray-200 dark:border-white/5 w-[100%] mb-10">
 *             <div className="relative aspect-video overflow-hidden">
 *                 {subject.src ? (
 *                     <img
 *                         src={subject.src}
 *                         alt={subject.title}
 *                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 *                     />
 *                 ) : (
 *                     <div className="w-full h-full bg-gradient-to-br from-[#1a2a1a] to-[#0f0f0f]" />
 *                 )}
 * 
 *                 <div className="absolute top-4 right-4 flex gap-2">
 *                     <span className="bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md border border-white/10">
 *                         {subject.resolution || 'HD'}
 *                     </span>
 *                     {subject.is_locked && (
 *                         <span className="bg-amber-500/80 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md">
 *                             Premium
 *                         </span>
 *                     )}
 *                 </div>
 * 
 *                 <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
 *                     <h2 className="text-xl font-bold text-white mb-1">
 *                         {subject.title}
 *                     </h2>
 *                     <p className="text-white/70 text-sm">
 *                         {subject.category || 'Wallpaper'}
 *                     </p>
 *                 </div>
 *             </div>
 * 
 *             <div className="p-4 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
 *                 <div className="flex items-center gap-2">
 *                     <img
 *                         src={subject.author?.avatar}
 *                         alt={subject.author?.name}
 *                         className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10"
 *                     />
 *                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
 *                         {subject.author?.name}
 *                     </span>
 *                 </div>
 * 
 *                 <div className="flex gap-2">
 *                     <a
 *                         href={route('wallpaper.download', subject.id)}
 *                         className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
 *                         title="Download"
 *                     >
 *                         <Download className="h-4 w-4" />
 *                     </a>
 *                     <Link
 *                         href={route('wallpapers.index')}
 *                         className="p-2 rounded-lg bg-[#1d9bf0] text-white hover:bg-[#1a8cd8] transition-colors"
 *                         title="View Gallery"
 *                     >
 *                         <ExternalLink className="h-4 w-4" />
 *                     </Link>
 *                 </div>
 *             </div>
 *         </article>
 *     );
 * }
 */
