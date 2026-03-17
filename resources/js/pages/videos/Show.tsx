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
    User,
    Heart,
    MessageCircle,
    Send
} from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Separator } from '@/components/ui/separator';
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
    location_url?: string;
    status: string;
    author: { name: string; avatar?: string };
    categories: Array<{ id: number; name: string }>;
    created_at: string;
    likes_count?: number;
    is_liked?: boolean;
    comments?: any[];
    comments_count?: number;
}

interface Props {
    video: Video;
    relatedVideos: Video[];
    auth: {
        user: any;
    };
}

export default function Show({ video: initialVideo, relatedVideos, auth }: Props) {
    const page = usePage<Props>();
    const [isLiked, setIsLiked] = useState(initialVideo.is_liked || false);
    const [likesCount, setLikesCount] = useState(initialVideo.likes_count || 0);
    const [comments, setComments] = useState(initialVideo.comments || []);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    useEffect(() => {
        const updatedVideo = page.props.video;
        setIsLiked(updatedVideo.is_liked || false);
        setLikesCount(updatedVideo.likes_count || 0);
        setComments(updatedVideo.comments || []);
    }, [page.props.video]);

    const handleLike = () => {
        router.post(route('videos.like', initialVideo.id), {}, {
            preserveScroll: true,
        });
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setSubmittingComment(true);
        router.post(route('videos.comment', initialVideo.id),
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

    const video = page.props.video;
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
                        {/* <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Share</span>
                        </Button> */}
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
                            {/* <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="px-3 py-1 font-bold text-[10px] uppercase tracking-wide">
                                    Video
                                </Badge>
                                {video.categories.map(cat => (
                                    <Badge key={cat.id} variant="outline" className="text-muted-foreground font-medium text-[10px] uppercase tracking-wide">
                                        {cat.name}
                                    </Badge>
                                ))}
                            </div> */}

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

                            {/* Engagement Section */}
                            <div className="mt-12 pt-12 border-t border-muted">
                                <div className="flex items-center gap-8 mb-12">
                                    <button
                                        onClick={handleLike}
                                        className={`flex items-center gap-2 transition-all ${isLiked
                                            ? 'text-red-500 scale-105'
                                            : 'text-muted-foreground hover:text-red-500'
                                            }`}
                                    >
                                        <Heart className={`w-8 h-8 ${isLiked ? 'fill-current' : ''}`} />
                                        <span className="font-black text-xl">{likesCount}</span>
                                    </button>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MessageCircle className="w-8 h-8" />
                                        <span className="font-black text-xl">{comments.length}</span>
                                    </div>
                                </div>

                                {/* Comment Form */}
                                <h3 className="text-2xl font-black mb-8">Comentarios</h3>
                                {auth.user ? (
                                    <form onSubmit={handleCommentSubmit} className="mb-12">
                                        <div className="flex gap-4">
                                            <Avatar className="h-10 w-10 border border-muted shrink-0">
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
                                                    className="min-h-[100px] resize-none rounded-2xl border-muted bg-gray-50 dark:bg-zinc-900 focus:ring-primary"
                                                />
                                                <div className="flex justify-end">
                                                    <Button
                                                        type="submit"
                                                        disabled={!commentText.trim() || submittingComment}
                                                        className="rounded-full px-8 font-bold"
                                                    >
                                                        {submittingComment ? 'Publicando...' : 'Publicar comentario'}
                                                        <Send className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="mb-12 p-6 rounded-3xl bg-primary/5 border border-primary/10">
                                        <p className="text-primary font-medium">
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
                                                        <span className="font-black text-foreground text-sm">{comment.user?.name}</span>
                                                        <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">•</span>
                                                        <span className="text-muted-foreground text-xs">
                                                            {comment.created_at ? format(new Date(comment.created_at), "d 'de' MMM", { locale: es }) : 'N/A'}
                                                        </span>
                                                    </div>
                                                    <p className="text-muted-foreground leading-relaxed">
                                                        {comment.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-muted">
                                            <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                                            <p className="text-muted-foreground font-bold">No hay comentarios aún.</p>
                                            <p className="text-sm text-muted-foreground/60">¡Sé el primero en compartir tu opinión!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
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
                                            {video.location_url ? (
                                                <a
                                                    href={video.location_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
                                                >
                                                    {video.location}
                                                </a>
                                            ) : (
                                                <p className="text-sm font-bold">{video.location}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">Duration</p>
                                        <p className="text-sm font-bold">{video.duration || 'N/A'}</p>
                                    </div>
                                </div> */}
                            </CardContent>
                        </Card>

                        {/* Related Videos */}
                        {/* <Card className="border-none shadow-sm">
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
                        </Card> */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
