import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PageProps, Post } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash2, Eye } from 'lucide-react';

interface PostsPageProps extends PageProps {
    posts: {
        data: Post[];
        links: any[];
    };
}

export default function Index({ posts }: PostsPageProps) {
    const { flash } = usePage<any>().props;

    const handleDelete = (post: Post) => {
        if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            router.delete(`/posts/${post.id}`);
        }
    };

    const breadcrumbs = [
        {
            title: 'Blog',
            href: '/posts',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Management" />

            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Blog Posts</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your content and custom attributes.</p>
                    </div>
                    <Link href="/posts/create">
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20">
                            <Plus className="w-4 h-4 mr-2" />
                            Write New Post
                        </Button>
                    </Link>
                </div>

                {flash?.success && (
                    <div className="mb-6 p-4 text-sm font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 rounded-xl animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            {flash.success}
                        </div>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden transition-all">
                    <Table>
                        <TableHeader className="bg-gray-50/50 dark:bg-gray-800/50">
                            <TableRow>
                                <TableHead className="py-4 px-6 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider text-[11px]">Content Details</TableHead>
                                <TableHead className="py-4 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider text-[11px]">Attributes</TableHead>
                                <TableHead className="py-4 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider text-[11px]">Publication</TableHead>
                                <TableHead className="py-4 px-6 text-right text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider text-[11px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.data.map((post) => (
                                <TableRow key={post.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors group">
                                    <TableCell className="py-5 px-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-gray-900 dark:text-gray-100 text-base leading-tight group-hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </span>
                                            <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded w-fit">
                                                /{post.slug}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5">
                                        <div className="flex flex-wrap gap-1.5 max-w-[300px]">
                                            {post.attributes && Object.entries(post.attributes).length > 0 ? (
                                                Object.entries(post.attributes).slice(0, 3).map(([key, value]) => (
                                                    <span key={key} className="inline-flex items-center px-2.5 py-1 text-[11px] font-bold bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                                        <span className="text-blue-500 mr-1.5">{key}</span>
                                                        <span className="opacity-80">{value}</span>
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 italic text-[11px]">No metadata</span>
                                            )}
                                            {post.attributes && Object.entries(post.attributes).length > 3 && (
                                                <span className="text-[11px] font-bold text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg">
                                                    +{Object.keys(post.attributes).length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5">
                                        <div className="flex flex-col text-xs">
                                            <span className="text-gray-900 dark:text-gray-100 font-medium">
                                                {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="text-gray-400">Published date</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-5 px-6 text-right">
                                        <div className="flex justify-end items-center gap-1 opacity-10 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/posts/${post.id}/edit`}>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="w-9 h-9 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-9 h-9 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                onClick={() => handleDelete(post)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {posts.data.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-16 text-center">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                <Plus className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">No posts yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-xs mt-1 mb-6">Start growing your blog by creating your first entry with custom attributes.</p>
                            <Link href="/posts/create">
                                <Button variant="outline">Create your first post</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {posts.links && posts.links.length > 3 && (
                    <div className="flex items-center justify-center mt-8">
                        <nav className="flex gap-2 p-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
                            {posts.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    disabled={!link.url}
                                    className={`min-w-[40px] h-10 flex items-center justify-center text-sm font-bold rounded-xl transition-all ${link.active
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        } ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
