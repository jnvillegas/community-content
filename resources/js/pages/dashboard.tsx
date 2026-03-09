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
    courses: {
        id: number;
        title: string;
        description: string;
        cover_image: string;
        slug: string;
        instructor: {
            name: string;
            avatar: string;
        };
        modules_count: number;
    }[];
    auth: any;
}

import StoriesBar from '@/components/feed/stories-bar';
import ActivityFeed from '@/components/feed/activity-feed';
import AppLogo from '@/components/app-logo';

export default function Dashboard({ upcomingEvents, activities, stories, courses, auth }: DashboardProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [sidebarTab, setSidebarTab] = useState<'upcoming' | 'calendar'>('calendar');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Home',
            href: '/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* <Head title="Creator Connect - Dashboard" /> */}

            <main className="flex justify-center items-start w-full max-w-7xl mx-auto gap-1 md:gap-6 px-0 md:px-6 lg:px-8 md:mt-5 md:mb-5">
                <div className="flex-1 w-full bg-sidebar min-h-[90vh] md:rounded-2xl px-3 md:px-8 pt-6 overflow-hidden pb-[100px] md:pb-8">
                    <div className='mb-6 px-1 md:px-0'>
                        <AppLogo></AppLogo>
                    </div>
                    <StoriesBar stories={stories} />
                    <ActivityFeed activities={activities} courses={courses} />
                </div>

                {/* Right Column - Widgets */}
                <aside className="bg-transparent hidden lg:block w-[312px] min-w-[312px]">
                    <div className="space-y-6 h-full sticky top-5">

                        <div className="flex items-center p-1 bg-sidebar rounded-xl">
                            <button
                                onClick={() => setSidebarTab('calendar')}
                                className={`flex-1 flex items-center justify-center gap-2 p-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${sidebarTab === 'calendar'
                                    ? 'bg-card text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                    }`}
                            >
                                <Clock className="w-3 h-3" />
                                Calendar
                            </button>
                            <button
                                onClick={() => setSidebarTab('upcoming')}
                                className={`flex-1 flex items-center justify-center gap-2 p-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${sidebarTab === 'upcoming'
                                    ? 'bg-card text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                    }`}
                            >
                                <Rocket className="w-3 h-3" />
                                Upcoming
                            </button>
                        </div>

                        {sidebarTab === 'calendar' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="rounded-2xl p-4 shadow-sm bg-sidebar">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="rounded-xl mx-auto w-full"
                                    />
                                </div>
                            </div>
                        )}

                        {sidebarTab === 'upcoming' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 bg-sidebar rounded-2xl p-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-gray-500">Next Events</h4>
                                </div>
                                <div className="space-y-3">
                                    {upcomingEvents.length > 0 ? (
                                        upcomingEvents.map((event) => (
                                            <div key={event.id} className="flex gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors dark:hover:bg-card">
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
                            </div>
                        )}
                    </div>
                </aside>
            </main>
        </AppLayout >
    );
}
