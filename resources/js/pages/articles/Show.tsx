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
    Tag
} from 'lucide-react';
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
}

interface Props {
    article: Article;
}

export default function Show({ article }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Articles', href: '/articles' },
        { title: 'View Article', href: `/articles/${article.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={article.meta_title || article.title}>
                <meta name="description" content={article.meta_description || article.excerpt} />
            </Head>

            <article className="min-h-screen bg-white dark:bg-gray-950">
                {/* Fixed Sub-header for viewing mode */}
                <div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 md:px-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild className="text-gray-500">
                            <Link href="/articles">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="text-gray-500">
                            <Share2 className="h-4 w-4" />
                        </Button>
                        <Button asChild variant="outline" size="sm" className="font-bold border-gray-200">
                            <Link href={`/articles/${article.id}/edit`}>Edit Post</Link>
                        </Button>
                    </div>
                </div>

                <div className="mx-auto max-w-[800px] px-6 py-12 md:py-20">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {article.categories.map(cat => (
                            <Badge key={cat.id} variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none px-3 font-bold text-[10px] uppercase tracking-widest">
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
                            <Avatar className="h-10 w-10 border border-gray-100">
                                <AvatarImage src={article.author?.avatar} />
                                <AvatarFallback className="bg-gray-100 text-gray-700 font-bold">
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
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-black prose-a:text-blue-600 hover:prose-a:underline">
                        <div
                            className="leading-relaxed text-lg text-gray-700 dark:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>

                    {/* Tags */}
                    {article.tags.length > 0 && (
                        <div className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex flex-wrap gap-2">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center">
                                    <Tag className="h-3.5 w-3.5 mr-2" />
                                    Tags:
                                </span>
                                {article.tags.map(tag => (
                                    <Badge key={tag.id} variant="outline" className="rounded-full px-4 py-1 text-xs font-bold border-gray-100 text-gray-500">
                                        #{tag.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Share Section */}
                    <div className="mt-12 p-8 rounded-3xl bg-gray-50 dark:bg-gray-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h4 className="font-black text-gray-900 dark:text-white">Did you like this article?</h4>
                            <p className="text-sm text-gray-500">Share it with your community.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-gray-200"><Facebook className="h-5 w-5 fill-current" /></Button>
                            <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-gray-200"><Twitter className="h-5 w-5 fill-current" /></Button>
                            <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-gray-200"><LinkIcon className="h-5 w-5" /></Button>
                        </div>
                    </div>
                </div>
            </article>
        </AppLayout>
    );
}
