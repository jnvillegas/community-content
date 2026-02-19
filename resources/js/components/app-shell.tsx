import { usePage } from '@inertiajs/react';

import { SidebarProvider } from '@/components/ui/sidebar';
import { type SharedData } from '@/types';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const sidebarOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col">{children}</div>
        );
    }

    // Sidebar layout: estructura completa con header fijo y sidebar fijo
    return (
        <SidebarProvider defaultOpen={sidebarOpen}>
            <div className="flex h-screen w-full flex-col">
                {children}
            </div>
        </SidebarProvider>
    );
}
