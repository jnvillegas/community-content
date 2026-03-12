import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Settings2,
    Lock,
    Monitor,
    Smartphone,
    Maximize2,
    Download,
    Loader2,
    Eye,
    Zap,
    Scale,
    Calendar,
    Hash
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type Wallpaper } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
    wallpaper: Wallpaper;
}

export default function Edit({ wallpaper }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: wallpaper.title || '',
        alt: wallpaper.alt || '',
        src: wallpaper.src || '',
        image_file: null as File | null,
        is_locked: wallpaper.is_locked || false,
        lock_text: wallpaper.lock_text || 'Junte-se à Nossa Comunidade',
        lock_subtitle: wallpaper.lock_subtitle || 'EXCLUSIVO PARA MEMBROS',
        category: wallpaper.category || 'both',
        resolution: wallpaper.resolution || '',
        file_size: wallpaper.file_size || '',
        is_featured: wallpaper.is_featured || false,
        status: wallpaper.status || 'draft',
        published_at: wallpaper.published_at || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/wallpapers/${wallpaper.id}`);
    };

    const formattedDate = format(new Date(wallpaper.created_at), "d 'de' MMMM, yyyy", { locale: es });

    return (
        <AppLayout breadcrumbs={[
            { title: 'Wallpapers', href: '/wallpapers' },
            { title: wallpaper.title, href: '#' },
            { title: 'Edit', href: '#' },
        ]}>
            <Head title={`Edit ${wallpaper.title}`} />

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
                            <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                                ID: {wallpaper.id}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 text-primary" />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Download className="w-3 h-3 text-primary" />
                                {wallpaper.downloads_count} downloads
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                            <Link href={`/wallpapers/${wallpaper.id}`}>
                                <Eye className="w-4 h-4" />
                                <span className="hidden sm:inline">View Public</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Wallpaper Content</CardTitle>
                            <CardDescription>Update the imagery and descriptive information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g. Neon Horizon"
                                    className="text-xl font-bold"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Current & New Imagery</Label>
                                <div
                                    className="aspect-video w-full rounded-xl border-2 border-dashed border-muted bg-muted/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all overflow-hidden relative group"
                                    onClick={() => document.getElementById('wallpaper-upload')?.click()}
                                >
                                    {data.image_file ? (
                                        <img
                                            src={URL.createObjectURL(data.image_file)}
                                            className="w-full h-full object-cover"
                                            alt="Preview"
                                        />
                                    ) : data.src ? (
                                        <img
                                            src={data.src}
                                            className="w-full h-full object-cover"
                                            alt={data.alt || data.title}
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center text-muted-foreground">
                                            <ImageIcon className="h-12 w-12 mb-3 opacity-20" />
                                            <p className="text-sm font-medium">Click to select or drag and drop</p>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white font-bold text-xs uppercase bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">Change Wallpaper Image</span>
                                    </div>
                                </div>
                                <input
                                    id="wallpaper-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                            setData('image_file', e.target.files[0]);
                                        }
                                    }}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="alt">Accessibility Title (Alt Text)</Label>
                                <Input
                                    id="alt"
                                    placeholder="Detailed description for screen readers..."
                                    value={data.alt}
                                    onChange={e => setData('alt', e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                                    <Settings2 className="w-4 h-4" />
                                    Technical Specs
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="resolution" className="flex items-center gap-2 text-xs font-bold uppercase opacity-70">
                                        <Maximize2 className="w-3 h-3 text-primary" /> Resolution
                                    </Label>
                                    <Input
                                        id="resolution"
                                        placeholder="3840x2160"
                                        value={data.resolution}
                                        onChange={e => setData('resolution', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="file_size" className="flex items-center gap-2 text-xs font-bold uppercase opacity-70">
                                        <Scale className="w-3 h-3 text-primary" /> File Size
                                    </Label>
                                    <Input
                                        id="file_size"
                                        placeholder="4.2 MB"
                                        value={data.file_size}
                                        onChange={e => setData('file_size', e.target.value)}
                                    />
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-xs font-bold uppercase opacity-70">
                                        <Monitor className="w-3 h-3 text-primary" /> Target Device
                                    </Label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(val: any) => setData('category', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="desktop">
                                                <span className="flex items-center gap-2">
                                                    <Monitor className="w-3 h-3 text-primary" /> Desktop
                                                </span>
                                            </SelectItem>
                                            <SelectItem value="mobile">
                                                <span className="flex items-center gap-2">
                                                    <Smartphone className="w-3 h-3 text-primary" /> Mobile
                                                </span>
                                            </SelectItem>
                                            <SelectItem value="both">
                                                <span className="flex items-center gap-2">
                                                    <Maximize2 className="w-3 h-3 text-primary" /> Both
                                                </span>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                                    <Zap className="w-4 h-4" />
                                    Settings & Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground uppercase opacity-70">Publication Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(val: any) => setData('status', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Borrador</SelectItem>
                                            <SelectItem value="published">Publicado</SelectItem>
                                            <SelectItem value="archived">Archivado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Separator />

                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_featured" className="text-sm font-bold">Featured</Label>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black">Highlight on home screen</p>
                                        </div>
                                        <Switch
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onCheckedChange={(checked) => setData('is_featured', checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_locked" className="text-sm font-bold">Locked</Label>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black text-orange-500">Exclusive to members</p>
                                        </div>
                                        <Switch
                                            id="is_locked"
                                            checked={data.is_locked}
                                            onCheckedChange={(checked) => setData('is_locked', checked)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {data.is_locked && (
                        <Card className="border-primary/20 bg-primary/5 animate-in fade-in slide-in-from-top-4 duration-500">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                                    <Lock className="w-4 h-4" />
                                    Locked Content Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="lock_text">Primary Message</Label>
                                    <Input
                                        id="lock_text"
                                        placeholder="Join Our Community"
                                        value={data.lock_text}
                                        onChange={e => setData('lock_text', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lock_subtitle">Secondary Subtitle</Label>
                                    <Input
                                        id="lock_subtitle"
                                        placeholder="EXCLUSIVE FOR MEMBERS"
                                        value={data.lock_subtitle}
                                        onChange={e => setData('lock_subtitle', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="border-none shadow-none bg-muted/20">
                        <CardHeader className="py-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                <Hash className="w-3 h-3 text-primary" />
                                Metadata & System Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-6 space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-3 rounded-lg border bg-card/50">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">External Source URL</p>
                                    <p className="text-xs font-mono break-all opacity-80">{wallpaper.src || 'None'}</p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card/50">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Permanent Slug</p>
                                    <p className="text-xs font-mono break-all opacity-80">/{wallpaper.slug}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4 py-8">
                        <Button variant="outline" asChild>
                            <Link href="/wallpapers">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-[140px]">
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update Wallpaper'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
