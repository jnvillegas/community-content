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
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        excerpt: '',
        status: 'draft',
        categories: [] as number[],
        tags: [] as number[],
        meta_title: '',
        meta_description: '',
        featured_image: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/articles');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Article" />

            <form onSubmit={handleSubmit} className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950/20">
                {/* Fixed Top bar for actions - WordPress Style */}
                <div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 md:px-8">
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
                            className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold h-9 px-6"
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

                        {/* Editor Canvas (Using Textarea as placeholder for rich text) */}
                        <Card className="border-none shadow-sm overflow-hidden min-h-[500px] focus-within:ring-2 ring-blue-500/10 transition-shadow">
                            <CardHeader className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 p-3">
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600"><Layout className="h-4 w-4" /></Button>
                                    <div className="w-[1px] h-4 bg-gray-200 dark:bg-gray-700 mx-1" />
                                    <Button variant="ghost" size="sm" className="h-8 text-gray-500 text-xs font-bold">Block</Button>
                                    <Button variant="ghost" size="sm" className="h-8 text-gray-900 font-bold text-xs bg-white shadow-sm">Text</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Textarea
                                    placeholder="Start writing your story..."
                                    className="min-h-[500px] border-none resize-none px-6 py-6 text-lg leading-relaxed focus-visible:ring-0"
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                />
                                {errors.content && <p className="text-sm text-red-500 p-6">{errors.content}</p>}
                            </CardContent>
                        </Card>

                        {/* Excerpt Section */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-400">Excerpt / Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <Textarea
                                    placeholder="Write a short summary of this article..."
                                    className="border-gray-100 bg-gray-50/30 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                                    value={data.excerpt}
                                    onChange={e => setData('excerpt', e.target.value)}
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
                                <div className="aspect-video w-full rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all dark:border-gray-800 dark:bg-gray-950/50">
                                    <ImageIcon className="h-8 w-8 text-gray-300 mb-2" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Choose Image</span>
                                </div>
                                <Input
                                    className="mt-4 border-gray-100 bg-gray-50/30 text-xs h-8"
                                    placeholder="Image URL..."
                                    value={data.featured_image}
                                    onChange={e => setData('featured_image', e.target.value)}
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
                                        {categories.length === 0 ? (
                                            <p className="text-xs text-gray-400 italic">No categories available.</p>
                                        ) : (
                                            categories.map(cat => (
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
                                <Button variant="link" size="sm" className="mt-4 h-auto p-0 text-blue-600 font-bold text-xs uppercase tracking-widest">
                                    + Add New Category
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Tags Card */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="p-6">
                                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                    <Tag className="h-4 w-4 text-blue-600" />
                                    Tags
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <Input placeholder="Type a tag and press enter..." className="border-gray-100 bg-gray-50/30 text-xs" />
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-none font-bold text-[10px]">DESIGN ×</Badge>
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-none font-bold text-[10px]">TUTORIAL ×</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
