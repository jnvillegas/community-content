import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Video as VideoIcon, FileVideo, MapPin } from 'lucide-react';
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
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from "@/lib/utils";

interface Video {
    id: number;
    title: string;
    youtube_id: string;
    thumbnail_url: string;
    duration: string;
    location: string;
    status: 'draft' | 'published' | 'private';
    author: {
        name: string;
        avatar?: string;
    };
    categories: Array<{ id: number; name: string }>;
    created_at: string;
}

interface Props {
    videos: {
        data: Video[];
        links: any[];
    };
    filters?: {
        search?: string;
        filter?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Videos', href: '/videos' },
];

export default function Index({ videos, filters = {} }: Props) {
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

    const getStatusBadge = (status: Video['status']) => {
        switch (status) {
            case 'published':
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Published</Badge>;
            case 'draft':
                return <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-none">Draft</Badge>;
            case 'private':
                return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-none dark:bg-gray-800 dark:text-gray-300">Private</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Videos" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Videos</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your travel expeditions and video content.</p>
                    </div>
                    <Button asChild>
                        <Link href="/videos/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Share Adventure
                        </Link>
                    </Button>
                </div>

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
                                <Button variant="outline" size="sm" className="hidden md:flex border-muted">
                                    <Filter className="mr-2 h-3.5 w-3.5" />
                                    Filter
                                </Button>
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
                                    <TableHead className="font-bold text-gray-900 dark:text-gray-100 px-6 py-4 w-[120px]">Preview</TableHead>
                                    <TableHead className="font-bold text-gray-900 dark:text-gray-100">Title</TableHead>
                                    <TableHead className="font-bold text-gray-900 dark:text-gray-100">Status</TableHead>
                                    <TableHead className="font-bold text-gray-900 dark:text-gray-100">Author</TableHead>
                                    <TableHead className="font-bold text-gray-900 dark:text-gray-100">Location</TableHead>
                                    <TableHead className="font-bold text-gray-900 dark:text-gray-100">Date</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {videos.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <FileVideo className="h-10 w-10 text-gray-200" />
                                                <p className="text-gray-500 font-medium">No videos found</p>
                                                <Button variant="link" asChild className="text-foreground hover:text-foreground">
                                                    <Link href="/videos/create">Share your first adventure</Link>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    videos.data.map((video) => (
                                        <TableRow key={video.id} className="group hover:bg-background/50 dark:hover:bg-card/50 border-muted transition-colors">
                                            <TableCell className="px-6 py-4">
                                                <div className="relative aspect-video w-24 rounded-lg overflow-hidden bg-background dark:bg-card/50 border border-muted shadow-sm">
                                                    <img
                                                        src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                                        alt={video.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute bottom-1 right-1 bg-black/60 px-1 rounded text-[8px] font-bold text-white">
                                                        {video.duration || '00:00'}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-foreground transition-colors line-clamp-1">
                                                        {video.title}
                                                    </span>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {(video.categories || []).map((cat) => (
                                                            <Badge key={cat.id} variant="outline" className="text-[10px] py-0 px-2 font-medium border-muted">
                                                                {cat.name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(video.status)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6 border border-muted">
                                                        <AvatarImage src={video.author?.avatar} />
                                                        <AvatarFallback className="text-[10px]">{video.author?.name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {video.author?.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {video.location || 'World'}
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
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/videos/${video.id}/edit`} className="flex items-center cursor-pointer">
                                                                <Edit className="mr-2 h-3.5 w-3.5" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/videos/${video.id}`} className="flex items-center cursor-pointer">
                                                                <Eye className="mr-2 h-3.5 w-3.5" />
                                                                Watch
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
        </AppLayout>
    );
}
