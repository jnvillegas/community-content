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
    BarChart3
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

interface Category {
    id: number;
    name: string;
}

interface TagType {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
    tags: TagType[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Articles', href: '/articles' },
    { title: 'Create New', href: '/articles/create' },
];

export default function Create({ categories, tags }: Props) {
    const [localCategories, setLocalCategories] = useState(categories);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        excerpt: '',
        status: 'draft',
        categories: [] as number[],
        tags: [] as number[],
        meta_title: '',
        meta_description: '',
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
            // Optional: Show toast error (if toast is available)
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/articles');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Article" />

            <form onSubmit={handleSubmit} className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950/20">
                {/* Fixed Top bar for actions - WordPress Style */}
                <div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-muted bg-background/80 px-4 backdrop-blur-md dark:bg-card/80 md:px-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild className="text-gray-500">
                            <Link href="/articles">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800" />
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest">
                            New Article
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="font-bold text-gray-500 hidden md:flex">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                        </Button>
                        <Button
                            disabled={processing}
                            type="submit"
                            className="font-bold h-9 px-6"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {data.status === 'published' ? 'Publish Now' : 'Save Draft'}
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

                        {/* Rich Text Editor */}
                        <Card className="border-none shadow-sm overflow-hidden min-h-[500px] focus-within:ring-2 ring-blue-500/10 transition-shadow">
                            <TipTapEditor
                                content={data.content}
                                onChange={(html) => setData('content', html)}
                                placeholder="Start writing your story..."
                            />
                            {errors.content && <p className="text-sm text-red-500 p-6">{errors.content}</p>}
                        </Card>

                        {/* Excerpt Section Removed */}

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
                                        <div className="text-blue-700 text-xl font-medium mb-1 truncate">{data.meta_title || (data.title || 'Page Title')}</div>
                                        <div className="text-green-700 text-sm mb-1">yourdomain.com › blog › {data.title ? data.title.toLowerCase().replace(/ /g, '-') : 'slug'}</div>
                                        <div className="text-gray-500 text-sm line-clamp-2">{data.meta_description || 'Write a description to see how it looks in search results...'}</div>
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="meta_title" className="text-sm font-medium">Meta Title</Label>
                                        <Input
                                            id="meta_title"
                                            placeholder="SEO Specific Title"
                                            className="border-gray-100 bg-gray-50/30"
                                            value={data.meta_title}
                                            onChange={e => setData('meta_title', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="meta_description" className="text-sm font-medium">Meta Description</Label>
                                        <Textarea
                                            id="meta_description"
                                            placeholder="Write a meta description for search engines..."
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
                                            <SelectItem value="draft">Borrador</SelectItem>
                                            <SelectItem value="published">Publicado</SelectItem>
                                            <SelectItem value="private">Privado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator className="bg-gray-50 dark:bg-gray-800" />
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm text-gray-500">Visibility</Label>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold">
                                        <Globe className="mr-1 h-3 w-3" /> Public
                                    </Badge>
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
                                        <>
                                            <img
                                                src={URL.createObjectURL(data.featured_image as File)}
                                                className="w-full h-full object-cover"
                                                alt="Preview"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white font-bold text-xs uppercase">Change Image</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <ImageIcon className="h-8 w-8 text-gray-300 mb-2" />
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Choose Image</span>
                                        </>
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

                        {/* Categories Card */}
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="p-6">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                    <Layout className="h-4 w-4 text-blue-600" />
                                    Categories
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <ScrollArea className="h-40 pr-4">
                                    <div className="space-y-3">
                                        {localCategories.length === 0 ? (
                                            <p className="text-xs text-gray-400 italic">No categories available.</p>
                                        ) : (
                                            localCategories.map(cat => (
                                                <div key={cat.id} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`cat-${cat.id}`}
                                                        className="rounded border-gray-200 text-blue-600 focus:ring-blue-500"
                                                        checked={data.categories.includes(cat.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setData('categories', [...data.categories, cat.id]);
                                                            } else {
                                                                setData('categories', data.categories.filter(id => id !== cat.id));
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor={`cat-${cat.id}`} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">{cat.name}</label>
                                                </div>
                                            ))
                                        )}
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

                        {/* Tags Section Removed */}
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
