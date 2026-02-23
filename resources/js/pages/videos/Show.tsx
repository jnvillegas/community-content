import { Head, Link } from '@inertiajs/react';
import {
    ChevronLeft,
    MapPin,
    Clock,
    Calendar,
    Share2,
    Play,
    Edit,
    Youtube
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface Video {
    id: number;
    title: string;
    slug: string;
    description: string;
    youtube_id: string;
    thumbnail_url: string;
    duration: string;
    location: string;
    status: string;
    author: { name: string; avatar?: string };
    categories: Array<{ id: number; name: string }>;
    created_at: string;
}

interface Props {
    video: Video;
    relatedVideos: Video[];
}

export default function Show({ video, relatedVideos }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Videos', href: '/videos' },
        { title: 'Watching Expedition', href: `/videos/${video.id}` },
    ];

    const embedUrl = `https://www.youtube.com/embed/${video.youtube_id}?rel=0&showinfo=0&autoplay=0`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${video.title} - Explorer Hub`} />

            <div className="bg-[#F8F9FA] dark:bg-gray-950/20 min-h-screen">

                {/* Header Action Bar - Matches Create/Edit/Articles */}
                <div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-muted bg-background/80 px-4 backdrop-blur-md dark:bg-card/80 md:px-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild className="text-gray-500 hover:text-gray-900 rounded-lg">
                            <Link href="/videos">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Videos
                            </Link>
                        </Button>
                        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800" />
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest hidden md:inline">
                            Video Preview
                        </span>
                        <Badge variant="outline" className="hidden md:inline-flex text-[10px] font-black uppercase tracking-widest opacity-60">ID #{video.id}</Badge>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="font-bold text-gray-500">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                        <Button asChild className="font-bold h-9 px-6 transition-all">
                            <Link href={`/videos/${video.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Video
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">

                    {/* Main Content (Player & Description) */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Immersive Video Player */}
                        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg relative group border border-muted">
                            {video.youtube_id ? (
                                <iframe
                                    src={embedUrl}
                                    className="w-full h-full border-none"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                    <Youtube className="h-12 w-12 opacity-50" />
                                </div>
                            )}
                        </div>

                        {/* Video Info Header */}
                        <div className="space-y-6 bg-background dark:bg-card p-6 md:p-8 rounded-xl border border-muted shadow-sm">

                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <Badge variant="secondary" className="bg-background text-foreground border-muted px-3 py-1 font-bold text-[10px] uppercase tracking-wide rounded-md">
                                        Video
                                    </Badge>
                                    {video.categories.map(cat => (
                                        <Badge key={cat.id} variant="outline" className="text-muted-foreground font-medium text-[10px] uppercase tracking-wide rounded-md border-muted">
                                            {cat.name}
                                        </Badge>
                                    ))}
                                    {video.location && (
                                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 ml-auto">
                                            <MapPin className="h-3 w-3" />
                                            {video.location}
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                                    {video.title}
                                </h1>
                            </div>

                            <div className="flex items-center justify-between py-4 border-y border-muted">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border border-muted">
                                        <AvatarImage src={video.author?.avatar} />
                                        <AvatarFallback className="bg-blue-600 text-white font-bold text-xs">{video.author?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900 dark:text-white text-sm">{video.author?.name}</span>
                                        <span className="text-xs text-gray-500">Author</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Published</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                            {new Date(video.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Duration</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                                            {video.duration || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Long Description */}
                            <div className="prose prose-sm md:prose-base max-w-none text-gray-600 dark:text-gray-300">
                                <p className="whitespace-pre-wrap leading-relaxed">
                                    {video.description || 'No description provided.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Next Expeditions) */}
                    <div className="lg:col-span-4 space-y-6">

                        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Play className="h-3 w-3" /> Up Next
                            </h3>

                            <div className="space-y-4">
                                {relatedVideos.length === 0 ? (
                                    <p className="text-sm text-gray-400 italic">No related videos found.</p>
                                ) : (
                                    relatedVideos.map(rel => (
                                        <Link key={rel.id} href={`/videos/${rel.id}`} className="group flex gap-3 items-start p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <div className="relative w-28 aspect-video rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                                                <img src={rel.thumbnail_url || `https://img.youtube.com/vi/${rel.youtube_id}/mqdefault.jpg`} className="w-full h-full object-cover" alt={rel.title} />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                                <div className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-sm px-1 py-0.5 rounded-[2px] text-[8px] font-bold text-white">
                                                    {rel.duration || '00:00'}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0 py-0.5">
                                                <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{rel.title}</h4>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <span className="text-[10px] text-gray-500 font-medium truncate">{rel.author?.name}</span>
                                                    {rel.location && (
                                                        <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                                                            <MapPin className="h-2.5 w-2.5" />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                            <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm mb-1">Explorer Hub</h4>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mb-3 leading-relaxed">
                                Manage your expeditions and share your journeys with the world.
                            </p>
                            <Button size="sm" variant="outline" className="w-full bg-white text-blue-700 border-blue-200 hover:bg-blue-50 font-bold" asChild>
                                <Link href="/videos">View All Videos</Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
