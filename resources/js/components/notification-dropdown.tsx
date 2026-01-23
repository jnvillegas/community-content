import { Bell, Check, Trash2, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type SharedData } from '@/types';
import { cn } from '@/lib/utils';
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

export function NotificationDropdown() {
    const { auth } = usePage<SharedData>().props;
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/notifications');
            setNotifications(response.data.data);
        } catch (error) {
            console.error('Failed to fetch notifications', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    const markAsRead = async (id: string) => {
        try {
            await axios.patch(`/notifications/${id}/read`);
            setNotifications(notifications.map(n =>
                n.id === id ? { ...n, read_at: new Date().toISOString() } : n
            ));
            // Trigger Inertia reload to update the shared count
            router.reload({ only: ['auth'] });
        } catch (error) {
            console.error('Failed to mark notification as read', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post('/notifications/read-all');
            setNotifications(notifications.map(n => ({ ...n, read_at: new Date().toISOString() })));
            router.reload({ only: ['auth'] });
        } catch (error) {
            console.error('Failed to mark all as read', error);
        }
    };

    const deleteNotification = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await axios.delete(`/notifications/${id}`);
            setNotifications(notifications.filter(n => n.id !== id));
            router.reload({ only: ['auth'] });
        } catch (error) {
            console.error('Failed to delete notification', error);
        }
    };

    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-500">
                    <Bell className="h-5 w-5" />
                    {auth.unread_notifications_count > 0 && (
                        <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-gray-950"></span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-0" align="end">
                <DropdownMenuLabel className="p-4 flex items-center justify-between">
                    <span className="font-bold">Notifications</span>
                    {auth.unread_notifications_count > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-[11px] h-auto p-0 text-blue-600 font-bold hover:bg-transparent"
                            onClick={markAllAsRead}
                        >
                            Mark all as read
                        </Button>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-80">
                    {loading ? (
                        <div className="p-4 text-center text-sm text-gray-500">Loading...</div>
                    ) : notifications.length === 0 ? (
                        <div className="p-8 text-center">
                            <Bell className="h-8 w-8 text-gray-200 mx-auto mb-2" />
                            <p className="text-sm text-gray-500 font-medium">No notifications yet</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "p-4 border-b border-gray-50 dark:border-gray-800 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors relative group",
                                        !notification.read_at && "bg-blue-50/30 dark:bg-blue-900/10"
                                    )}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <div className="flex gap-3">
                                        <Avatar className="h-9 w-9 shrink-0">
                                            <AvatarImage src={notification.data.sender_avatar} />
                                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                                {notification.data.sender_name?.charAt(0) || 'N'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm leading-tight">
                                                <span className="font-bold">{notification.data.sender_name}</span> {notification.data.message}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-widest">
                                                    {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                {notification.data.action_url && (
                                                    <ExternalLink className="h-3 w-3 text-blue-500" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-gray-400 hover:text-red-500"
                                                onClick={(e) => deleteNotification(notification.id, e)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    {!notification.read_at && (
                                        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-full" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3 justify-center text-xs font-bold text-gray-500 uppercase tracking-widest cursor-pointer hover:text-blue-600">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
