import { Link } from '@inertiajs/react';

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useActiveUrl } from '@/hooks/use-active-url';
import { type NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { urlIsActive } = useActiveUrl();

    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild={!item.onClick}
                        isActive={urlIsActive(item.href)}
                        tooltip={{ children: item.title }}
                        onClick={item.onClick}
                    >
                        {item.onClick ? (
                            <div className="flex w-full items-center">
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </div>
                        ) : (
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        )}
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}
