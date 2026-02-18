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
    Tags,
    Plus,
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
import CreateStoryModal from './feed/CreateStoryModal';
import { useState } from 'react';

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
        title: 'Messages',
        href: '#',
        icon: MessageCircle,
    },
];

// Membership Section
const membershipItems: NavItem[] = [
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

// Stories Section - Moved into AppSidebar to use state

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

// Event Management Section
const eventManagementItems: NavItem[] = [
    {
        title: 'Events',
        href: '/events',
        icon: Calendar,
    },
    {
        title: 'Dashboard',
        href: '/admin/events',
        icon: LayoutGrid,
        permission: 'manage events',
    },
    {
        title: 'Categories',
        href: '/admin/event-categories',
        icon: Tags,
        permission: 'manage events',
    },
];

// Academy Section
const academyItems: NavItem[] = [
    {
        title: 'Academy',
        href: '/academy',
        icon: GraduationCap,
    },
    {
        title: 'My Courses',
        href: '#',
        icon: Bookmark,
    },
    {
        title: 'Academy Dashboard',
        href: '/admin/academy',
        icon: LayoutGrid,
        // permission: 'manage academy', // Temporarily removed for verification
    },
    {
        title: 'Manage Courses',
        href: '/admin/academy/courses',
        icon: BookOpen,
        // permission: 'manage academy', // Temporarily removed for verification
    },
];

export function AppSidebar() {
    const { auth } = usePage<any>().props; // Using any or specific PageProps type to bypass strict SharedData check for now
    const userPermissions = auth.permissions || [];
    const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);

    // Stories Section
    const storiesItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/stories',
            icon: LayoutGrid,
        },
        {
            title: 'Crear Historia',
            href: '#',
            icon: Plus,
            onClick: () => setIsCreateStoryOpen(true),
        },
    ];

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
                    <SidebarGroup className="mt-4">
                        <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                            Members
                        </SidebarGroupLabel>
                        <NavGroupWithSub title="Members" items={filterItems(membersItems)} />
                    </SidebarGroup>
                )}

                {/* Stories Section */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                        Stories
                    </SidebarGroupLabel>
                    <NavMain items={filterItems(storiesItems)} />
                </SidebarGroup>

                {/* Event Management Section */}
                {filterItems(eventManagementItems).length > 0 && (
                    <SidebarGroup className="mt-4">
                        <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                            Event Management
                        </SidebarGroupLabel>
                        <NavMain items={filterItems(eventManagementItems)} />
                    </SidebarGroup>
                )}

                {/* Academy Section */}
                {filterItems(academyItems).length > 0 && (
                    <SidebarGroup className="mt-4">
                        <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                            Academy
                        </SidebarGroupLabel>
                        <NavMain items={filterItems(academyItems)} />
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
                {filterItems(membershipItems).length > 0 && (
                    <SidebarGroup className="mt-4">
                        <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                            Membership
                        </SidebarGroupLabel>
                        <NavMain items={filterItems(membershipItems)} />
                    </SidebarGroup>
                )}
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-50 p-4 dark:border-gray-900">
                <NavUser />
            </SidebarFooter>

            <CreateStoryModal
                isOpen={isCreateStoryOpen}
                onClose={() => setIsCreateStoryOpen(false)}
            />
        </Sidebar>
    );
}
