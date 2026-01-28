import React, { useState } from 'react';
import axios from 'axios';
import TipTapEditor from '@/components/TipTapEditor';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft,
    Save,
    Eye,
    Image as ImageIcon,
    Settings2,
    Globe,
    Tag,
    Layout,
    BarChart3,
    Clock,
    User
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    status: 'draft' | 'published' | 'scheduled' | 'private';
    featured_image: string;
    meta_title: string;
    meta_description: string;
    categories: Array<{ id: number; name: string }>;
    tags: Array<{ id: number; name: string }>;
    author: { name: string };
    created_at: string;
}

interface Category {
    id: number;
    name: string;
}

interface TagType {
    id: number;
    name: string;
}

interface Props {
    article: Article;
    categories: Category[];
    tags: TagType[];
}

export default function Edit({ article, categories, tags }: Props) {
    const [localCategories, setLocalCategories] = useState(categories);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Articles', href: '/articles' },
        { title: 'Edit Article', href: `/articles/${article.id}/edit` },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: article.title || '',
        content: article.content || '',
        excerpt: article.excerpt || '',
        status: article.status || 'draft',
        categories: article.categories.map(c => c.id),
        tags: article.tags.map(t => t.id),
        meta_title: article.meta_title || '',
        meta_description: article.meta_description || '',
        featured_image: null as File | null,
    });

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;

        try {
            const response = await axios.post('/categories', { name: newCategoryName });
            if (response.data && response.data.category) {
                const newCat = response.data.category;
                setLocalCategories([...localCategories, newCat]);
                setData('categories', [...data.categories, newCat.id]);
                setNewCategoryName('');
                setIsCreatingCategory(false);
            }
        } catch (error) {
            console.error('Failed to create category:', error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // We use POST with _method: 'put' to allow file uploads
        post(`/articles/${article.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${article.title}`} />

            <form onSubmit={handleSubmit} className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950/20">
                {/* Fixed Top bar for actions */}
                <div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 md:px-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild className="text-gray-500">
                            <Link href="/articles">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800" />
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest hidden md:inline">
                            Editing Article
                        </span>
                        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest opacity-60">ID #{article.id}</Badge>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="font-bold text-gray-500">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                        </Button>
                        <Button
                            disabled={processing}
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold h-9 px-6"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Update Article
                        </Button>
                    </div>
                </div>

                <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 p-4 md:p-8 lg:grid-cols-[1fr_350px]">
                    {/* Main Content Area */}
                    <div className="space-y-8">
                        {/* Title Input */}
                        <div className="space-y-4">
                            <Input
                                placeholder="Add a title..."
                                className="border-none bg-transparent px-0 text-3xl font-black tracking-tight placeholder:text-gray-300 focus-visible:ring-0 md:text-4xl dark:text-white"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        {/* Editor Canvas */}
                        <Card className="border-none shadow-sm overflow-hidden min-h-[500px]">
                            <CardHeader className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 p-3">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Rich Text Editor</span>
                                </div>
                            </CardHeader>
                            <TipTapEditor
                                content={data.content}
                                onChange={(html) => setData('content', html)}
                                placeholder="Start editing..."
                            />
                            {errors.content && <p className="text-sm text-red-500 p-6">{errors.content}</p>}
                        </Card>

                        {/* SEO Section */}
                        <Card className="border-none shadow-sm overflow-hidden border-t-4 border-t-blue-500">
                            <CardHeader className="p-6 bg-blue-50/20">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600">
                                    <BarChart3 className="h-4 w-4" />
                                    SEO Configuration
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-gray-500">Google Result View</Label>
                                    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:bg-gray-950 dark:border-gray-800">
                                        <div className="text-blue-700 text-xl font-medium mb-1 truncate">{data.meta_title || data.title}</div>
                                        <div className="text-green-700 text-sm mb-1">yourdomain.com › blog › {article.slug}</div>
                                        <div className="text-gray-500 text-sm line-clamp-2">{data.meta_description || 'Write a meta description...'}</div>
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="meta_title" className="text-sm font-medium">Meta Title</Label>
                                        <Input
                                            id="meta_title"
                                            className="border-gray-100 bg-gray-50/30"
                                            value={data.meta_title}
                                            onChange={e => setData('meta_title', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="meta_description" className="text-sm font-medium">Meta Description</Label>
                                        <Textarea
                                            id="meta_description"
                                            className="border-gray-100 bg-gray-50/30"
                                            value={data.meta_description}
                                            onChange={e => setData('meta_description', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Settings Area */}
                    <div className="space-y-6">
                        {/* Publish Settings */}
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
                                            <SelectItem value="draft">Borrador</SelectItem>
                                            <SelectItem value="published">Publicado</SelectItem>
                                            <SelectItem value="private">Privado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator className="bg-gray-50 dark:bg-gray-800" />
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-widest">
                                        <User className="h-3 w-3" /> Author: <span className="text-gray-900 dark:text-white">{article.author?.name || 'Unknown'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-widest">
                                        <Clock className="h-3 w-3" /> Created: <span className="text-gray-900 dark:text-white">
                                            {article.created_at ? new Date(article.created_at).toLocaleDateString() : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Featured Image Card */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="p-6">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                    <ImageIcon className="h-4 w-4 text-blue-600" />
                                    Featured Image
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <div
                                    className="aspect-video w-full rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all dark:border-gray-800 dark:bg-gray-950/50 overflow-hidden relative group"
                                    onClick={() => document.getElementById('image-upload')?.click()}
                                >
                                    {data.featured_image ? (
                                        // New image selected for upload
                                        <>
                                            <img
                                                src={URL.createObjectURL(data.featured_image as File)}
                                                className="w-full h-full object-cover"
                                                alt="New Preview"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white font-bold text-xs uppercase">Change Selection</span>
                                            </div>
                                        </>
                                    ) : article.featured_image ? (
                                        // Existing image from server
                                        <>
                                            <img
                                                // Assuming backend returns relative path 'articles/xxx.jpg', we prepend /storage/
                                                src={article.featured_image.startsWith('http') ? article.featured_image : `/storage/${article.featured_image}`}
                                                className="w-full h-full object-cover"
                                                alt="Current Featured"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white font-bold text-xs uppercase">Replace Image</span>
                                            </div>
                                        </>
                                    ) : (
                                        // No image at all
                                        <div className="flex flex-col items-center">
                                            <ImageIcon className="h-8 w-8 text-gray-300 mb-2" />
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Upload Image</span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="image-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={e => {
                                        if (e.target.files && e.target.files[0]) {
                                            setData('featured_image', e.target.files[0]);
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>

                        {/* Excerpt Section Removed */}
                        {/* Categories & Tags (Similar to Create...) */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider">Categories</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <ScrollArea className="h-40">
                                    <div className="space-y-3">
                                        {localCategories.map(cat => (
                                            <div key={cat.id} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`cat-${cat.id}`}
                                                    className="rounded border-gray-200 text-blue-600"
                                                    checked={data.categories.includes(cat.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) setData('categories', [...data.categories, cat.id]);
                                                        else setData('categories', data.categories.filter(id => id !== cat.id));
                                                    }}
                                                />
                                                <label htmlFor={`cat-${cat.id}`} className="text-sm dark:text-gray-300">{cat.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                {isCreatingCategory ? (
                                    <div className="mt-4 flex items-center gap-2">
                                        <Input
                                            autoFocus
                                            className="h-8 text-xs"
                                            placeholder="Category name..."
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleCreateCategory();
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            size="sm"
                                            className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
                                            onClick={handleCreateCategory}
                                            disabled={!newCategoryName.trim()}
                                        >
                                            <Save className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                            onClick={() => {
                                                setIsCreatingCategory(false);
                                                setNewCategoryName('');
                                            }}
                                        >
                                            <span className="text-xs font-bold">✕</span>
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="link"
                                        size="sm"
                                        className="mt-4 h-auto p-0 text-blue-600 font-bold text-xs uppercase tracking-widest"
                                        onClick={() => setIsCreatingCategory(true)}
                                    >
                                        + Add New Category
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
