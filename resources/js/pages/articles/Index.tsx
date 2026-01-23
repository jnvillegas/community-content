import { Head, Link } from '@inertiajs/react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, FileText } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Article {
    id: number;
    title: string;
    slug: string;
    status: 'draft' | 'published' | 'scheduled' | 'private';
    author: {
        name: string;
    };
    categories: Array<{ id: number; name: string }>;
    created_at: string;
}

interface Props {
    articles: {
        data: Article[];
        links: any[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Articles',
        href: '/articles',
    },
];

export default function Index({ articles }: Props) {
    const getStatusBadge = (status: Article['status']) => {
        switch (status) {
            case 'published':
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Published</Badge>;
            case 'draft':
                return <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-none">Draft</Badge>;
            case 'scheduled':
                return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Scheduled</Badge>;
            case 'private':
                return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none">Private</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Articles" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Articles</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your blog posts and informative content.</p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold">
                        <Link href="/articles/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Article
                        </Link>
                    </Button>
                </div>

                <Card className="border-none shadow-sm bg-white dark:bg-gray-900">
                    <CardHeader className="p-4 md:p-6 border-b border-gray-50 dark:border-gray-800">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <div className="relative max-w-sm w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input placeholder="Search articles..." className="pl-10 border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/50" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="hidden md:flex border-gray-100 dark:border-gray-800">
                                    <Filter className="mr-2 h-3.5 w-3.5" />
                                    Filter
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-gray-50/50 dark:bg-gray-950/50">
                                <TableRow className="hover:bg-transparent border-gray-100 dark:border-gray-800">
                                    <TableHead className="font-bold text-gray-900 dark:text-gray-100 px-6 py-4">Title</TableHead>
                                    <TableHead className="font-bold text-gray-900 dark:text-gray-100">Status</TableHead>
                                    <TableHead className="font-bold text-gray-900 dark:text-gray-100">Author</TableHead>
                                    <TableHead className="font-bold text-gray-900 dark:text-gray-100">Categories</TableHead>
                                    <TableHead className="font-bold text-gray-900 dark:text-gray-100">Date</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {articles.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <FileText className="h-10 w-10 text-gray-200" />
                                                <p className="text-gray-500 font-medium">No articles found</p>
                                                <Button variant="link" asChild className="text-blue-600">
                                                    <Link href="/articles/create">Create your first article</Link>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    articles.data.map((article) => (
                                        <TableRow key={article.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-950/50 border-gray-100 dark:border-gray-800 transition-colors">
                                            <TableCell className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                                                        {article.title}
                                                    </span>
                                                    <span className="text-xs text-gray-500 mt-0.5">/{article.slug}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(article.status)}</TableCell>
                                            <TableCell>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {article.author.name}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {article.categories.map((cat) => (
                                                        <Badge key={cat.id} variant="outline" className="text-[10px] py-0 px-2 font-medium border-gray-200 dark:border-gray-700">
                                                            {cat.name}
                                                        </Badge>
                                                    ))}
                                                    {article.categories.length === 0 && (
                                                        <span className="text-xs text-gray-400">Uncategorized</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(article.created_at).toLocaleDateString()}
                                                </span>
                                            </TableCell>
                                            <TableCell className="px-6">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/articles/${article.id}/edit`} className="flex items-center">
                                                                <Edit className="mr-2 h-3.5 w-3.5" />
                                                                Edit Article
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/articles/${article.id}`} className="flex items-center">
                                                                <Eye className="mr-2 h-3.5 w-3.5" />
                                                                View Page
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600 focus:text-red-600 flex items-center">
                                                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
