import React from 'react';
import { Head, Link } from '@inertiajs/react';
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
    Hash
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type Wallpaper } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
    wallpaper: Wallpaper;
}

export default function Show({ wallpaper }: Props) {
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Technical Information */}
                        <Card>
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
                        </Card>

                        {/* Engagement Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                                    <TrendingUp className="w-4 h-4" />
                                    Engagement
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <div className="text-center">
                                    <p className="text-5xl font-black tracking-tighter italic text-primary mb-1">
                                        {wallpaper.downloads_count}
                                    </p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        Total Downloads
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" className="mt-6 w-full gap-2 border-dashed" asChild>
                                    <a href={wallpaper.src} download>
                                        <Download className="w-3 h-3" />
                                        Download Current Archive
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Summary & Meta */}
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

                        {/* Description/Alt text */}
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
                    </div>

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
