import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft,
    Save,
    Image as ImageIcon,
    Settings2,
    Lock,
    Monitor,
    Smartphone,
    Maximize2,
    Download
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Wallpaper } from '@/types';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface Props {
    wallpaper: Wallpaper;
}

export default function Edit({ wallpaper }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Wallpapers', href: '/wallpapers' },
        { title: wallpaper.title, href: `/wallpapers/${wallpaper.id}` },
        { title: 'Edit', href: `/wallpapers/${wallpaper.id}/edit` },
    ];

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${wallpaper.title}`} />

            <form onSubmit={handleSubmit} className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950/20">
                {/* Fixed Top bar for actions */}
                <div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 md:px-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild className="text-gray-500">
                            <Link href="/wallpapers">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800" />
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest">
                            Edit Wallpaper
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-none font-bold">
                            <Download className="mr-1 h-3 w-3" />
                            {wallpaper.downloads_count} downloads
                        </Badge>
                        <Button
                            disabled={processing}
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold h-9 px-6"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Update Wallpaper
                        </Button>
                    </div>
                </div>

                <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 p-4 md:p-8 lg:grid-cols-[1fr_350px]">
                    {/* Main Content Area */}
                    <div className="space-y-8">
                        {/* Title Input */}
                        <div className="space-y-4">
                            <Input
                                placeholder="Wallpaper title..."
                                className="border-none bg-transparent px-0 text-3xl font-black tracking-tight placeholder:text-gray-300 focus-visible:ring-0 md:text-4xl dark:text-white"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        {/* Image Preview & URL */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="p-6">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                    <ImageIcon className="h-4 w-4 text-blue-600" />
                                    Wallpaper Image
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                <div
                                    className="aspect-video w-full rounded-xl overflow-hidden border-2 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center dark:border-gray-800 dark:bg-gray-950/50 relative group cursor-pointer hover:border-blue-400 hover:bg-blue-50/10 transition-all"
                                    onClick={() => document.getElementById('wallpaper-upload')?.click()}
                                >
                                    {data.image_file ? (
                                        <img
                                            src={URL.createObjectURL(data.image_file)}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : data.src ? (
                                        <img
                                            src={data.src}
                                            alt={data.alt || data.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <ImageIcon className="h-12 w-12 text-gray-300 mb-2" />
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Click to Upload Image</span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white font-bold text-xs uppercase">Select Image</span>
                                    </div>
                                </div>
                                <input
                                    id="wallpaper-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                            setData('image_file', e.target.files[0]);
                                        }
                                    }}
                                />

                                {/* URL Input Removed - Only File Upload Allowed */}
                                <div className="space-y-2">
                                    <Label htmlFor="alt" className="text-sm font-medium">Alt Text (Description)</Label>
                                    <Input
                                        id="alt"
                                        placeholder="Beautiful mountain sunset wallpaper"
                                        className="border-gray-100 bg-gray-50/30"
                                        value={data.alt}
                                        onChange={e => setData('alt', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Image Details */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="p-6">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                    <Maximize2 className="h-4 w-4 text-blue-600" />
                                    Image Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="resolution" className="text-sm font-medium">Resolution</Label>
                                    <Input
                                        id="resolution"
                                        placeholder="1920x1080"
                                        className="border-gray-100 bg-gray-50/30"
                                        value={data.resolution}
                                        onChange={e => setData('resolution', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="file_size" className="text-sm font-medium">File Size</Label>
                                    <Input
                                        id="file_size"
                                        placeholder="2.5 MB"
                                        className="border-gray-100 bg-gray-50/30"
                                        value={data.file_size}
                                        onChange={e => setData('file_size', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Lock Settings */}
                        {data.is_locked && (
                            <Card className="border-none shadow-sm border-l-4 border-l-orange-500">
                                <CardHeader className="p-6 bg-orange-50/20 dark:bg-orange-950/20">
                                    <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-600">
                                        <Lock className="h-4 w-4" />
                                        Locked Wallpaper Settings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="lock_text" className="text-sm font-medium">Lock Message</Label>
                                        <Input
                                            id="lock_text"
                                            placeholder="Join Our Community"
                                            className="border-gray-100 bg-gray-50/30"
                                            value={data.lock_text}
                                            onChange={e => setData('lock_text', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lock_subtitle" className="text-sm font-medium">Lock Subtitle</Label>
                                        <Input
                                            id="lock_subtitle"
                                            placeholder="EXCLUSIVE FOR MEMBERS"
                                            className="border-gray-100 bg-gray-50/30"
                                            value={data.lock_subtitle}
                                            onChange={e => setData('lock_subtitle', e.target.value)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar Settings Area */}
                    <div className="space-y-6">
                        {/* Status & Visibility Card */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="p-6">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                    <Settings2 className="h-4 w-4 text-blue-600" />
                                    Publish Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm text-gray-500">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(val: any) => setData('status', val)}
                                    >
                                        <SelectTrigger className="w-[140px] border-none bg-gray-50 font-bold dark:bg-gray-800">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator className="bg-gray-50 dark:bg-gray-800" />
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="is_featured" className="text-sm text-gray-500">Featured</Label>
                                    <Switch
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onCheckedChange={(checked) => setData('is_featured', checked)}
                                    />
                                </div>
                                <Separator className="bg-gray-50 dark:bg-gray-800" />
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="is_locked" className="text-sm text-gray-500">Locked (Members Only)</Label>
                                    <Switch
                                        id="is_locked"
                                        checked={data.is_locked}
                                        onCheckedChange={(checked) => setData('is_locked', checked)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Category Card */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="p-6">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                    <Monitor className="h-4 w-4 text-blue-600" />
                                    Device Category
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-3">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="cat-mobile"
                                        name="category"
                                        value="mobile"
                                        checked={data.category === 'mobile'}
                                        onChange={e => setData('category', e.target.value as any)}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="cat-mobile" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                        <Smartphone className="h-4 w-4" />
                                        Mobile
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="cat-desktop"
                                        name="category"
                                        value="desktop"
                                        checked={data.category === 'desktop'}
                                        onChange={e => setData('category', e.target.value as any)}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="cat-desktop" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                        <Monitor className="h-4 w-4" />
                                        Desktop
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id="cat-both"
                                        name="category"
                                        value="both"
                                        checked={data.category === 'both'}
                                        onChange={e => setData('category', e.target.value as any)}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="cat-both" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                        <Maximize2 className="h-4 w-4" />
                                        Both
                                    </label>
                                </div>
                                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                            </CardContent>
                        </Card>

                        {/* Publish Date */}
                        {data.status === 'published' && (
                            <Card className="border-none shadow-sm">
                                <CardHeader className="p-6">
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                        Publish Date
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0">
                                    <Input
                                        type="datetime-local"
                                        className="border-gray-100 bg-gray-50/30"
                                        value={data.published_at}
                                        onChange={e => setData('published_at', e.target.value)}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Metadata */}
                        <Card className="border-none shadow-sm bg-gray-50/50 dark:bg-gray-900/50">
                            <CardHeader className="p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500">
                                    Metadata
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-2 text-xs text-gray-500">
                                <div className="flex justify-between">
                                    <span>Created:</span>
                                    <span className="font-medium">{new Date(wallpaper.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Updated:</span>
                                    <span className="font-medium">{new Date(wallpaper.updated_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Slug:</span>
                                    <span className="font-medium">/{wallpaper.slug}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
