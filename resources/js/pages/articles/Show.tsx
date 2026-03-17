import { Head, Link } from '@inertiajs/react';
import {
    ChevronLeft,
    Calendar,
    User,
    Clock,
    Share2,
    Facebook,
    Twitter,
    Link as LinkIcon,
    Tag,
    Heart,
    MessageCircle,
    Send
} from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    status: string;
    featured_image: string;
    meta_title: string;
    meta_description: string;
    categories: Array<{ id: number; name: string }>;
    tags: Array<{ id: number; name: string }>;
    author: { name: string; avatar?: string };
    created_at: string;
    likes_count?: number;
    is_liked?: boolean;
    comments?: any[];
    comments_count?: number;
}

interface Props {
    article: Article;
    auth: {
        user: any;
    };
}

export default function Show({ article: initialArticle, auth }: Props) {
    const page = usePage<Props>();
    const [isLiked, setIsLiked] = useState(initialArticle.is_liked || false);
    const [likesCount, setLikesCount] = useState(initialArticle.likes_count || 0);
    const [comments, setComments] = useState(initialArticle.comments || []);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    useEffect(() => {
        const updatedArticle = page.props.article;
        setIsLiked(updatedArticle.is_liked || false);
        setLikesCount(updatedArticle.likes_count || 0);
        setComments(updatedArticle.comments || []);
    }, [page.props.article]);

    const handleLike = () => {
        router.post(route('articles.like', initialArticle.slug), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Update local state if needed (optional)
            }
        });
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setSubmittingComment(true);
        router.post(route('articles.comment', initialArticle.slug),
            { content: commentText },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setCommentText('');
                    setSubmittingComment(false);
                },
                onError: () => {
                    setSubmittingComment(false);
                }
            }
        );
    };

    const article = page.props.article;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Articles', href: '/articles' },
        { title: 'View Article', href: route('articles.show', article.slug) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={article.meta_title || article.title}>
                <meta name="description" content={article.meta_description || article.excerpt} />
            </Head>

            <article className="min-h-screen bg-white dark:bg-background">
                <div className="mx-auto max-w-[800px] px-6 py-12 md:py-20">
                    <div className="mb-6">
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2" asChild>
                            <Link href="/articles">
                                <ChevronLeft className="w-4 h-4" />
                                Back to Articles
                            </Link>
                        </Button>
                    </div>
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {article.categories.map(cat => (
                            <Badge key={cat.id} variant="secondary" className="bg-background text-foreground border-muted px-3 font-bold text-[10px] uppercase tracking-widest">
                                {cat.name}
                            </Badge>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.1]">
                        {article.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 mb-12 text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-muted">
                                <AvatarImage src={article.author?.avatar} />
                                <AvatarFallback className="bg-gray-100 text-white font-bold">
                                    {article.author?.name?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col leading-tight">
                                <span className="font-bold text-gray-900 dark:text-white">{article.author?.name || 'Unknown Author'}</span>
                                <span className="text-xs text-gray-400">Content Creator</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                            <Calendar className="h-4 w-4" />
                            {article.created_at ? new Date(article.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                            <Clock className="h-4 w-4" />
                            5 min read
                        </div>
                    </div>

                    {/* Featured Image */}
                    {article.featured_image && (
                        <div className="aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-blue-500/10">
                            <img
                                src={article.featured_image.startsWith('http') || article.featured_image.startsWith('/storage') ? article.featured_image : `/storage/${article.featured_image}`}
                                className="w-full h-full object-cover"
                                alt={article.title}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                        const placeholder = document.createElement('div');
                                        placeholder.className = "w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-gray-400";
                                        placeholder.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
                                        parent.appendChild(placeholder);
                                    }
                                }}
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-black">
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .article-content a {
                                text-decoration: underline !important;
                                text-underline-offset: 2px;
                                color: #3b82f6 !important;
                            }
                            .article-content a:hover {
                                color: #2563eb !important;
                            }
                        `}} />
                        <div
                            className="article-content leading-relaxed text-lg text-gray-700 dark:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>

                    {/* Tags */}
                    {article.tags.length > 0 && (
                        <div className="mt-20 pt-10 border-t border-muted">
                            <div className="flex flex-wrap gap-2">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center">
                                    <Tag className="h-3.5 w-3.5 mr-2" />
                                    Tags:
                                </span>
                                {article.tags.map(tag => (
                                    <Badge key={tag.id} variant="outline" className="rounded-full px-4 py-1 text-xs font-bold border-muted">
                                        #{tag.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Engagement Section */}
                    <div className="mt-12 pt-12 border-t border-muted">
                        <div className="flex items-center gap-8 mb-12">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 transition-all ${isLiked
                                    ? 'text-red-500 scale-105'
                                    : 'text-gray-500 hover:text-red-500'
                                    }`}
                            >
                                <Heart className={`w-8 h-8 ${isLiked ? 'fill-current' : ''}`} />
                                <span className="font-black text-xl">{likesCount}</span>
                            </button>
                            <div className="flex items-center gap-2 text-gray-500">
                                <MessageCircle className="w-8 h-8" />
                                <span className="font-black text-xl">{comments.length}</span>
                            </div>
                        </div>

                        {/* Comment Form */}
                        <h3 className="text-2xl font-black mb-8 text-gray-900 dark:text-white">Comentarios</h3>
                        {auth.user ? (
                            <form onSubmit={handleCommentSubmit} className="mb-12">
                                <div className="flex gap-4">
                                    <Avatar className="h-10 w-10 border border-muted">
                                        <AvatarImage src={auth.user.avatar} />
                                        <AvatarFallback className="bg-gray-100 text-white font-bold">
                                            {auth.user.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow space-y-4">
                                        <Textarea
                                            placeholder="Escribe lo que piensas..."
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            className="min-h-[100px] resize-none rounded-2xl border-muted bg-gray-50 dark:bg-zinc-900 focus:ring-blue-500"
                                        />
                                        <div className="flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={!commentText.trim() || submittingComment}
                                                className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                                            >
                                                {submittingComment ? 'Publicando...' : 'Publicar comentario'}
                                                <Send className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="mb-12 p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                                <p className="text-blue-600 dark:text-blue-400 font-medium">
                                    <Link href="/login" className="font-black hover:underline">Inicia sesión</Link> para unirte a la conversación.
                                </p>
                            </div>
                        )}

                        {/* Comments List */}
                        <div className="space-y-8">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-4 group">
                                        <Avatar className="h-10 w-10 border border-muted shrink-0">
                                            <AvatarImage src={comment.user?.avatar} />
                                            <AvatarFallback className="bg-gray-100 text-white font-bold">
                                                {comment.user?.name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-black text-gray-900 dark:text-white text-sm">{comment.user?.name}</span>
                                                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">•</span>
                                                <span className="text-gray-400 text-xs">
                                                    {new Date(comment.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-muted">
                                    <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-500 font-bold">No hay comentarios aún.</p>
                                    <p className="text-sm text-gray-400">¡Sé el primero en compartir tu opinión!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="mt-20 p-8 rounded-3xl bg-gray-50 dark:bg-card flex flex-col md:flex-row items-center justify-between gap-6 border border-muted">
                        <div className="text-center md:text-left">
                            <h4 className="font-black text-gray-900 dark:text-white">Did you like this article?</h4>
                            <p className="text-sm text-gray-500">Share it with your community.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-muted hover:bg-[#1877F2] hover:text-white transition-colors"><Facebook className="h-5 w-5 fill-current" /></Button>
                            <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-muted hover:bg-[#1DA1F2] hover:text-white transition-colors"><Twitter className="h-5 w-5 fill-current" /></Button>
                            <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-muted hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors" onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Enlace copiado al portapapeles');
                            }}><LinkIcon className="h-5 w-5" /></Button>
                        </div>
                    </div>
                </div>
            </article>
        </AppLayout>
    );
}
