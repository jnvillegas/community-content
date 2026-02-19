import { Link } from '@inertiajs/react';

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
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
    const { state } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton className={state === 'collapsed' ? 'justify-center' : ''}>
                    {state !== 'collapsed' && <span>{title}</span>}
                    {state !== 'collapsed' && <ChevronRight className="ml-auto h-4 w-4" />}
                    {state === 'collapsed' && <ChevronRight className="h-4 w-4" />}
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
                                    {state !== 'collapsed' && <span>{item.title}</span>}
                                </Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
