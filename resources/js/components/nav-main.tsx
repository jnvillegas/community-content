import { Link } from '@inertiajs/react';

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useActiveUrl } from '@/hooks/use-active-url';
import { type NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { urlIsActive } = useActiveUrl();
    const { state } = useSidebar();

    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild={!item.onClick}
                        isActive={urlIsActive(item.href)}
                        tooltip={{ children: item.title }}
                        onClick={item.onClick}
                        className={state === "collapsed" ? "justify-center" : ""}
                    >
                        {item.onClick ? (
                            <div className={` flex items-center gap-1 ${state === "collapsed" ? "justify-center" : ""}`}>
                                {item.icon && <item.icon className='w-4 h-4 m-0' />}
                                {state !== "collapsed" && <span>{item.title}</span>}
                            </div>
                        ) : (
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                {state !== "collapsed" && <span>{item.title}</span>}
                            </Link>
                        )}
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}
