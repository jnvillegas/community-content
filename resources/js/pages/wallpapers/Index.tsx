import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Download, Image as ImageIcon, Lock, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Wallpaper as BaseWallpaper } from '@/types';
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

interface Wallpaper extends BaseWallpaper {
    likes_count: number;
    comments_count: number;
}

interface Stats {
    total_wallpapers: number;
    total_likes: number;
    total_comments: number;
    total_downloads: number;
}

interface Comment {
    id: number;
    content: string;
    user: {
        name: string;
        avatar: string;
    };
    wallpaper_title: string;
    created_at: string;
}

interface Props {
    wallpapers: {
        data: Wallpaper[];
        links: any[];
    };
    stats: Stats;
    recentComments: Comment[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wallpapers',
        href: '/wallpapers',
    },
];

export default function Index({ wallpapers, stats, recentComments }: Props) {
    const getStatusBadge = (status: Wallpaper['status']) => {
        switch (status) {
            case 'published':
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Published</Badge>;
            case 'draft':
                return <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-none">Draft</Badge>;
            case 'archived':
                return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">Archived</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getCategoryBadge = (category: Wallpaper['category']) => {
        const colors = {
            mobile: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
            desktop: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
            both: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        };
        return <Badge className={`${colors[category]} hover:${colors[category]} border-none capitalize`}>{category}</Badge>;
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar este wallpaper?')) {
            router.delete(`/wallpapers/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Wallpapers Dashboard" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Wallpapers Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your wallpaper collection and track community engagement.</p>
                    </div>
                    <Button asChild className="bg-[#1a87cb] hover:bg-[#1a87cb]/90 font-bold">
                        <Link href="/wallpapers/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Wallpaper
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Wallpapers</CardTitle>
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_wallpapers}</div>
                            <p className="text-xs text-muted-foreground">Gallery size</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_likes}</div>
                            <p className="text-xs text-muted-foreground">Total appreciations</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_comments}</div>
                            <p className="text-xs text-muted-foreground">User feedback</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_downloads}</div>
                            <p className="text-xs text-muted-foreground">Community usage</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-7">
                    <div className="md:col-span-5 space-y-6">
                        <Card className="border-card shadow-sm bg-background dark:bg-card">
                            <CardHeader className="p-4 md:p-6 border-b border-muted">
                                <div className="flex flex-col md:flex-row gap-4 justify-between">
                                    <div className="relative max-w-sm w-full">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input placeholder="Search wallpapers..." className="pl-10 border-muted bg-background/50 dark:bg-card/30" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader className="bg-background/50 dark:bg-card/50">
                                        <TableRow className="hover:bg-transparent border-muted">
                                            <TableHead className="font-bold text-gray-900 dark:text-gray-100 px-6 py-4 w-[80px]">Preview</TableHead>
                                            <TableHead className="font-bold text-gray-900 dark:text-gray-100">Title</TableHead>
                                            <TableHead className="font-bold text-gray-900 dark:text-gray-100">Engagement</TableHead>
                                            <TableHead className="font-bold text-gray-900 dark:text-gray-100">Status</TableHead>
                                            <TableHead className="font-bold text-gray-900 dark:text-gray-100">Date</TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {wallpapers.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="h-64 text-center">
                                                    <div className="flex flex-col items-center justify-center space-y-2">
                                                        <ImageIcon className="h-10 w-10 text-gray-200" />
                                                        <p className="text-gray-500 font-medium">No wallpapers found</p>
                                                        <Button variant="link" asChild className="text-foreground hover:text-foreground">
                                                            <Link href="/wallpapers/create">Add your first wallpaper</Link>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            wallpapers.data.map((wallpaper) => (
                                                <TableRow key={wallpaper.id} className="group hover:bg-background/50 dark:hover:bg-card/50 border-muted transition-colors">
                                                    <TableCell className="px-6 py-4">
                                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-background dark:bg-card/50">
                                                            <img
                                                                src={wallpaper.src}
                                                                alt={wallpaper.alt || wallpaper.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                            {wallpaper.is_locked && (
                                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                                    <Lock className="h-4 w-4 text-white" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-foreground transition-colors">
                                                                {wallpaper.title}
                                                            </span>
                                                            <span className="text-xs text-gray-500 mt-0.5">{getCategoryBadge(wallpaper.category)} • {wallpaper.resolution || 'N/A'}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col gap-1.5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                    <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                                                                    {wallpaper.likes_count}
                                                                </div>
                                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                    <MessageCircle className="h-3.5 w-3.5 text-blue-500" />
                                                                    {wallpaper.comments_count}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                <Download className="h-3.5 w-3.5 text-gray-400" />
                                                                {wallpaper.downloads_count} downloads
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{getStatusBadge(wallpaper.status)}</TableCell>
                                                    <TableCell>
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(wallpaper.created_at).toLocaleDateString()}
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
                                                                    <Link href={`/wallpapers/${wallpaper.id}/edit`} className="flex items-center">
                                                                        <Edit className="mr-2 h-3.5 w-3.5" />
                                                                        Edit
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/wallpapers/${wallpaper.id}`} className="flex items-center">
                                                                        <Eye className="mr-2 h-3.5 w-3.5" />
                                                                        View
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    className="text-red-600 focus:text-red-600 flex items-center"
                                                                    onClick={() => handleDelete(wallpaper.id)}
                                                                >
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

                    <div className="md:col-span-2">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Latest comments on wallpapers.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {recentComments.map((comment) => (
                                        <div key={comment.id} className="flex items-start gap-3">
                                            <div className="size-8 rounded-full overflow-hidden border shrink-0">
                                                <img
                                                    src={comment.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}&background=random`}
                                                    alt={comment.user.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="text-sm font-medium leading-none truncate">
                                                        {comment.user.name}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-2 italic mb-1">
                                                    "{comment.content}"
                                                </p>
                                                <p className="text-[10px] text-muted-foreground font-semibold">
                                                    En: {comment.wallpaper_title}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">
                                                    {comment.created_at}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {recentComments.length === 0 && (
                                        <div className="text-center text-sm text-muted-foreground py-8">
                                            No recent activity.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

