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
    Loader2,
    X,
    Plus
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
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';

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

export default function Create({ categories, tags }: Props) {
    const [localCategories, setLocalCategories] = useState(categories);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
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
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.featured_image) {
            setError('featured_image', 'La imagen destacada es obligatoria para publicar un artículo.');
            return;
        }

        post('/articles', {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Articles', href: '/articles' },
            { title: 'Create', href: '#' },
        ]}>
            <Head title="Create Article" />

            <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
                <div className="mb-6 flex justify-between items-start">
                    <div>
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2" asChild>
                            <Link href="/articles">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Articles
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight mt-2">Create Article</h1>
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
                                    required
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Body</Label>
                                <div className="rounded-md border bg-card">
                                    <TipTapEditor
                                        content={data.content}
                                        onChange={(html) => setData('content', html)}
                                        placeholder="Start writing your story..."
                                    />
                                </div>
                                {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
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
                                className={cn(
                                    "aspect-video w-full max-w-xl mx-auto rounded-xl border-2 border-dashed border-muted bg-muted/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all overflow-hidden relative group",
                                    errors.featured_image && "border-red-500 bg-red-50 dark:bg-red-950/20"
                                )}
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
                                            <span className="text-white font-bold text-xs uppercase bg-black/50 px-3 py-1 rounded-full">Change Image</span>
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
                                        clearErrors('featured_image');
                                    }
                                }}
                            />
                            {errors.featured_image && (
                                <p className="text-sm text-red-500 mt-3 text-center font-medium animate-in fade-in slide-in-from-top-1 duration-300">
                                    {errors.featured_image}
                                </p>
                            )}
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

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                                <BarChart3 className="h-4 w-4" />
                                SEO Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 rounded-lg bg-muted/50 border">
                                <div className="text-lg font-medium truncate mb-0.5">{data.meta_title || (data.title || 'Page Title')}</div>
                                <div className="text-xs mb-1.5 opacity-80">yourdomain.com › blog › {data.title ? data.title.toLowerCase().replace(/ /g, '-') : 'slug'}</div>
                                <div className="text-muted-foreground text-sm line-clamp-2">{data.meta_description || 'Write a meta description...'}</div>
                            </div>

                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        placeholder="SEO Specific Title"
                                        value={data.meta_title}
                                        onChange={e => setData('meta_title', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Textarea
                                        id="meta_description"
                                        placeholder="Write a meta description for search engines..."
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
                                    Creating...
                                </>
                            ) : (
                                'Create Article'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
