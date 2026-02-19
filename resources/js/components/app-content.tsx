import * as React from 'react';

import { cn } from '@/lib/utils';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({
    variant = 'header',
    children,
    className,
    ...props
}: AppContentProps) {
    if (variant === 'sidebar') {
        return (
            <main
                className={cn(
                    'flex-1 overflow-y-auto bg-background',
                    className
                )}
                {...props}
            >
                {children}
            </main>
        );
    }

    return (
        <main
            className={cn(
                'mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl',
                className
            )}
            {...props}
        >
            {children}
        </main>
    );
}
