import { Head } from '@inertiajs/react';
import {
    Search,
    Video,
    Bell,
    MoreHorizontal,
    Image as ImageIcon,
    FileText,
    MapPin,
    Smile,
    Plus,
    MessageCircle,
    Heart,
    Share2,
    Clock,
    ArrowRight,
    Rocket,
    CheckCircle2
} from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useState } from 'react';
import { NotificationDropdown } from '@/components/notification-dropdown';

interface DashboardProps {
    upcomingEvents: {
        id: number;
        title: string;
        description: string;
        location: string;
        start_date: string;
        end_date: string;
        slug: string;
        cover_image: string;
        color: string;
        likes_count: number;
        is_liked: boolean;
        comments: any[];
    }[];
    activities: {
        data: any[];
        links: any[];
    };
    auth: any;
}

import StoriesBar from '@/components/feed/stories-bar';
import ActivityFeed from '@/components/feed/activity-feed';

export default function Dashboard({ upcomingEvents, activities, auth }: DashboardProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [sidebarTab, setSidebarTab] = useState<'upcoming' | 'calendar'>('upcoming');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Home',
            href: '/dashboard',
        },
    ];

    const DashboardHeader = (
        <div className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 md:px-8">
            <div className="flex items-center gap-4 flex-1">
                <SidebarTrigger className="-ml-1 lg:hidden" />
                <div className="relative w-full max-w-md group hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600" />
                    <Input
                        placeholder="Search for courses, events..."
                        className="w-full border-gray-100 bg-gray-50/50 pl-10 focus:bg-white dark:border-gray-800 dark:bg-gray-900/50"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <Button className="h-10 bg-blue-600 font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700">
                    <Video className="md:mr-2 h-4 w-4" />
                    <span className="hidden md:inline text-xs">Go live</span>
                </Button>

                <div className="flex items-center gap-2 md:gap-4 border-l border-gray-100 pl-3 md:pl-6 dark:border-gray-800">
                    <NotificationDropdown />

                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 md:h-10 md:w-10 border-2 border-blue-100 dark:border-gray-800">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${auth.user.name}`} />
                            <AvatarFallback>NV</AvatarFallback>
                        </Avatar>
                        <div className="hidden flex-col leading-none lg:flex">
                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{auth.user.name}</span>
                            <span className="text-[11px] font-medium text-gray-500">Creator Account</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs} header={DashboardHeader}>
            <Head title="Creator Connect - Dashboard" />

            <main className="grid flex-1 grid-cols-1 gap-0 lg:grid-cols-[1fr_330px]">
                {/* Center Column - Feed */}
                <div className="min-h-screen min-w-0 bg-[#F8F9FA] p-4 md:p-8 dark:bg-gray-950/40">
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                            Welcome Back, {auth.user.name} 👋
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 max-md:text-sm">Here's what's happening in your community today.</p>
                    </div>

                    {/* Stories */}
                    <StoriesBar events={upcomingEvents} />

                    {/* Feed */}
                    <div className="mb-8">
                        <ActivityFeed activities={activities} />
                    </div>
                </div>

                {/* Right Column - Widgets */}
                <aside className="border-l border-gray-100 bg-white p-6 dark:border-gray-900 dark:bg-gray-950/20 hidden lg:block">
                    <div className="space-y-6 h-full sticky top-24">

                        {/* Tabs Header */}
                        <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                            <button
                                onClick={() => setSidebarTab('upcoming')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${sidebarTab === 'upcoming'
                                    ? 'bg-white dark:bg-gray-950 text-blue-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                    }`}
                            >
                                <Rocket className="w-3 h-3" />
                                Upcoming
                            </button>
                            <button
                                onClick={() => setSidebarTab('calendar')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${sidebarTab === 'calendar'
                                    ? 'bg-white dark:bg-gray-950 text-blue-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                    }`}
                            >
                                <Clock className="w-3 h-3" />
                                Calendar
                            </button>
                        </div>

                        {/* Tab Content: Upcoming */}
                        {sidebarTab === 'upcoming' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-gray-500">Next Events</h4>
                                    <Plus className="h-4 w-4 text-gray-400 cursor-pointer hover:text-blue-600 transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    {upcomingEvents.length > 0 ? (
                                        upcomingEvents.map((event) => (
                                            <div key={event.id} className="flex gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors dark:hover:bg-gray-900/50">
                                                <div className={`mt-1.5 size-2 rounded-full shrink-0 ${event.color}`}></div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-blue-600 transition-colors">
                                                        {event.title}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        <Clock className="h-3 w-3 text-gray-400" />
                                                        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                                                            {new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
                                    )}
                                </div>
                                <Button variant="ghost" className="w-full text-blue-600 font-bold text-[11px] uppercase tracking-widest gap-2 mt-2 hover:bg-blue-50">
                                    See all events
                                    <ArrowRight className="h-3 w-3" />
                                </Button>
                            </div>
                        )}

                        {/* Tab Content: Calendar */}
                        {sidebarTab === 'calendar' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-gray-500">Calendar View</h4>
                                    <Button variant="ghost" size="sm" className="h-8 text-[11px] font-bold text-blue-600">Full View</Button>
                                </div>
                                <div className="rounded-2xl border border-gray-100 p-2 shadow-sm dark:border-gray-900 bg-gray-50/30 dark:bg-gray-900/40">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-xl mx-auto"
                                    />
                                </div>
                            </div>
                        )}

                    </div>
                </aside>
            </main>
        </AppLayout>
    );
}
