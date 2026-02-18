import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Event, PageProps, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Users, CheckCircle2, XCircle, Heart, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Comment {
    id: number;
    user_id: number;
    content: string;
    created_at: string;
    user: User;
}

interface EventWithComments extends Event {
    comments: Comment[];
}

interface Props extends PageProps {
    event: EventWithComments;
    stats: {
        total_registrations: number;
        confirmed_count: number;
        cancelled_count: number;
        attended_count: number;
        likes_count: number;
        revenue?: number;
    };
}

export default function Stats({ event, stats }: Props) {
    return (
        <AppLayout breadcrumbs={[
            { title: 'Home', href: '/dashboard' },
            { title: 'Events', href: '/admin/events' },
            { title: 'Stats', href: '#' },
        ]}>
            <Head title={`Stats - ${event.title}`} />

            <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
                <div>
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2" asChild>
                        <Link href="/admin/events">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Events
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-black tracking-tight mt-2">Event Statistics</h1>
                    <p className="text-muted-foreground">{event.title}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Registrations</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_registrations}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Likes</CardTitle>
                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.likes_count}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.confirmed_count}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Attended</CardTitle>
                            <Users className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.attended_count}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.cancelled_count}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary" />
                            <CardTitle>Recent Comments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {event.comments && event.comments.length > 0 ? (
                                    event.comments.map((comment, index) => (
                                        <div key={comment.id} className="flex flex-col space-y-2">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 border border-gray-100 dark:border-gray-800">
                                                        <AvatarImage src={comment.user.avatar || undefined} alt={comment.user.name} />
                                                        <AvatarFallback>{comment.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                                                            {comment.user.name}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {comment.user.email}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-400">
                                                    {format(new Date(comment.created_at), 'PPPp', { locale: es })}
                                                </span>
                                            </div>
                                            <div className="pl-12">
                                                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                                    {comment.content}
                                                </p>
                                            </div>
                                            {index < event.comments.length - 1 && <Separator className="mt-4" />}
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-4">
                                            <MessageSquare className="w-6 h-6 text-gray-300" />
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet for this event.</p>
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
