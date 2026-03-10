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
    Home,
    User as UserIcon,
    Sparkles,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarTrigger,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import AppLogo from '@/components/app-logo';
import { dashboard } from '@/routes';
import { edit as profileEdit } from '@/routes/profile';
import { type NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import CreateStoryModal from './feed/CreateStoryModal';
import { useState } from 'react';
import { NotificationDropdown } from './notification-dropdown';

// Platform Section
const platformItems: NavItem[] = [
    {
        title: 'Home',
        href: dashboard(),
        icon: Home,
    }
];

const userItems: NavItem[] = [
    {
        title: 'Profile',
        href: profileEdit(),
        icon: UserIcon,
    }
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

// Members Section
const membersItems: NavItem[] = [
    {
        title: 'Users',
        href: '/users',
        icon: Users,
        items: [
            {
                title: 'Users',
                href: '/users',
                permission: 'view users',
            },
            {
                title: 'Roles',
                href: '/roles',
                permission: 'manage roles',
            },
            {
                title: 'Permissions',
                href: '/permissions',
                permission: 'manage permissions',
            },
        ],
    },
];

// Stories Section - Moved into AppSidebar to use state

// Content Section
const contentItems: NavItem[] = [
    {
        title: 'Articles',
        href: '/articles',
        icon: FileText,
        items: [
            {
                title: 'List',
                href: '/articles',
                permission: 'view articles',
            },
            {
                title: 'Gallery',
                href: '/articles/gallery',
                permission: 'view gallery',
            },
        ],
    },
    {
        title: 'Videos',
        href: '/videos',
        icon: VideoIcon,
        items: [
            {
                title: 'List',
                href: '/videos',
                permission: 'view videos',
            },
            {
                title: 'Gallery',
                href: '/videos/gallery',
                permission: 'view video gallery',
            },
        ],
    },
    {
        title: 'Wallpapers',
        href: '/wallpapers',
        icon: Image,
        items: [
            {
                title: 'List',
                href: '/wallpapers',
                permission: 'view wallpapers',
            },
            {
                title: 'Gallery',
                href: '/wallpapers/gallery',
                permission: 'view wallpaper gallery',
            },
        ],
    },
];

// Event Management Section
const eventManagementItems: NavItem[] = [
    {
        title: 'Events',
        href: '/events',
        icon: Calendar,
        items: [
            {
                title: 'All Events',
                href: '/events',
            },
            {
                title: 'Dashboard',
                href: '/admin/events',
                permission: 'manage events',
            },
            {
                title: 'Categories',
                href: '/admin/event-categories',
                permission: 'manage events',
            },
        ],
    },
];

// Academy Section
const academyItems: NavItem[] = [
    {
        title: 'Academy',
        href: '/academy',
        icon: GraduationCap,
        items: [
            {
                title: 'Courses',
                href: '/academy',
            },
            {
                title: 'Dashboard',
                href: '/admin/academy',
                permission: 'manage courses',
            },
            {
                title: 'Manage',
                href: '/admin/academy/courses',
                permission: 'manage courses',
            },
        ],
    },
];

export function AppSidebar() {
    const { auth } = usePage<any>().props;
    const userPermissions = auth.permissions || [];
    const userRoles = auth.roles || [];
    const isAdmin = userRoles.includes('admin');
    const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
    const [openItem, setOpenItem] = useState<string | null>(null);

    // Stories Section
    const storiesItems: NavItem[] = [
        {
            title: 'Stories',
            href: '/admin/stories',
            icon: Sparkles,
            items: [
                {
                    title: 'Dashboard',
                    href: '/admin/stories',
                    permission: 'manage stories',
                },
                {
                    title: 'Create Story',
                    href: '#',
                    onClick: () => setIsCreateStoryOpen(true),
                    permission: 'manage stories',
                },
            ],
        },
    ];

    const hasPermission = (item: NavItem) => {
        if (!item.permission) return true;
        return userPermissions.includes(item.permission) ||
            userPermissions.includes('manage all') ||
            isAdmin;
    };

    const filterItems = (items: NavItem[]): NavItem[] => {
        return items
            .filter((item) => {
                // If not admin, only show specific core sections
                if (!isAdmin) {
                    const allowedTitles = ['Home', 'Profile', 'Events', 'Academy'];
                    if (!allowedTitles.includes(item.title)) return false;
                }
                return hasPermission(item);
            })
            .map((item) => {
                if (item.items) {
                    const filteredSubItems = item.items.filter(hasPermission);

                    // For common users, never show dropdowns
                    if (!isAdmin) {
                        const { items: _, ...rest } = item;
                        return rest;
                    }

                    // For admins, only show dropdown if there are 2+ items
                    if (filteredSubItems.length > 1) {
                        return { ...item, items: filteredSubItems };
                    }

                    // Otherwise flatten (0 or 1 item)
                    const { items: _, ...rest } = item;
                    return rest;
                }
                return item;
            });
    };

    return (
        <Sidebar
            collapsible="icon"
            className="bg-section dark:bg-section h-[calc(100vh-2.5rem)] mt-5 mb-5 mx-2 rounded-xl"
        >

            {/* <div className="flex items-center gap-2 px-4 py-3 md:hidden">
                <SidebarTrigger />
                <Link href={dashboard()} prefetch className="shrink-0 hover:opacity-80 transition-opacity">
                    <AppLogo />
                </Link>
            </div> */}

            <SidebarContent className="px-2 pt-4">
                <SidebarTrigger className='mb-2' />
                {/* Platform Section */}
                <SidebarGroup>
                    {/* <SidebarGroupLabel className="px-4 text-[11px] font-bold tracking-wider text-gray-400 uppercase peer-data-[state=collapsed]:hidden">
                        Platform
                    </SidebarGroupLabel> */}
                    <NavMain items={filterItems(platformItems)} openItem={openItem} setOpenItem={setOpenItem} />
                </SidebarGroup>

                {filterItems(userItems).length > 0 && (
                    <SidebarGroup>
                        <NavMain items={filterItems(userItems)} openItem={openItem} setOpenItem={setOpenItem} />
                    </SidebarGroup>
                )}

                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <NotificationDropdown variant="sidebar" />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                {/* Members Section - Hide group if empty (render as regular nav) */}
                {filterItems(membersItems).length > 0 && (
                    <SidebarGroup>
                        <NavMain items={filterItems(membersItems)} openItem={openItem} setOpenItem={setOpenItem} />
                    </SidebarGroup>
                )}

                {/* Stories Section */}
                {filterItems(storiesItems).length > 0 && (
                    <SidebarGroup>
                        <NavMain items={filterItems(storiesItems)} openItem={openItem} setOpenItem={setOpenItem} />
                    </SidebarGroup>
                )}

                {/* Event Management Section */}
                {filterItems(eventManagementItems).length > 0 && (
                    <SidebarGroup>
                        <NavMain items={filterItems(eventManagementItems)} openItem={openItem} setOpenItem={setOpenItem} />
                    </SidebarGroup>
                )}

                {/* Academy Section */}
                {filterItems(academyItems).length > 0 && (
                    <SidebarGroup>
                        <NavMain items={filterItems(academyItems)} openItem={openItem} setOpenItem={setOpenItem} />
                    </SidebarGroup>
                )}

                {/* Content Section - Hide group if empty */}
                {filterItems(contentItems).length > 0 && (
                    <SidebarGroup>
                        <NavMain items={filterItems(contentItems)} openItem={openItem} setOpenItem={setOpenItem} />
                    </SidebarGroup>
                )}

                {/* Community Section */}
                {/* <SidebarGroup className="border-t border-gray-200 dark:border-neutral-700">
                    <SidebarGroupLabel className="text-[11px] font-bold tracking-wider text-gray-400 uppercase peer-data-[state=collapsed]:hidden">
                        Community
                    </SidebarGroupLabel>
                    <NavMain items={filterItems(communityItems)} />
                </SidebarGroup> */}

                {/* Membership Section */}
                {/* {filterItems(membershipItems).length > 0 && (
                    <SidebarGroup className="border-t border-gray-200 dark:border-neutral-700">
                        <SidebarGroupLabel className="text-[11px] font-bold tracking-wider text-gray-400 uppercase peer-data-[state=collapsed]:hidden">
                            Membership
                        </SidebarGroupLabel>
                        <NavMain items={filterItems(membershipItems)} />
                    </SidebarGroup>
                )} */}
            </SidebarContent>

            <CreateStoryModal
                isOpen={isCreateStoryOpen}
                onClose={() => setIsCreateStoryOpen(false)}
            />
        </Sidebar>
    );
}
