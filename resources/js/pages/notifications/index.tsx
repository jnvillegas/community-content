import { Head } from '@inertiajs/react';
import { Bell, Check, Trash2, ExternalLink, Clock } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import axios from 'axios';

interface NotificationData {
    id: string;
    type: string;
    data: {
        message: string;
        action_url?: string;
        sender_name?: string;
        sender_avatar?: string;
    };
    read_at: string | null;
    created_at: string;
}

interface Props {
    notifications: {
        data: NotificationData[];
        links: any[];
    };
}

export default function NotificationsIndex({ notifications }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Notifications',
            href: '/notifications',
        },
    ];

    const markAsRead = async (id: string) => {
        try {
            await axios.patch(`/notifications/${id}/read`);
            router.reload({ only: ['notifications'] });
        } catch (error) {
            console.error('Failed to mark as read', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post('/notifications/read-all');
            router.reload({ only: ['notifications'] });
        } catch (error) {
            console.error('Failed to mark all as read', error);
        }
    };

    const deleteNotification = async (id: string) => {
        try {
            await axios.delete(`/notifications/${id}`);
            router.reload({ only: ['notifications'] });
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <div className="max-w-4xl mx-auto py-10 px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                            Notifications
                        </h1>
                        <p className="text-gray-500 mt-1">Stay updated with the latest community activity.</p>
                    </div>

                    <Button
                        variant="outline"
                        onClick={markAllAsRead}
                        className="rounded-xl font-bold uppercase tracking-widest text-[11px] h-10 px-6"
                    >
                        Mark all as read
                    </Button>
                </div>

                <div className="space-y-4">
                    {notifications.data.length === 0 ? (
                        <Card className="border-dashed border-2 bg-transparent">
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Bell className="h-12 w-12 text-gray-200 mb-4" />
                                <p className="text-gray-500 font-medium">No notifications here yet.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        notifications.data.map((notification) => (
                            <Card
                                key={notification.id}
                                className={cn(
                                    "overflow-hidden transition-all duration-300 border-none shadow-sm hover:shadow-md",
                                    !notification.read_at
                                        ? "bg-card"
                                        : "bg-transparent opacity-70"
                                )}
                            >
                                <CardContent className="p-0">
                                    <div className="flex items-start gap-4 p-5">
                                        <Avatar className="h-12 w-12 shrink-0 border-2 border-white dark:border-zinc-800 shadow-sm">
                                            <AvatarImage src={notification.data.sender_avatar} />
                                            <AvatarFallback className="bg-[#09f]/10 text-[#09f] font-bold">
                                                {notification.data.sender_name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <p className="text-sm">
                                                    <span className="font-black text-gray-900 dark:text-gray-100 italic">
                                                        {notification.data.sender_name}
                                                    </span>
                                                    {' '}
                                                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                                                        {notification.data.message}
                                                    </span>
                                                </p>

                                                <div className="flex items-center gap-1 shrink-0">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        onClick={() => deleteNotification(notification.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 mt-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                                        {new Date(notification.created_at).toLocaleDateString()} at {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>

                                                {notification.data.action_url && notification.data.action_url !== '#' && (
                                                    <Button
                                                        variant="link"
                                                        className="h-auto p-0 text-[11px] font-black uppercase tracking-widest text-[#09f] hover:opacity-80 italic"
                                                        onClick={async () => {
                                                            await markAsRead(notification.id);
                                                            router.visit(notification.data.action_url!);
                                                        }}
                                                    >
                                                        View Details
                                                        <ExternalLink className="h-3 w-3 ml-1" />
                                                    </Button>
                                                )}

                                                {!notification.read_at && (
                                                    <Button
                                                        variant="link"
                                                        className="h-auto p-0 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-[#09f] leading-none"
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        Mark as read
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
