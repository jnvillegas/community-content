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
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Articles', href: '/articles' },
        { title: 'Edit Article', href: `/articles/${article.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        title: article.title || '',
        content: article.content || '',
        excerpt: article.excerpt || '',
        status: article.status || 'draft',
        categories: article.categories.map(c => c.id),
        tags: article.tags.map(t => t.id),
        meta_title: article.meta_title || '',
        meta_description: article.meta_description || '',
        featured_image: article.featured_image || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/articles/${article.id}`);
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
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600"><Layout className="h-4 w-4" /></Button>
                                    <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-700 mx-1" />
                                    <Button variant="ghost" size="sm" className="h-8 text-gray-500 text-xs font-bold">Block</Button>
                                    <Button variant="ghost" size="sm" className="h-8 text-gray-900 font-bold text-xs bg-white shadow-sm">Text</Button>
                                    <div className="ml-auto flex items-center gap-2 pr-2">
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hidden sm:inline">Last modified: {new Date(article.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Textarea
                                    placeholder="Start writing..."
                                    className="min-h-[500px] border-none resize-none px-6 py-6 text-lg leading-relaxed focus-visible:ring-0"
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                />
                            </CardContent>
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
                                <div className="aspect-video w-full rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center cursor-pointer mb-4">
                                    {data.featured_image ? (
                                        <img src={data.featured_image} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <ImageIcon className="h-8 w-8 text-gray-300" />
                                            <span className="text-[10px] font-bold text-gray-400 mt-2">NO IMAGE</span>
                                        </div>
                                    )}
                                </div>
                                <Input
                                    className="border-gray-100 bg-gray-50/30 text-xs h-8"
                                    placeholder="Change Image URL..."
                                    value={data.featured_image}
                                    onChange={e => setData('featured_image', e.target.value)}
                                />
                            </CardContent>
                        </Card>

                        {/* Categories & Tags (Similar to Create...) */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider">Categories</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <ScrollArea className="h-40">
                                    <div className="space-y-3">
                                        {categories.map(cat => (
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
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
