import { Head, Link } from '@inertiajs/react';
import { Plus, Play, Clock, MapPin, Eye, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from "@/lib/utils";

interface Video {
    id: number;
    title: string;
    youtube_id: string;
    thumbnail_url: string;
    duration: string;
    location: string;
    author?: {
        name: string;
    };
    created_at: string;
}

interface Props {
    videos: Video[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Videos', href: '/videos' },
    { title: 'Gallery', href: '/videos/gallery' },
];

export default function Gallery({ videos }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Video Gallery" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Video Gallery</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Browse our collection of travel expeditions and adventures.</p>
                    </div>
                    <Button asChild>
                        <Link href="/videos/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Upload Video
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videos.length === 0 ? (
                        <div className="col-span-full py-32 text-center border-2 border-dashed border-muted rounded-3xl">
                            <p className="text-gray-400 font-bold uppercase tracking-widest">No video expeditions found</p>
                            <Button variant="link" asChild className="mt-2">
                                <Link href="/videos/create">Share your first adventure</Link>
                            </Button>
                        </div>
                    ) : (
                        videos.map((video) => (
                            <div key={video.id} className="group relative bg-background dark:bg-card border border-muted rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                                {/* Thumbnail Container */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            if (target.src.includes('maxresdefault.jpg')) {
                                                target.src = `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`;
                                            }
                                        }}
                                    />
                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                            <Play className="w-6 h-6 text-white fill-white" />
                                        </div>
                                    </div>
                                    {/* Duration Badge */}
                                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {video.duration || '00:00'}
                                    </div>
                                    {/* Location Badge */}
                                    <div className="absolute top-3 left-3 bg-primary-500/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-black uppercase text-white tracking-wider flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {video.location || 'Explorer'}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex justify-between gap-2 items-start">
                                        <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary-500 transition-colors">
                                            {video.title}
                                        </h3>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors shrink-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/videos/${video.id}`} className="cursor-pointer">
                                                        <Play className="mr-2 h-3.5 w-3.5" /> Play
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/videos/${video.id}/edit`} className="cursor-pointer">
                                                        <Edit className="mr-2 h-3.5 w-3.5" /> Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-500">
                                                    <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                        <span>{video.author?.name || 'Explorer'}</span>
                                        <span>{new Date(video.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <Link href={`/videos/${video.id}`} className="absolute inset-0 z-0" aria-label={`View ${video.title}`} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
