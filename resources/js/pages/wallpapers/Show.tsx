import {
    ArrowLeft,
    Edit,
    Download,
    Lock,
    Calendar,
    User,
    Eye,
    Monitor,
    Smartphone,
    Maximize2,
    Scale,
    TrendingUp,
    Clock,
    Hash,
    Heart,
    MessageCircle,
    Send,
    Share2
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type Wallpaper } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { router, usePage, Head, Link } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    wallpaper: Wallpaper;
}

export default function Show({ wallpaper }: Props) {
    const { auth } = usePage().props as any;
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getStatusBadge = (status: Wallpaper['status']) => {
        switch (status) {
            case 'published':
                return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20 px-3 py-1 font-bold uppercase text-[10px] tracking-wider">Publicado</Badge>;
            case 'draft':
                return <Badge variant="outline" className="opacity-60 px-3 py-1 font-bold uppercase text-[10px] tracking-wider">Borrador</Badge>;
            case 'archived':
                return <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-orange-500/20 px-3 py-1 font-bold uppercase text-[10px] tracking-wider">Archivado</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const formattedDate = format(new Date(wallpaper.created_at), "d 'de' MMMM, yyyy", { locale: es });
    const formattedPublishedDate = wallpaper.published_at ? format(new Date(wallpaper.published_at), "d 'de' MMMM, yyyy", { locale: es }) : null;

    return (
        <AppLayout breadcrumbs={[
            { title: 'Wallpapers', href: '/wallpapers' },
            { title: wallpaper.title, href: '#' },
        ]}>
            <Head title={wallpaper.title} />

            <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
                <div className="mb-6 flex justify-between items-start">
                    <div>
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2" asChild>
                            <Link href="/wallpapers">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Wallpapers
                            </Link>
                        </Button>
                        <div className="flex items-center gap-3 mt-2">
                            <h1 className="text-3xl font-black tracking-tight italic uppercase">{wallpaper.title}</h1>
                            {getStatusBadge(wallpaper.status)}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 text-primary" />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Hash className="w-3 h-3 text-primary" />
                                ID: {wallpaper.id}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                            <a href={wallpaper.src} target="_blank" rel="noopener noreferrer">
                                <Eye className="w-4 h-4" />
                                <span className="hidden sm:inline">View Image</span>
                            </a>
                        </Button>
                        <Button size="sm" className="gap-2" asChild>
                            <Link href={`/wallpapers/${wallpaper.id}/edit`}>
                                <Edit className="w-4 h-4" />
                                <span className="hidden sm:inline">Edit Wallpaper</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Visual Preview Card */}
                    <Card className="overflow-hidden border-none shadow-2xl shadow-primary/5">
                        <div className="relative aspect-video w-full bg-muted group">
                            <img
                                src={wallpaper.src}
                                alt={wallpaper.alt || wallpaper.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {wallpaper.is_locked && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-8 text-center animate-in fade-in duration-500">
                                    <div className="max-w-md">
                                        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                                            <Lock className="w-8 h-8 text-orange-500" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">
                                            {wallpaper.lock_text}
                                        </h3>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">
                                            {wallpaper.lock_subtitle}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div className="absolute top-4 right-4 flex gap-2">
                                {wallpaper.is_featured && (
                                    <Badge className="bg-primary text-primary-foreground border-none font-black uppercase text-[10px] px-3 py-1">
                                        Featured
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                        {/* Technical Information */}
                        {/* <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                                    <Monitor className="w-4 h-4" />
                                    Technical Specs
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-muted/50">
                                    <span className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                                        <Maximize2 className="w-3 h-3" /> Resolution
                                    </span>
                                    <span className="text-sm font-mono font-bold">{wallpaper.resolution || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-muted/50">
                                    <span className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                                        <Scale className="w-3 h-3" /> File Size
                                    </span>
                                    <span className="text-sm font-mono font-bold">{wallpaper.file_size || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                                        <Smartphone className="w-3 h-3" /> Target Device
                                    </span>
                                    <Badge variant="secondary" className="font-bold uppercase text-[10px] tracking-widest px-2">
                                        {wallpaper.category}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card> */}

                        {/* Engagement Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                                    <TrendingUp className="w-4 h-4" />
                                    Acciones y Estadísticas
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-around py-4 border-b border-muted/50">
                                    <div className="text-center">
                                        <button
                                            onClick={() => router.post(route('wallpapers.like', wallpaper.id), {}, { preserveScroll: true })}
                                            className={`flex flex-col items-center gap-1 transition-all ${wallpaper.is_liked ? 'text-red-500 scale-110' : 'text-muted-foreground hover:text-red-500'}`}
                                        >
                                            <Heart className={`w-8 h-8 ${wallpaper.is_liked ? 'fill-current' : ''}`} />
                                            <span className="text-lg font-black italic tracking-tighter">{wallpaper.likes_count || 0}</span>
                                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Likes</span>
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                                            <MessageCircle className="w-8 h-8" />
                                            <span className="text-lg font-black italic tracking-tighter">{wallpaper.comments_count || 0}</span>
                                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Comentarios</span>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="flex flex-col items-center gap-1 text-primary">
                                            <Download className="w-8 h-8" />
                                            <span className="text-lg font-black italic tracking-tighter">{wallpaper.downloads_count || 0}</span>
                                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Descargas</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Button variant="default" className="w-full gap-2 font-black italic uppercase italic tracking-tight" asChild>
                                        <a href={wallpaper.src} download>
                                            <Download className="w-4 h-4" />
                                            Descargar Wallpaper
                                        </a>
                                    </Button>

                                    <Button variant="outline" className="w-full gap-2 border-dashed font-bold" onClick={() => {
                                        const shareUrl = window.location.href;
                                        if (navigator.share) {
                                            navigator.share({ title: wallpaper.title, url: shareUrl });
                                        } else {
                                            navigator.clipboard.writeText(shareUrl);
                                            alert('Enlace copiado');
                                        }
                                    }}>
                                        <Share2 className="w-4 h-4" />
                                        Compartir con Colegas
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Comments Section */}
                        <Card className="md:col-span-1">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                                    <MessageCircle className="w-4 h-4" />
                                    Conversación de la Comunidad
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Comment Form */}
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!comment.trim()) return;
                                    setIsSubmitting(true);
                                    router.post(route('wallpapers.comment', wallpaper.id), { content: comment }, {
                                        preserveScroll: true,
                                        onSuccess: () => { setComment(''); setIsSubmitting(false); },
                                        onError: () => setIsSubmitting(false)
                                    });
                                }} className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Añade un comentario a este diseño..."
                                            className="w-full bg-muted/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary h-12"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !comment.trim()}
                                        className="h-12 w-12 rounded-xl"
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </form>

                                {/* Comments List */}
                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {wallpaper.comments && wallpaper.comments.length > 0 ? (
                                        wallpaper.comments.map((comment: any) => (
                                            <div key={comment.id} className="flex gap-3 animate-in slide-in-from-bottom-2 duration-300">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                                    <span className="text-[10px] font-black text-primary">
                                                        {comment.user?.name?.substring(0, 2).toUpperCase() || '??'}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-black uppercase tracking-tight">{comment.user?.name || 'Anónimo'}</span>
                                                        <span className="text-[10px] text-muted-foreground font-medium italic">
                                                            {format(new Date(comment.created_at), 'd MMM, HH:mm')}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-foreground/80 leading-relaxed bg-muted/30 p-3 rounded-2xl rounded-tl-none border border-muted-foreground/5">
                                                        {comment.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 opacity-40">
                                            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                            <p className="text-xs font-bold uppercase tracking-[0.2em]">Sé el primero en comentar</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                                    <Clock className="w-4 h-4" />
                                    Lifecycle
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                        <User className="w-4 h-4 opacity-50" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Creator</p>
                                        <p className="text-sm font-bold">{wallpaper.author?.name || 'System'}</p>
                                    </div>
                                </div>
                                <Separator className="opacity-50" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Published On</p>
                                        <p className="text-xs font-bold">{formattedPublishedDate || 'Pending'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Last Update</p>
                                        <p className="text-xs font-bold">{format(new Date(wallpaper.updated_at), "d MMM, yyyy")}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                                    <Hash className="w-4 h-4" />
                                    Contextual Data
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Accessibility Title</p>
                                    <p className="text-sm italic text-foreground/70">
                                        "{wallpaper.alt || 'No descriptive alt text provided.'}"
                                    </p>
                                </div>
                                <Separator className="opacity-50" />
                                <div>
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Public Endpoint</p>
                                    <p className="text-xs font-mono opacity-60 truncate">/wallpapers/{wallpaper.slug}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div> */}

                    <div className="flex justify-between items-center py-8 border-t border-muted/30 mt-8">
                        <Button variant="ghost" asChild>
                            <Link href="/wallpapers" className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back to listing
                            </Link>
                        </Button>
                        <div className="flex gap-4">
                            <Button variant="outline" asChild>
                                <a href={wallpaper.src} target="_blank" rel="noopener noreferrer">
                                    Full Quality View
                                </a>
                            </Button>
                            <Button asChild>
                                <Link href={`/wallpapers/${wallpaper.id}/edit`}>
                                    Modify Assets
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
