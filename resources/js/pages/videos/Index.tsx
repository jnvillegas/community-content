import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Video as VideoIcon, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from "@/lib/utils";

interface Video {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
    video_url: string;
    views_count: number;
    likes_count: number;
    comments_count: number;
    user: {
        name: string;
    };
    categories: Array<{
        id: number;
        name: string;
    }>;
    created_at: string;
}

interface Stats {
    total_videos: number;
    total_likes: number;
    total_comments: number;
    total_views: number;
}

interface Comment {
    id: number;
    content: string;
    user: {
        name: string;
        avatar: string;
    };
    video_title: string;
    created_at: string;
}

interface Props {
    videos: {
        data: Video[];
        links: any[];
    };
    stats: Stats;
    recentComments: Comment[];
    filters?: {
        search?: string;
        filter?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Videos', href: '/videos' },
];

export default function Index({ videos, stats, recentComments, filters = {} }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const currentFilter = filters.filter || 'recent';

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    '/videos',
                    { search: search, filter: currentFilter },
                    { preserveState: true, replace: true, preserveScroll: true }
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleFilterChange = (newFilter: string) => {
        router.get(
            '/videos',
            { search: search, filter: newFilter },
            { preserveState: true, replace: true, preserveScroll: true }
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este video?')) {
            router.delete(`/videos/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Videos Dashboard" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Videos Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your video content and engagement.</p>
                    </div>
                    <Button asChild className="bg-[#1a87cb] hover:bg-[#1a87cb]/90 font-bold">
                        <Link href="/videos/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Upload Video
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                            <VideoIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_videos}</div>
                            <p className="text-xs text-muted-foreground">All time uploads</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_views}</div>
                            <p className="text-xs text-muted-foreground">Global engagement</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_likes}</div>
                            <p className="text-xs text-muted-foreground">User appreciations</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_comments}</div>
                            <p className="text-xs text-muted-foreground">Active discussions</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-7">
                    <div className="md:col-span-5 space-y-6">
                        <Card className="border-card shadow-sm bg-background dark:bg-card">
                            <CardHeader className="p-4 md:p-6 border-b border-muted">
                                <div className="flex flex-col md:flex-row gap-4 justify-between">
                                    <div className="relative max-w-sm w-full">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search videos..."
                                            className="pl-10 border-muted bg-background/50 dark:bg-card/30"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
                                        <button
                                            onClick={() => handleFilterChange('all')}
                                            className={cn(
                                                "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                                                currentFilter === 'all'
                                                    ? "bg-muted text-foreground"
                                                    : "hover:bg-muted/50 text-muted-foreground"
                                            )}
                                        >
                                            All
                                        </button>
                                        <button
                                            onClick={() => handleFilterChange('recent')}
                                            className={cn(
                                                "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                                                currentFilter === 'recent'
                                                    ? "bg-muted text-foreground"
                                                    : "hover:bg-muted/50 text-muted-foreground"
                                            )}
                                        >
                                            Recent
                                        </button>
                                        <button
                                            onClick={() => handleFilterChange('trending')}
                                            className={cn(
                                                "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                                                currentFilter === 'trending'
                                                    ? "bg-muted text-foreground"
                                                    : "hover:bg-muted/50 text-muted-foreground"
                                            )}
                                        >
                                            Trending
                                        </button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-background/50 dark:bg-card/50">
                                        <TableRow className="hover:bg-transparent border-muted">
                                            <TableHead className="font-bold text-gray-900 dark:text-gray-100 px-6 py-4">Video</TableHead>
                                            <TableHead className="font-bold text-gray-900 dark:text-gray-100">Engagement</TableHead>
                                            <TableHead className="font-bold text-gray-900 dark:text-gray-100">Stats</TableHead>
                                            <TableHead className="font-bold text-gray-900 dark:text-gray-100">Date</TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {videos.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-64 text-center">
                                                    <div className="flex flex-col items-center justify-center space-y-2">
                                                        <VideoIcon className="h-10 w-10 text-gray-200" />
                                                        <p className="text-gray-500 font-medium">No videos found</p>
                                                        <Button variant="link" asChild className="text-foreground hover:text-foreground">
                                                            <Link href="/videos/create">Upload your first video</Link>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            videos.data.map((video) => (
                                                <TableRow key={video.id} className="group hover:bg-background/50 dark:hover:bg-card/50 border-muted transition-colors">
                                                    <TableCell className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="size-12 rounded-lg overflow-hidden shrink-0 border border-muted bg-muted/50">
                                                                <img
                                                                    src={video.thumbnail_url}
                                                                    alt={video.title}
                                                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col min-w-0">
                                                                <span className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-foreground transition-colors truncate">
                                                                    {video.title}
                                                                </span>
                                                                 <span className="text-xs text-gray-500 line-clamp-1">{video.categories[0]?.name || 'Sin categoría'}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                                                                {video.likes_count}
                                                            </div>
                                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                <MessageCircle className="h-3.5 w-3.5 text-blue-500" />
                                                                {video.comments_count}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                {video.views_count} views
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(video.created_at).toLocaleDateString()}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="px-6">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-40">
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/videos/${video.id}/edit`} className="flex items-center">
                                                                        <Edit className="mr-2 h-3.5 w-3.5" />
                                                                        Edit
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/videos/${video.id}`} className="flex items-center">
                                                                        <Eye className="mr-2 h-3.5 w-3.5" />
                                                                        View
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    className="text-red-600 focus:text-red-600 flex items-center cursor-pointer"
                                                                    onClick={() => handleDelete(video.id)}
                                                                >
                                                                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-2">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Latest comments on videos.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {recentComments.map((comment) => (
                                        <div key={comment.id} className="flex items-start gap-3">
                                            <div className="size-8 rounded-full overflow-hidden border shrink-0">
                                                <img
                                                    src={comment.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}&background=random`}
                                                    alt={comment.user.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium leading-none mb-1 truncate">
                                                    {comment.user.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground line-clamp-2 italic mb-1">
                                                    "{comment.content}"
                                                </p>
                                                <p className="text-[10px] text-muted-foreground font-semibold">
                                                    En: {comment.video_title}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">
                                                    {new Date(comment.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {recentComments.length === 0 && (
                                        <div className="text-center text-sm text-muted-foreground py-8">
                                            No recent activity.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
