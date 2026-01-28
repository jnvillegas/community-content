import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft,
    Save,
    Youtube,
    MapPin,
    Clock,
    Image as ImageIcon,
    Play,
    CheckCircle2,
    Search,
    Settings2,
    Video,
    AlignLeft
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function Create({ categories }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Videos', href: '/videos' },
        { title: 'Upload Expedition', href: '/videos/create' },
    ];

    const [ytPreview, setYtPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        youtube_id: '',
        youtube_url: '', // Local state for the full URL
        description: '',
        location: '',
        duration: '',
        status: 'draft',
        is_featured: false,
        thumbnail_url: '',
        categories: [] as number[],
    });

    // Helper to extract YouTube ID
    const extractYoutubeID = (url: string) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    };

    // Auto-fetch data when URL changes
    useEffect(() => {
        const id = extractYoutubeID(data.youtube_url);
        if (id) {
            setData('youtube_id', id);
            setYtPreview(id);
            if (!data.thumbnail_url) {
                setData('thumbnail_url', `https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
            }
        } else {
            setYtPreview(null);
        }
    }, [data.youtube_url]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/videos');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload New Expedition" />

            <form onSubmit={handleSubmit} className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950/20">
                {/* Fixed Top bar for actions - Matches Articles/Edit */}
                <div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 md:px-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild className="text-gray-500 hover:text-gray-900">
                            <Link href="/videos">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to Videos
                            </Link>
                        </Button>
                        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800" />
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest hidden md:inline">
                            New Expedition
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="ghost" size="sm" className="font-bold text-gray-500" asChild>
                            <Link href="/videos">Cancel</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold h-9 px-6 transition-all"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Save Expedition
                        </Button>
                    </div>
                </div>

                <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 p-4 md:p-8 lg:grid-cols-[1fr_350px]">

                    {/* LEFT COLUMN: Main Content */}
                    <div className="space-y-8">

                        {/* YouTube Section */}
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-6">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600">
                                    <Youtube className="h-4 w-4" />
                                    Source Content
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-3">
                                    <Label htmlFor="youtube_url" className="text-sm font-medium">YouTube URL</Label>
                                    <div className="relative group">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                        <Input
                                            id="youtube_url"
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            className="h-11 pl-10 border-gray-200 bg-gray-50/50 focus-visible:ring-blue-500/20 rounded-lg"
                                            value={data.youtube_url}
                                            onChange={e => setData('youtube_url', e.target.value)}
                                        />
                                    </div>
                                    {errors.youtube_id && <p className="text-xs text-red-500 font-bold mt-1">{errors.youtube_id}</p>}
                                </div>

                                {/* Preview Box */}
                                {ytPreview ? (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                                        <div className="aspect-video w-full rounded-xl overflow-hidden relative shadow-lg ring-1 ring-gray-900/5 group">
                                            <img
                                                src={`https://img.youtube.com/vi/${ytPreview}/maxresdefault.jpg`}
                                                className="w-full h-full object-cover"
                                                alt="Preview"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                                    <Play className="h-6 w-6 text-white fill-white ml-1" />
                                                </div>
                                            </div>
                                            <div className="absolute top-3 right-3">
                                                <Badge className="bg-green-500/90 backdrop-blur-md text-white font-bold border-none px-2 py-0.5 text-xs shadow-sm flex items-center gap-1">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    Synced
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="aspect-video w-full rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center bg-gray-50/50">
                                        <Youtube className="h-10 w-10 text-gray-300 mb-2" />
                                        <p className="text-xs font-medium text-gray-400">Preview will appear here</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Title & Description */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Enter expedition title..."
                                    className="h-auto py-2 border-none bg-transparent px-0 text-3xl font-black tracking-tight placeholder:text-gray-300 focus-visible:ring-0 md:text-4xl"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-sm text-red-500 font-medium">{errors.title}</p>}
                            </div>

                            <Card className="border-none shadow-sm min-h-[300px]">
                                <CardHeader className="p-4 bg-gray-50/50 border-b border-gray-100 pb-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        <AlignLeft className="h-4 w-4" /> Description
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Textarea
                                        placeholder="Tell the story of this adventure..."
                                        className="min-h-[300px] border-none resize-none p-6 text-lg leading-relaxed focus-visible:ring-0"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <div className="space-y-6">

                        {/* Publish Settings */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="p-5 border-b border-gray-50">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900">
                                    <Settings2 className="h-4 w-4 text-blue-600" />
                                    Publish Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-gray-500">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(val: any) => setData('status', val)}
                                    >
                                        <SelectTrigger className="w-full border-gray-200 bg-gray-50/50 font-bold">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                            <SelectItem value="private">Private</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-bold">Featured Video</Label>
                                        <p className="text-[10px] text-gray-400 font-medium">Pin to Hub top</p>
                                    </div>
                                    <Switch
                                        checked={data.is_featured}
                                        onCheckedChange={(val: boolean) => setData('is_featured', val)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Metadata */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="p-5 border-b border-gray-50">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900">
                                    <MapPin className="h-4 w-4 text-emerald-600" />
                                    Expedition Meta
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-gray-500">Location</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="e.g. Bali, Indonesia"
                                            className="pl-9 bg-gray-50/50 border-gray-200"
                                            value={data.location}
                                            onChange={e => setData('location', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-gray-500">Duration</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="e.g. 14:20"
                                            className="pl-9 bg-gray-50/50 border-gray-200"
                                            value={data.duration}
                                            onChange={e => setData('duration', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Cover Image Removed */}

                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
