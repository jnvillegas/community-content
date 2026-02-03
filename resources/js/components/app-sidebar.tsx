import { Link } from '@inertiajs/react';
import {
    Bookmark,
    BookOpen,
    Calendar,
    Crown,
    FileText,
    GraduationCap,
    Image,
    Key,
    LayoutGrid,
    MessageCircle,
    Shield,
    Users,
    Play as VideoIcon,
} from 'lucide-react';

import { NavGroupWithSub } from '@/components/nav-group-with-sub';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
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
        title: 'Save',
        href: '#',
        icon: Bookmark,
    },
];

// Members Section
const membersItems: NavItem[] = [
    {
        title: 'Users',
        href: '/users',
        icon: Users,
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: Shield,
    },
    {
        title: 'Permissions',
        href: '/permissions',
        icon: Key,
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
        <Sidebar
            collapsible="icon"
            className="border-r border-gray-100 bg-white dark:bg-gray-950"
        >
            <SidebarHeader className="p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:bg-transparent"
                        >
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
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                        Platform
                    </SidebarGroupLabel>
                    <NavMain items={platformItems} />
                </SidebarGroup>

                {/* Members Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                        Members
                    </SidebarGroupLabel>
                    <NavGroupWithSub title="Members" items={membersItems} />
                </SidebarGroup>

                {/* Content Section */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                        Content
                    </SidebarGroupLabel>
                    <NavMain items={contentItems} />
                </SidebarGroup>

                {/* Community Section */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                        Community
                    </SidebarGroupLabel>
                    <NavMain items={communityItems} />
                </SidebarGroup>

                {/* Membership Section */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                        Membership
                    </SidebarGroupLabel>
                    <NavMain items={membershipItems} />
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-50 p-4 dark:border-gray-900">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
