import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    MapPin,
    Clock,
    CalendarDays,
    Share2,
    Play,
    Edit,
    Youtube,
    User
} from 'lucide-react';
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
    const embedUrl = `https://www.youtube.com/embed/${video.youtube_id}?rel=0&showinfo=0&autoplay=0`;

    return (
        <AppLayout breadcrumbs={[
            { title: 'Videos', href: '/videos' },
            { title: video.title, href: '#' },
        ]}>
            <Head title={`${video.title} - Explorer Hub`} />

            <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
                <div className="mb-6 flex justify-between items-start">
                    <div>
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2" asChild>
                            <Link href="/videos">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Videos
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight mt-2">{video.title}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm">
                            <CalendarDays className="w-4 h-4" />
                            <span>
                                Publicado el {video.created_at && isValid(new Date(video.created_at))
                                    ? format(new Date(video.created_at), "d 'de' MMMM, yyyy", { locale: es })
                                    : 'N/A'}
                            </span>
                            <span className="opacity-30">•</span>
                            <span>ID #{video.id}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Share</span>
                        </Button>
                        <Button size="sm" className="gap-2" asChild>
                            <Link href={`/videos/${video.id}/edit`}>
                                <Edit className="w-4 h-4" />
                                <span className="hidden sm:inline">Edit Video</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Player */}
                        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg border border-muted ring-1 ring-primary/5">
                            {video.youtube_id ? (
                                <iframe
                                    src={embedUrl}
                                    className="w-full h-full border-none"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                                    <Youtube className="h-12 w-12 opacity-50" />
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="px-3 py-1 font-bold text-[10px] uppercase tracking-wide">
                                    Video
                                </Badge>
                                {video.categories.map(cat => (
                                    <Badge key={cat.id} variant="outline" className="text-muted-foreground font-medium text-[10px] uppercase tracking-wide">
                                        {cat.name}
                                    </Badge>
                                ))}
                            </div>

                            <Card className="border-none shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl">Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                                        {video.description || 'No description provided.'}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Meta Info */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Expedition Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">Author</p>
                                        <p className="text-sm font-bold">{video.author?.name || 'Unknown'}</p>
                                    </div>
                                </div>

                                {video.location && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <MapPin className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-medium">Location</p>
                                            <p className="text-sm font-bold">{video.location}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">Duration</p>
                                        <p className="text-sm font-bold">{video.duration || 'N/A'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related Videos */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Related Journeys</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-border">
                                    {relatedVideos.length === 0 ? (
                                        <div className="p-6 text-center">
                                            <p className="text-sm text-muted-foreground italic">No related videos found.</p>
                                        </div>
                                    ) : (
                                        relatedVideos.map(rel => (
                                            <Link key={rel.id} href={`/videos/${rel.id}`} className="group flex gap-3 p-4 hover:bg-muted/50 transition-colors">
                                                <div className="relative w-24 aspect-video rounded overflow-hidden bg-muted flex-shrink-0">
                                                    <img
                                                        src={rel.thumbnail_url || `https://img.youtube.com/vi/${rel.youtube_id}/mqdefault.jpg`}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                        alt={rel.title}
                                                    />
                                                    <div className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-sm px-1 py-0.5 rounded-[2px] text-[8px] font-bold text-white">
                                                        {rel.duration || '00:00'}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-xs line-clamp-2 leading-tight group-hover:text-primary transition-colors">{rel.title}</h4>
                                                    <p className="text-[10px] text-muted-foreground mt-1 truncate">{rel.author?.name}</p>
                                                </div>
                                            </Link>
                                        ))
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
