import React, { useState } from 'react';
import axios from 'axios';
import TipTapEditor from '@/components/TipTapEditor';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Save,
    Eye,
    Image as ImageIcon,
    Settings2,
    BarChart3,
    Clock,
    User,
    CalendarDays,
    Loader2,
    X,
    Plus
} from 'lucide-react';
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
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
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from "@/components/ui/checkbox";

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

    const { data, setData, post, processing, errors } = useForm({
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
        post(`/articles/${article.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Articles', href: '/articles' },
            { title: 'Edit', href: '#' },
        ]}>
            <Head title={`Edit: ${article.title}`} />

            <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
                <div className="mb-6 flex justify-between items-start">
                    <div>
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2" asChild>
                            <Link href="/articles">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Articles
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight mt-2">Edit Article</h1>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm">
                            <CalendarDays className="w-4 h-4" />
                            <span>
                                {article.created_at && isValid(new Date(article.created_at))
                                    ? format(new Date(article.created_at), "d 'de' MMMM, yyyy", { locale: es })
                                    : 'N/A'}
                            </span>
                            <span className="opacity-30">•</span>
                            <span>ID #{article.id}</span>
                        </div>
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
                            <CardTitle>Content</CardTitle>
                            <CardDescription>Write and manage your article content.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Add a title..."
                                    className="text-xl font-bold"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            {/* Editor Canvas */}
                            <Card className="border-none shadow-sm overflow-hidden min-h-[500px]">
                                <CardHeader className="bg-background/50 dark:bg-card/50 border-b border-muted p-3">
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Rich Text Editor</span>
                                    </div>
                                </CardHeader>
                                <TipTapEditor
                                    content={data.content}
                                    onChange={(html: string) => setData('content', html)}
                                    placeholder="Start editing..."
                                />
                                {errors.content && <p className="text-sm text-red-500 p-6">{errors.content}</p>}
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

                            <Card>
                                <CardHeader>
                                    <CardTitle>Featured Image</CardTitle>
                                    <CardDescription>Visual representation for your article.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div
                                        className="aspect-video w-full max-w-xl mx-auto rounded-xl border-2 border-dashed border-muted bg-muted/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all overflow-hidden relative group"
                                        onClick={() => document.getElementById('image-upload')?.click()}
                                    >
                                        {data.featured_image ? (
                                            <>
                                                <img
                                                    src={URL.createObjectURL(data.featured_image as File)}
                                                    className="w-full h-full object-cover"
                                                    alt="New Preview"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white font-bold text-xs uppercase bg-black/50 px-3 py-1 rounded-full">Change Image</span>
                                                </div>
                                            </>
                                        ) : article.featured_image ? (
                                            <>
                                                <img
                                                    src={article.featured_image.startsWith('http') ? article.featured_image : `/storage/${article.featured_image}`}
                                                    className="w-full h-full object-cover"
                                                    alt="Current Featured"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white font-bold text-xs uppercase bg-black/50 px-3 py-1 rounded-full">Replace Image</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center text-muted-foreground">
                                                <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Click to Upload</span>
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                                            <Settings2 className="w-4 h-4 text-primary" />
                                            Publishing
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="status" className="text-xs font-bold text-muted-foreground">Status</Label>
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
                                                    <SelectItem value="private">Privado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Separator />
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <User className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Author:</span>
                                                <span className="font-bold">{article.author?.name || 'Unknown'}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Created:</span>
                                                <span className="font-bold">
                                                    {article.created_at ? format(new Date(article.created_at), "dd/MM/yyyy") : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider">Categories</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-44 pr-4">
                                            <div className="grid grid-cols-1 gap-3">
                                                {localCategories.map(cat => (
                                                    <div key={cat.id} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`cat-${cat.id}`}
                                                            checked={data.categories.includes(cat.id)}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) setData('categories', [...data.categories, cat.id]);
                                                                else setData('categories', data.categories.filter(id => id !== cat.id));
                                                            }}
                                                        />
                                                        <Label htmlFor={`cat-${cat.id}`} className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                            {cat.name}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>

                                        <div className="mt-4 pt-4 border-t">
                                            {isCreatingCategory ? (
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        autoFocus
                                                        className="h-9"
                                                        placeholder="New category..."
                                                        value={newCategoryName}
                                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                                    />
                                                    <Button size="icon" className="h-9 w-9 shrink-0" onClick={handleCreateCategory}>
                                                        <Save className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => setIsCreatingCategory(false)}>
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full border-dashed"
                                                    onClick={() => setIsCreatingCategory(true)}
                                                >
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    New Category
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                                        <BarChart3 className="h-4 w-4" />
                                        SEO Configuration
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="p-4 rounded-lg bg-muted/50 border">
                                        <div className="text-lg font-medium truncate mb-0.5">{data.meta_title || data.title}</div>
                                        <div className="text-xs mb-1.5 opacity-80">yourdomain.com › blog › {article.slug}</div>
                                        <div className="text-muted-foreground text-sm line-clamp-2">{data.meta_description || 'Write a meta description...'}</div>
                                    </div>

                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="meta_title">Meta Title</Label>
                                            <Input
                                                id="meta_title"
                                                value={data.meta_title}
                                                onChange={e => setData('meta_title', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="meta_description">Meta Description</Label>
                                            <Textarea
                                                id="meta_description"
                                                value={data.meta_description}
                                                onChange={e => setData('meta_description', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-4 py-8">
                                <Button variant="outline" asChild>
                                    <Link href="/articles">Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing} className="min-w-[140px]">
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        'Update Article'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </AppLayout>
                );
}
