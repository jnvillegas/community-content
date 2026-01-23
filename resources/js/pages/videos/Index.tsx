import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react'; // Import router
import { Plus, Map, MapPin, MoreHorizontal, Edit, Trash2, Search, Filter } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from "@/lib/utils";

interface Video {
    id: number;
    title: string;
    youtube_id: string;
    thumbnail_url: string;
    duration: string;
    location: string;
    author: {
        name: string;
        avatar?: string;
    };
    created_at: string;
}

interface Props {
    videos: {
        data: Video[];
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
                    { search: search, filter: currentFilter }, // Keep current filter
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Videos" />

            <div className="p-4 md:p-8 space-y-6">
                {/* Standard Header Section (Matches Articles) */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Videos</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your travel expeditions and video content.</p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold transition-all hover:scale-105">
                        <Link href="/videos/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Share Adventure
                        </Link>
                    </Button>
                </div>

                {/* Search and Filters Toolbar (Matches Articles) */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search videos..."
                            className="pl-10 border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/50"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <Button variant="outline" size="sm" className="border-gray-100 dark:border-gray-800 hidden md:flex">
                            <Filter className="mr-2 h-3.5 w-3.5" />
                            Filter
                        </Button>

                        <button
                            onClick={() => handleFilterChange('all')}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                                currentFilter === 'all'
                                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                                    : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500"
                            )}
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleFilterChange('recent')}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                                currentFilter === 'recent'
                                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                                    : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500"
                            )}
                        >
                            Recent
                        </button>
                        <button
                            onClick={() => handleFilterChange('trending')}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                                currentFilter === 'trending'
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                    : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500"
                            )}
                        >
                            Trending
                        </button>
                    </div>
                </div>

                {/* Video Grid Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {videos.data.length === 0 ? (
                        <div className="col-span-full py-32 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
                            <p className="text-gray-300 font-black uppercase tracking-[0.2em]">No expeditions found</p>
                        </div>
                    ) : (
                        videos.data.map((video) => (
                            <div key={video.id} className="group animate-in fade-in duration-700">

                                {/* Image Box - Modified to fit standard card aesthetic slightly better while keeping rounded look */}
                                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:border-gray-200 dark:group-hover:border-gray-700">
                                    <Link href={`/videos/${video.id}`} className="block w-full h-full">
                                        <img
                                            src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                        />
                                    </Link>

                                    {/* Overlay: Map Icon */}
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Map className="w-3.5 h-3.5" />
                                    </div>

                                    {/* Overlay: Duration */}
                                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm">
                                        {video.duration || '00:00'}
                                    </div>
                                </div>

                                {/* Card Content Below - Cleaner, more aligned with Article Table typography */}
                                <div className="mt-3 px-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <Link href={`/videos/${video.id}`} className="block flex-1">
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                {video.title}
                                            </h3>
                                        </Link>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/videos/${video.id}/edit`} className="cursor-pointer">
                                                        <Edit className="mr-2 h-3.5 w-3.5" /> Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                                                    <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-5 w-5 border border-gray-100">
                                                <AvatarImage src={video.author?.avatar} />
                                                <AvatarFallback className="text-[9px]">{video.author?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs text-gray-500 font-medium truncate max-w-[100px]">
                                                {video.author?.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-[10px] font-bold uppercase tracking-wider">
                                            <MapPin className="h-3 w-3" />
                                            <span className="truncate max-w-[80px]">{video.location || 'World'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
