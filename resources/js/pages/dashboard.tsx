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

export default function Dashboard() {
    const [date, setDate] = useState<Date | undefined>(new Date());

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
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=nico" />
                            <AvatarFallback>NV</AvatarFallback>
                        </Avatar>
                        <div className="hidden flex-col leading-none lg:flex">
                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">Nico Villegas</span>
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

            <main className="grid flex-1 grid-cols-1 gap-0 lg:grid-cols-[1fr_320px]">
                {/* Center Column - Feed */}
                <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 dark:bg-gray-950/40">
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                            Welcome Back, Nico 👋
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 max-md:text-sm">Here's what's happening in your community today.</p>
                    </div>

                    {/* Stories */}
                    <div className="mb-10 w-full overflow-hidden">
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex w-max gap-4 pb-4">
                                {/* Add Story */}
                                <div className="group relative h-48 w-32 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-800">
                                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-gray-900/10 to-transparent"></div>
                                    <div className="flex h-full flex-col items-center justify-center gap-2">
                                        <div className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform group-hover:scale-110 dark:bg-blue-900/30">
                                            <Plus className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-900 dark:text-gray-100">Add Story</span>
                                    </div>
                                </div>

                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="group relative h-48 w-32 shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-transform hover:-translate-y-1">
                                        <img
                                            src={`https://picsum.photos/seed/story${i}/300/500`}
                                            className="absolute h-full w-full object-cover transition-transform group-hover:scale-110"
                                            alt="Story"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                                        <Avatar className="absolute left-3 top-3 border-2 border-blue-500 h-9 w-9">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white">Member {i}</span>
                                    </div>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    {/* Create Post Widget */}
                    <Card className="mb-8 border-none bg-white shadow-sm dark:bg-gray-900">
                        <CardContent className="p-4 md:p-6">
                            <div className="flex gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=nico" />
                                    <AvatarFallback>NV</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-4">
                                    <Textarea
                                        placeholder="What's on your mind?"
                                        className="min-h-[100px] border-none bg-gray-50/50 text-base focus-visible:ring-0 dark:bg-gray-800/50"
                                    />
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                                                <ImageIcon className="h-5 w-5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                <FileText className="h-5 w-5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                <MapPin className="h-5 w-5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                                                <Smile className="h-5 w-5" />
                                            </Button>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" className="border-gray-200 font-bold dark:border-gray-800 text-xs md:text-sm">Draft</Button>
                                            <Button className="bg-blue-600 px-4 md:px-6 font-bold hover:bg-blue-700 text-xs md:text-sm">Post</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feed Post */}
                    <Card className="border-none bg-white shadow-sm dark:bg-gray-900 overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6 pb-2">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-11 w-11 border-2 border-emerald-50 dark:border-gray-800">
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=kina" />
                                    <AvatarFallback>KR</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-bold text-gray-900 dark:text-gray-100">Kina Rally</span>
                                        <CheckCircle2 className="h-3.5 w-3.5 fill-blue-500 text-white" />
                                    </div>
                                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">2 hours ago</span>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-gray-400">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                                Excited to share the highlights from yesterday's creator workshop! We covered everything from platform algorithms to deep audience engagement strategies. Can't wait for the next session! 🚀✨
                            </p>

                            <div className="relative aspect-video w-full rounded-2xl bg-black/5 overflow-hidden border border-gray-100 dark:border-gray-800">
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="size-12 md:size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                        <Video className="h-6 w-6 md:h-8 md:w-8 text-white fill-white" />
                                    </div>
                                </div>
                                <img
                                    src="https://picsum.photos/seed/workshop/1200/675"
                                    className="h-full w-full object-cover opacity-80"
                                    alt="Post Media"
                                />
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-4 mt-4 md:mt-6">
                                <div className="flex gap-1 md:gap-4">
                                    <Button variant="ghost" className="text-gray-500 hover:text-red-500 font-bold gap-2 text-xs">
                                        <Heart className="h-4 w-4 md:h-5 md:w-5" />
                                        12.4k
                                    </Button>
                                    <Button variant="ghost" className="text-gray-500 hover:text-blue-500 font-bold gap-2 text-xs">
                                        <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                                        850
                                    </Button>
                                    <Button variant="ghost" className="text-gray-500 hover:text-emerald-500 font-bold gap-2 text-xs">
                                        <Share2 className="h-4 w-4 md:h-5 md:w-5" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Widgets */}
                <aside className="border-l border-gray-100 bg-white p-6 dark:border-gray-900 dark:bg-gray-950/20 hidden lg:block">
                    <div className="space-y-8 h-full sticky top-24">
                        {/* Upgrade Banner */}
                        <Card className="relative overflow-hidden border-none bg-[#101935] text-white shadow-xl shadow-indigo-500/20">
                            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10 blur-2xl"></div>
                            <CardContent className="p-6 relative">
                                <div className="flex items-center justify-between mb-4">
                                    <Rocket className="h-10 w-10 text-indigo-200" />
                                    <span className="text-[11px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded">Pro Plan</span>
                                </div>
                                <h3 className="text-lg font-black tracking-tight leading-tight mb-4">Upgrade your community experience</h3>
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-xs font-bold text-indigo-200 uppercase tracking-widest">
                                        <span>Trial Status</span>
                                        <span>6/14 Days</span>
                                    </div>
                                    <Progress value={42} className="h-1.5 bg-indigo-800" />
                                </div>
                                <Button className="w-full bg-white text-indigo-950 font-black hover:bg-indigo-50 active:scale-95 transition-all">
                                    Upgrade now
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Calendar */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-black uppercase tracking-widest text-gray-500">Calendar</h4>
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

                        {/* Upcoming Events */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-black uppercase tracking-widest text-gray-500">Upcoming Events</h4>
                                <Plus className="h-4 w-4 text-gray-400 cursor-pointer hover:text-blue-600 transition-colors" />
                            </div>
                            <div className="space-y-3">
                                {[
                                    { title: 'Beginner sharing session creator', time: '10:45 AM', color: 'bg-emerald-500' },
                                    { title: 'Advanced Video Editing Masterclass', time: '02:00 PM', color: 'bg-blue-500' },
                                    { title: 'Community Q&A with Team', time: '05:30 PM', color: 'bg-amber-500' },
                                ].map((event, i) => (
                                    <div key={i} className="flex gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors dark:hover:bg-gray-900/50">
                                        <div className={`mt-1.5 size-2 rounded-full shrink-0 ${event.color}`}></div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-blue-600 transition-colors">
                                                {event.title}
                                            </span>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <Clock className="h-3 w-3 text-gray-400" />
                                                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">{event.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full text-blue-600 font-bold text-[11px] uppercase tracking-widest gap-2 mt-2 hover:bg-blue-50">
                                See all events
                                <ArrowRight className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </aside>
            </main>
        </AppLayout>
    );
}
