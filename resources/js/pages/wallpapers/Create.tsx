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
    Loader2,
    Eye,
    Zap,
    Scale
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
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

interface Props {}

export default function Create({}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        alt: '',
        src: '',
        image_file: null as File | null,
        is_locked: false,
        lock_text: 'Junte-se à Nossa Comunidade',
        lock_subtitle: 'EXCLUSIVO PARA MEMBROS',
        category: 'both' as 'mobile' | 'desktop' | 'both',
        resolution: '',
        file_size: '',
        is_featured: false,
        status: 'draft' as 'draft' | 'published' | 'archived',
        published_at: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/wallpapers');
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Wallpapers', href: '/wallpapers' },
            { title: 'Create', href: '#' },
        ]}>
            <Head title="Create Wallpaper" />

            <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
                <div className="mb-6 flex justify-between items-start">
                    <div>
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2" asChild>
                            <Link href="/wallpapers">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Wallpapers
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight mt-2">Create Wallpaper</h1>
                        <p className="text-muted-foreground text-sm mt-1">Upload and configure a new high-quality wallpaper.</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">Preview</span>
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Wallpaper Content</CardTitle>
                            <CardDescription>Upload the image file and provide a descriptive title.</CardDescription>
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
                                <Label>Upload Image</Label>
                                <div
                                    className="aspect-video w-full rounded-xl border-2 border-dashed border-muted bg-muted/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all overflow-hidden relative group"
                                    onClick={() => document.getElementById('wallpaper-upload')?.click()}
                                >
                                    {data.image_file ? (
                                        <>
                                            <img
                                                src={URL.createObjectURL(data.image_file)}
                                                className="w-full h-full object-cover"
                                                alt="Preview"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white font-bold text-xs uppercase bg-black/50 px-3 py-1 rounded-full">Change Image</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center text-muted-foreground text-center p-6">
                                            <ImageIcon className="h-12 w-12 mb-3 opacity-20" />
                                            <p className="text-sm font-medium">Click to select or drag and drop</p>
                                            <p className="text-xs opacity-60 mt-1">PNG, JPG or WEBP up to 10MB</p>
                                        </div>
                                    )}
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
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Settings2 className="w-4 h-4 text-primary" />
                                    Technical Specs
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="resolution" className="flex items-center gap-2">
                                        <Maximize2 className="w-3 h-3" /> Resolution
                                    </Label>
                                    <Input
                                        id="resolution"
                                        placeholder="3840x2160"
                                        value={data.resolution}
                                        onChange={e => setData('resolution', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="file_size" className="flex items-center gap-2">
                                        <Scale className="w-3 h-3" /> File Size
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
                                    <Label className="flex items-center gap-2">
                                        <Monitor className="w-3 h-3" /> Target Device
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
                                                    <Monitor className="w-3 h-3" /> Desktop
                                                </span>
                                            </SelectItem>
                                            <SelectItem value="mobile">
                                                <span className="flex items-center gap-2">
                                                    <Smartphone className="w-3 h-3" /> Mobile
                                                </span>
                                            </SelectItem>
                                            <SelectItem value="both">
                                                <span className="flex items-center gap-2">
                                                    <Maximize2 className="w-3 h-3" /> Both
                                                </span>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-primary" />
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
                                            <Label htmlFor="is_featured" className="text-sm font-medium">Featured</Label>
                                            <p className="text-[10px] text-muted-foreground">Highlight on home screen</p>
                                        </div>
                                        <Switch
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onCheckedChange={(checked) => setData('is_featured', checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_locked" className="text-sm font-medium">Locked</Label>
                                            <p className="text-[10px] text-muted-foreground">Exclusive to members</p>
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
                        <Card className="border-primary/20 bg-primary/5 animate-in fade-in slide-in-from-top-2 duration-300">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-primary" />
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

                    <div className="flex justify-end gap-4 py-8">
                        <Button variant="outline" asChild>
                            <Link href="/wallpapers">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-[140px]">
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Wallpaper'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
