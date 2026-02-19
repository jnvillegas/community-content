import { Link } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import AppLogo from './app-logo';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<SharedData>().props;
    const isMobile = useIsMobile();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full shrink-0 items-center justify-between gap-4 bg-background px-6 transition-[width,height] ease-linear md:px-4">
            {/* Left side: Logo, Trigger, Breadcrumbs */}
            <div className="flex items-center gap-3 flex-1 min-w-0">

                {/* Sidebar Trigger and Breadcrumbs */}
                <div className="flex items-center gap-2 min-w-0">
                    <SidebarTrigger className="-ml-1 shrink-0" />
                    {/* <div className="hidden sm:block">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div> */}
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-6 bg-sidebar-border/30" />

                {/* Logo */}
                <Link href={dashboard()} prefetch className="shrink-0 hover:opacity-80 transition-opacity">
                    <AppLogo />
                </Link>
            </div>

            {/* Right side: User Menu */}
            <div className="shrink-0">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 px-2 h-10 group hover:bg-accent"
                        >
                            <UserInfo user={auth.user} />
                            <ChevronsUpDown className="size-4 opacity-50 group-data-[state=open]:opacity-100" />
                        </Button>
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
