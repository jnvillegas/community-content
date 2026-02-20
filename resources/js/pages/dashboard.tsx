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
    stories: any[];
    auth: any;
}

import StoriesBar from '@/components/feed/stories-bar';
import ActivityFeed from '@/components/feed/activity-feed';

export default function Dashboard({ upcomingEvents, activities, stories, auth }: DashboardProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [sidebarTab, setSidebarTab] = useState<'upcoming' | 'calendar'>('upcoming');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Home',
            href: '/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Creator Connect - Dashboard" />

            <main className="flex columns-2 background:transparent">
                <div className="min-h-screen min-w-0 bg-transparent p-4 md:p-8 dark:bg-transparent">
                    {/* Stories */}
                    <StoriesBar stories={stories} />

                    {/* Feed */}
                    <div className="mb-8">
                        <ActivityFeed activities={activities} />
                    </div>
                </div>

                {/* Right Column - Widgets */}
                <aside className="bg-white p-6 pl-0 pt-10 dark:bg-transparent hidden lg:block">
                    <div className="space-y-6 h-full sticky top-24">

                        <div className="flex items-center p-1 bg-gray-100 dark:bg-zinc-900 rounded-xl">
                            <button
                                onClick={() => setSidebarTab('upcoming')}
                                className={`flex-1 flex items-center justify-center gap-2 p-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${sidebarTab === 'upcoming'
                                    ? 'bg-white dark:bg-zinc-700 text-[#1d9bf0]shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                    }`}
                            >
                                <Rocket className="w-3 h-3" />
                                Upcoming
                            </button>
                            <button
                                onClick={() => setSidebarTab('calendar')}
                                className={`flex-1 flex items-center justify-center gap-2 p-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${sidebarTab === 'calendar'
                                    ? 'bg-white dark:bg-zinc-700 text-[#1d9bf0]shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                    }`}
                            >
                                <Clock className="w-3 h-3" />
                                Calendar
                            </button>
                        </div>

                        {sidebarTab === 'upcoming' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-gray-500">Next Events</h4>
                                    <Plus className="h-4 w-4 text-gray-400 cursor-pointer hover:text-[#1d9bf0] transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    {upcomingEvents.length > 0 ? (
                                        upcomingEvents.map((event) => (
                                            <div key={event.id} className="flex gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors dark:hover:bg-zinc-900">
                                                <div className={`mt-1.5 size-2 rounded-full shrink-0 bg-[#1d9bf0]`}></div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-[#1d9bf0] transition-colors">
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
                                <Button variant="ghost" className="w-full text-[#1d9bf0] font-bold text-[11px] uppercase tracking-widest gap-2 mt-2 hover:bg-zinc-700 hover:text-[#1d9bf0] ">
                                    See all events
                                    <ArrowRight className="h-3 w-3" />
                                </Button>
                            </div>
                        )}

                        {sidebarTab === 'calendar' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-gray-500">Calendar View</h4>
                                    <Button variant="ghost" size="sm" className="h-8 text-[11px] font-bold text-[#1d9bf0]">Full View</Button>
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
            </main >
        </AppLayout >
    );
}
