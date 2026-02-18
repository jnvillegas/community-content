import { Head, Link, router } from '@inertiajs/react';
import { Eye, Heart, MessageCircle, MoreHorizontal, Trash2, TrendingUp, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { BreadcrumbItem } from '@/types';

interface Stats {
    total_stories: number;
    total_likes: number;
    total_comments: number;
    total_views: number;
}

interface Comment {
    id: number;
    content: string;
    user: {
        name: string;
        avatar: string;
    };
    story_title: string;
    created_at: string;
}

interface StoryPerformance {
    id: number;
    title: string;
    views: number;
    likes: number;
    comments: number;
    engagement_rate: number;
}

interface Props {
    stats: Stats;
    recentComments: Comment[];
    storiesPerformance: StoryPerformance[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stories',
        href: '/admin/stories',
    },
    {
        title: 'Dashboard',
        href: '/admin/stories',
    },
];

export default function StoriesDashboard({ stats, recentComments, storiesPerformance }: Props) {
    const handleDeleteComment = (id: number) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            router.delete(route('admin.stories.comments.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stories Dashboard" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_stories}</div>
                            <p className="text-xs text-muted-foreground">All time uploads</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_views}</div>
                            <p className="text-xs text-muted-foreground">Global engagement</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_likes}</div>
                            <p className="text-xs text-muted-foreground">User appreciations</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_comments}</div>
                            <p className="text-xs text-muted-foreground">Active discussions</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Top Performance Stories</CardTitle>
                            <CardDescription>
                                Ranking by view count and engagement rate.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead className="text-right">Views</TableHead>
                                        <TableHead className="text-right">Likes</TableHead>
                                        <TableHead className="text-right">Engagement</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {storiesPerformance.map((story) => (
                                        <TableRow key={story.id}>
                                            <TableCell className="font-medium">{story.title}</TableCell>
                                            <TableCell className="text-right">{story.views}</TableCell>
                                            <TableCell className="text-right">{story.likes}</TableCell>
                                            <TableCell className="text-right">
                                                {story.engagement_rate}%
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {storiesPerformance.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                No data available.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Latest comments from users on stories.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {recentComments.map((comment) => (
                                    <div key={comment.id} className="flex items-center">
                                        <div className="size-9 rounded-full overflow-hidden border">
                                            <img
                                                src={comment.user.avatar}
                                                alt={comment.user.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="ml-4 space-y-1 flex-1">
                                            <p className="text-sm font-medium leading-none">
                                                {comment.user.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                "{comment.content}" on <strong>{comment.story_title}</strong>
                                            </p>
                                            <p className="text-[10px] text-muted-foreground">
                                                {comment.created_at}
                                            </p>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    className="text-red-600 focus:text-red-600 cursor-pointer"
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))}
                                {recentComments.length === 0 && (
                                    <div className="text-center text-sm text-muted-foreground py-8">
                                        No recent comments.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
