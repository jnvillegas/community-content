import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save, Image as ImageIcon } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Academy', href: '/admin/academy' },
    { title: 'Courses', href: '/admin/academy/courses' },
    { title: 'New Course', href: '/admin/academy/courses/create' },
];

export default function CreateCourse() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        cover_image: '',
        status: 'draft',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/academy/courses');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Course" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="/admin/academy/courses">
                                    <ChevronLeft className="h-4 w-4" />
                                </Link>
                            </Button>
                            <h1 className="text-2xl font-bold font-heading">Start New Course</h1>
                        </div>
                        <Button type="submit" disabled={processing} className="px-6 shadow-md hover:shadow-lg transition-all">
                            <Save className="h-4 w-4 mr-2" />
                            Create Course
                        </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Main Info */}
                        <div className="md:col-span-2 space-y-6">
                            <Card className="border-border/50 shadow-sm overflow-hidden">
                                <CardHeader className="bg-muted/30 border-b border-border/50">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-xs font-bold uppercase text-muted-foreground/70">Course Title</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter an engaging title for your course..."
                                            className="h-12 border-border/50 focus:border-primary/50 transition-all font-semibold text-lg"
                                        />
                                        {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-xs font-bold uppercase text-muted-foreground/70">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="What will students learn in this course?"
                                            className="min-h-[200px] border-border/50 focus:border-primary/50 transition-all resize-none text-base leading-relaxed"
                                        />
                                        {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Settings & Sidebar */}
                        <div className="space-y-6">
                            <Card className="border-border/50 shadow-sm overflow-hidden">
                                <CardHeader className="bg-muted/30 border-b border-border/50">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Publication</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase text-muted-foreground/70">Status</Label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) => setData('status', value as any)}
                                        >
                                            <SelectTrigger className="h-10 border-border/50">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Published</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && <p className="text-xs text-red-500 font-medium">{errors.status}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 shadow-sm overflow-hidden">
                                <CardHeader className="bg-muted/30 border-b border-border/50">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Appearance</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cover_image" className="text-xs font-bold uppercase text-muted-foreground/70">Cover Image URL</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="cover_image"
                                                value={data.cover_image}
                                                onChange={(e) => setData('cover_image', e.target.value)}
                                                placeholder="https://images.unsplash.com/..."
                                                className="h-10 border-border/50"
                                            />
                                            <Button variant="secondary" size="icon" className="shrink-0 h-10 w-10 border border-border/50">
                                                <ImageIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground">Recommended: 1280x720px (16:9 ratio).</p>
                                        {errors.cover_image && <p className="text-xs text-red-500 font-medium">{errors.cover_image}</p>}
                                    </div>

                                    {data.cover_image && (
                                        <div className="mt-4 rounded-lg overflow-hidden border border-border/50 shadow-inner group relative">
                                            <img
                                                src={data.cover_image}
                                                alt="Cover preview"
                                                className="w-full aspect-video object-cover transition-transform group-hover:scale-105 duration-500"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-col gap-2">
                                                <ImageIcon className="text-white h-6 w-6" />
                                                <span className="text-white text-xs font-bold uppercase tracking-widest">Preview</span>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
