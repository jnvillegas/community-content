import { Share2, ArrowRight, Heart, MessageCircle, Send } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ArticleCard({ activity }: { activity: any }) {
    const { subject } = activity;
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!subject) return null;

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(route('articles.like', subject.slug), {}, { preserveScroll: true });
    };

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: subject.title,
                url: route('articles.show', subject.slug),
            }).catch(() => {
                // Fallback or silent fail
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(`${window.location.origin}/articles/${subject.slug}`);
            alert('Enlace copiado al portapapeles');
        }
    };

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);
        router.post(route('articles.comment', subject.slug), {
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
        <article className="glass-card rounded-2xl overflow-hidden group transition-all duration-500 hover:shadow-xl hover:shadow-black/10 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 w-full mb-8 flex flex-col p-4 md:p-5 text-left">

            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-1/3 aspect-video md:aspect-video shrink-0">
                    {subject.cover_image || subject.content_url || subject.featured_image ? (
                        <img
                            src={subject.cover_image || subject.content_url || subject.featured_image}
                            alt={subject.title}
                            className="w-full h-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105 shadow-sm"
                        />
                    ) : (
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border border-gray-100 dark:border-white/5" />
                    )}
                </div>


                <div className="flex flex-col flex-1 py-1">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Link href={route('articles.show', subject.slug)}>
                                <h2 className="text-2xl md:text-3xl font-bold leading-tight text-zinc-900 dark:text-white hover:text-[#1d9bf0] transition-colors cursor-pointer">
                                    {subject.title}
                                </h2>
                            </Link>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
                                {subject.excerpt || subject.description || 'Explora nuestro último contenido de la comunidad.'}
                            </p>
                        </div>
                    </div>


                    <div className="mt-4">

                        <div className="border-t border-b border-zinc-100 dark:border-white/10 py-2 mb-1">
                            <div className="flex items-center gap-3 px-1">
                                <span className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold italic">Article</span>
                                <span className="text-zinc-300 dark:text-zinc-600">•</span>
                                <span className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold">
                                    {subject.formatted_date || 'Recientemente'}
                                </span>
                            </div>
                        </div>


                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <Link
                                    href={route('articles.show', subject.slug)}
                                    className="text-[#1d9bf0] hover:text-[#1d9bf0]/80 font-bold text-[15px] flex items-center gap-2 transition-all hover:translate-x-1"
                                >
                                    Read Article
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <div className="flex items-center gap-4">
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
                                        href={route('articles.show', subject.slug)}
                                        className="flex items-center gap-1.5 text-zinc-500 hover:text-[#1d9bf0] transition-colors"
                                        title="Comentarios"
                                    >
                                        <MessageCircle className="h-5 w-5" />
                                        <span className="text-sm font-bold">{subject.comments_count || 0}</span>
                                    </Link>
                                </div>
                            </div>

                            <button
                                onClick={handleShare}
                                className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 text-zinc-500 hover:text-[#1d9bf0] hover:bg-zinc-100 dark:hover:bg-white/10 transition-all transform active:scale-95 border border-zinc-100 dark:border-white/5"
                                title="Share Article"
                            >
                                <Share2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Comment Section - Moved here */}
                    <div className="mt-3 pt-3 border-t border-zinc-50 dark:border-white/5">
                        <form onSubmit={handleSubmitComment} className="relative flex items-center gap-2">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Escribe un comentario..."
                                className="flex-1 bg-gray-50 dark:bg-zinc-800/50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#1d9bf0] dark:text-white transition-all shadow-inner"
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting || !comment.trim()}
                                className="p-2 bg-[#1d9bf0] hover:bg-[#1a8cd8] disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 text-white rounded-xl transition-all active:scale-95 shadow-md shadow-blue-500/10"
                            >
                                <Send className="h-3.5 w-3.5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </article>

    );
}