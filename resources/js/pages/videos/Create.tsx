import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Clock,
    Play,
    CheckCircle2,
    Search,
    Loader2,
    Youtube,
    MapPin
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
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
import { Checkbox } from "@/components/ui/checkbox";

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function Create({ categories }: Props) {
    const [ytPreview, setYtPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        youtube_id: '',
        youtube_url: '',
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
        <AppLayout breadcrumbs={[
            { title: 'Videos', href: '/videos' },
            { title: 'Create', href: '#' },
        ]}>
            <Head title="Create Video" />

            <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
                <div className="mb-6 flex justify-between items-start">
                    <div>
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2" asChild>
                            <Link href="/videos">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Videos
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight mt-2">Create Video</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Source Content</CardTitle>
                            <CardDescription>Manage the video source and preview image.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="youtube_url">YouTube URL</Label>
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="youtube_url"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="pl-10"
                                        value={data.youtube_url}
                                        onChange={e => setData('youtube_url', e.target.value)}
                                    />
                                </div>
                                {errors.youtube_url && <p className="text-sm text-red-500">{errors.youtube_url}</p>}
                                {errors.youtube_id && <p className="text-sm text-red-500">{errors.youtube_id}</p>}
                            </div>

                            {ytPreview ? (
                                <div className="space-y-2">
                                    <Label>Preview</Label>
                                    <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted group max-w-md">
                                        <img
                                            src={`https://img.youtube.com/vi/${ytPreview}/maxresdefault.jpg`}
                                            className="w-full h-full object-cover"
                                            alt="Preview"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Play className="h-10 w-10 text-white fill-white" />
                                        </div>
                                        <div className="absolute top-2 right-2">
                                            <Badge className="bg-green-500 text-white border-none gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Synced
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="aspect-video w-full rounded-lg border border-dashed flex flex-col items-center justify-center bg-muted/50 max-w-md">
                                    <Youtube className="h-10 w-10 text-muted-foreground/50 mb-2" />
                                    <p className="text-xs font-medium text-muted-foreground">Preview will appear here</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Video Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter video title..."
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Tell the story of this video..."
                                    className="min-h-[200px]"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    required
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Settings & Metadata</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(val: any) => setData('status', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                            <SelectItem value="private">Private</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                </div>

                                {/* <div className="flex items-center space-x-2 h-full pt-6">
                                    <Checkbox
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onCheckedChange={(checked) => setData('is_featured', !!checked)}
                                    />
                                    <Label htmlFor="is_featured" className="cursor-pointer">
                                        Featured Video?
                                    </Label>
                                </div> */}
                            </div>
                            {/* 
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="location"
                                            placeholder="e.g. Bali, Indonesia"
                                            className="pl-9"
                                            value={data.location}
                                            onChange={e => setData('location', e.target.value)}
                                        />
                                    </div>
                                    {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="duration"
                                            placeholder="e.g. 14:20"
                                            className="pl-9"
                                            value={data.duration}
                                            onChange={e => setData('duration', e.target.value)}
                                        />
                                    </div>
                                    {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
                                </div>
                            </div> */}
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/videos">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-[140px]">
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Video'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
