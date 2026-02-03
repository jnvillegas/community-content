import { Link } from '@inertiajs/react';

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useActiveUrl } from '@/hooks/use-active-url';
import { type NavItem } from '@/types';
import { ChevronRight } from 'lucide-react';

interface NavGroupWithSubProps {
    title: string;
    items: NavItem[];
}

export function NavGroupWithSub({ title, items = [] }: NavGroupWithSubProps) {
    const { urlIsActive } = useActiveUrl();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <span>{title}</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
                <SidebarMenuSub>
                    {items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                                asChild
                                isActive={urlIsActive(item.href)}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
