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



// Community Section
const communityItems: NavItem[] = [
    {
        title: 'Events',
        href: '/events',
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

import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

// Members Section
const membersItems: NavItem[] = [
    {
        title: 'Users',
        href: '/users',
        icon: Users,
        permission: 'view users',
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: Shield,
        permission: 'manage roles',
    },
    {
        title: 'Permissions',
        href: '/permissions',
        icon: Key,
        permission: 'manage permissions',
    },
];

// Content Section
const contentItems: NavItem[] = [
    {
        title: 'Articles',
        href: '/articles',
        icon: FileText,
        permission: 'view content',
    },
    {
        title: 'Videos',
        href: '/videos',
        icon: VideoIcon,
        permission: 'view content',
    },
    {
        title: 'Wallpapers',
        href: '/wallpapers',
        icon: Image,
        permission: 'view content',
    },
];

export function AppSidebar() {
    const { auth } = usePage<any>().props; // Using any or specific PageProps type to bypass strict SharedData check for now
    const userPermissions = auth.permissions || [];

    const hasPermission = (item: NavItem) => {
        if (!item.permission) return true;
        return userPermissions.includes(item.permission) || userPermissions.includes('manage all'); // 'manage all' is a fallback for super admins if used
    };

    const filterItems = (items: NavItem[]) => items.filter(hasPermission);

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
                    <NavMain items={filterItems(platformItems)} />
                </SidebarGroup>

                {/* Members Section - Hide group if empty */}
                {filterItems(membersItems).length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                            Members
                        </SidebarGroupLabel>
                        <NavGroupWithSub title="Members" items={filterItems(membersItems)} />
                    </SidebarGroup>
                )}

                {/* Content Section - Hide group if empty */}
                {filterItems(contentItems).length > 0 && (
                    <SidebarGroup className="mt-4">
                        <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                            Content
                        </SidebarGroupLabel>
                        <NavMain items={filterItems(contentItems)} />
                    </SidebarGroup>
                )}

                {/* Community Section */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                        Community
                    </SidebarGroupLabel>
                    <NavMain items={filterItems(communityItems)} />
                </SidebarGroup>

                {/* Membership Section */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                        Membership
                    </SidebarGroupLabel>
                    <NavMain items={filterItems(membershipItems)} />
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-50 p-4 dark:border-gray-900">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
