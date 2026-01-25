import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Calendar,
    BookOpen,
    Users,
    MessageCircle,
    Bookmark,
    GraduationCap,
    Crown,
    FileText,
    Play as VideoIcon,
    Image
} from 'lucide-react';

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

// Platform Section
const platformItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Members',
        href: '/users',
        icon: Users,
    },
    {
        title: 'Save',
        href: '#',
        icon: Bookmark,
    },
];

// Content Section
const contentItems: NavItem[] = [
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
    {
        title: 'Wallpapers',
        href: '/wallpapers',
        icon: Image,
    },
];

// Community Section
const communityItems: NavItem[] = [
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
        title: 'Messages',
        href: '#',
        icon: MessageCircle,
    },
];

// Membership Section
const membershipItems: NavItem[] = [
    {
        title: 'My Courses',
        href: '#',
        icon: GraduationCap,
    },
    {
        title: 'Plans',
        href: '#',
        icon: Crown,
    },
];

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
                {/* Platform Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Platform
                    </SidebarGroupLabel>
                    <NavMain items={platformItems} />
                </SidebarGroup>

                {/* Content Section */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Content
                    </SidebarGroupLabel>
                    <NavMain items={contentItems} />
                </SidebarGroup>

                {/* Community Section */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Community
                    </SidebarGroupLabel>
                    <NavMain items={communityItems} />
                </SidebarGroup>

                {/* Membership Section */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Membership
                    </SidebarGroupLabel>
                    <NavMain items={membershipItems} />
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-gray-50 dark:border-gray-900">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
