import { type PropsWithChildren } from 'react';

import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    header,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; header?: React.ReactNode }>) {
    return (
        <AppShell variant="sidebar">
            {/* Header fijo en la parte superior */}
            {header || <AppSidebarHeader breadcrumbs={breadcrumbs} />}

            {/* Contenedor con sidebar y contenido principal - pt-16 para hacer espacio al header fijo */}
            <div className="flex flex-1 overflow-hidden pt-16">
                {/* Sidebar fijo a la izquierda */}
                <AppSidebar />

                {/* Contenido principal scrollable - con margin dinámico para el sidebar fixed */}
                <AppContent variant="sidebar" className="peer-data-[state=expanded]:ml-4 peer-data-[state=collapsed]:ml-4 transition-[margin-left] duration-200 ease-linear">
                    {children}
                </AppContent>
            </div>
        </AppShell>
    );
}
