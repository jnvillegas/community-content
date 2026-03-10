import { Link, router } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
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

interface NavMainProps {
    items: NavItem[];
    openItem: string | null;
    setOpenItem: (title: string | null) => void;
}

export function NavMain({ items = [], openItem, setOpenItem }: NavMainProps) {
    const { urlIsActive, currentUrl } = useActiveUrl();
    const { state, setOpen, isMobile } = useSidebar();
    const showLabels = state !== 'collapsed' || isMobile;
    const lastUrlRef = useRef<string | null>(null);

    // Sync open state only when the current URL path changes
    useEffect(() => {
        if (lastUrlRef.current !== currentUrl) {
            items.forEach((item) => {
                if (item.items?.some((sub) => urlIsActive(sub.href))) {
                    setOpenItem(item.title);
                }
            });
            lastUrlRef.current = currentUrl;
        }
    }, [items, currentUrl, urlIsActive, setOpenItem]);

    return (
        <SidebarMenu>
            {items.map((item) => {
                const subItems = item.items || [];
                const hasSubItems = subItems.length > 0;
                const isItemOpen = openItem === item.title;

                if (hasSubItems) {
                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            open={isItemOpen}
                            onOpenChange={(isOpen) => setOpenItem(isOpen ? item.title : null)}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        onClick={() => {
                                            if (state === 'collapsed') {
                                                setOpen(true);
                                                if (subItems.length > 0) {
                                                    router.visit(subItems[0].href);
                                                }
                                            }
                                        }}
                                    >
                                        {item.icon && <item.icon />}
                                        {showLabels && (
                                            <>
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </>
                                        )}
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {subItems.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton
                                                    asChild={!subItem.onClick}
                                                    isActive={urlIsActive(subItem.href)}
                                                    onClick={subItem.onClick}
                                                >
                                                    {subItem.onClick ? (
                                                        <span className="flex w-full items-center text-left">
                                                            {subItem.title}
                                                        </span>
                                                    ) : (
                                                        <Link href={subItem.href}>
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    )
                                                    }
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                }

                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild={!item.onClick}
                            isActive={urlIsActive(item.href)}
                            tooltip={item.title}
                            onClick={item.onClick}
                        >
                            {item.onClick ? (
                                <>
                                    {item.icon && <item.icon />}
                                    {showLabels && <span>{item.title}</span>}
                                </>
                            ) : (
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    {showLabels && <span>{item.title}</span>}
                                </Link>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );
}
