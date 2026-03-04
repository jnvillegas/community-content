import { Link } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { NotificationDropdown } from '@/components/notification-dropdown';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem as BreadcrumbItemType, type PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import AppLogo from './app-logo';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<PageProps>().props;
    const isMobile = useIsMobile();
    const getInitials = useInitials();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full shrink-0 items-center justify-between gap-4 bg-white dark:bg-gray-950 border-b border-sidebar-border/50 px-4 transition-[width,height] ease-linear">
            {/* Left side: Trigger and Logo aligned */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                    <SidebarTrigger className="-ml-1 h-9 w-9 shrink-0" />

                    {/* Divider */}
                    <div className="w-px h-6 bg-sidebar-border/50" />

                    {/* Logo wrapped in Link */}
                    <Link href={dashboard()} prefetch className="shrink-0 hover:opacity-80 transition-opacity">
                        <AppLogo />
                    </Link>
                </div>
            </div>

            {/* Right side: User Menu & Notifications */}
            <div className="flex items-center gap-2 shrink-0 pointer-events-auto">
                <NotificationDropdown />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300 group/user">
                            {/* Avatar Container with Badges */}
                            <div className="relative">
                                <Avatar className="size-11 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                                    <AvatarImage
                                        src={auth.user.avatar}
                                        alt={auth.user.name}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="rounded-2xl bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white font-bold">
                                        {getInitials(auth.user.name)}
                                    </AvatarFallback>
                                </Avatar>

                                {/* Notification Badge (Top Right) */}
                                {auth.unread_notifications_count > 0 && (
                                    <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white dark:border-gray-950">
                                        {auth.unread_notifications_count}
                                    </div>
                                )}

                                {/* Status Dot (Bottom Right) */}
                                <div className={cn(
                                    "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-950 transition-colors duration-500",
                                    auth.user.is_online ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"
                                )}>
                                </div>
                            </div>

                            {/* User Info & Role Badge */}
                            <div className="hidden sm:flex flex-col items-start min-w-[120px]">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-[100px]">
                                        {auth.user.name}
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter border border-indigo-200/50 dark:border-indigo-800/50">
                                        PRO
                                    </span>
                                </div>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[150px] font-medium">
                                    {auth.user.email}
                                </span>
                            </div>

                            <ChevronsUpDown className="size-4 text-neutral-400 group-hover/user:text-neutral-900 dark:group-hover/user:text-neutral-100 transition-colors hidden sm:block" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56 rounded-lg"
                        align="end"
                        side="bottom"
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
