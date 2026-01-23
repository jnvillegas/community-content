import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Calendar,
    BookOpen,
    Users,
    MessageCircle,
    Bookmark,
    PlusCircle,
    GraduationCap,
    Crown,
    Settings,
    FileText,
    Play as VideoIcon
} from 'lucide-react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';

import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Events',
        href: '#',
        icon: Calendar,
    },
    {
        title: 'Courses',
        href: '#',
        icon: BookOpen,
    },
    {
        title: 'Members',
        href: '/users',
        icon: Users,
    },
    {
        title: 'Message',
        href: '#',
        icon: MessageCircle,
    },
    {
        title: 'Save',
        href: '#',
        icon: Bookmark,
    },
    {
        title: 'Articles',
        href: '/articles',
        icon: FileText,
    },
    {
        title: 'Videos',
        href: '/videos',
        icon: VideoIcon,
    },
];

const secondaryNavItems = {
    getStarted: [
        { title: 'Introduction', href: '#', icon: PlusCircle },
        { title: 'Community Guidelines', href: '#', icon: ShieldCheckIcon },
    ],
};

// Custom ShieldCheck icon since I don't want to import everything
function ShieldCheckIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="border-r border-gray-100 bg-white dark:bg-gray-950">
            <SidebarHeader className="p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2">
                <NavMain items={mainNavItems} />

                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Get Started</SidebarGroupLabel>
                    <NavMain items={[
                        { title: 'Getting Started', href: '#', icon: PlusCircle },
                    ]} />
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Course</SidebarGroupLabel>
                    <NavMain items={[
                        { title: 'My Courses', href: '#', icon: GraduationCap },
                    ]} />
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Membership</SidebarGroupLabel>
                    <NavMain items={[
                        { title: 'Plans', href: '#', icon: Crown },
                    ]} />
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-gray-50 dark:border-gray-900">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
