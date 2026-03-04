import { Link, usePage } from '@inertiajs/react';
import {
    FileText,
    Play as VideoIcon,
    HomeIcon,
    Calendar1Icon,
} from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { type PageProps } from '@/types';
import { dashboard } from '@/routes';

export function AppNavUser() {
    const isMobile = useIsMobile();
    const { auth } = usePage<PageProps>().props;
    const userRoles = auth.roles || [];
    const isAdmin = userRoles.includes('admin');

    if (!isMobile || isAdmin) return null;

    return (
        <nav className='fixed flex items-center justify-around bottom-0 z-50 w-full h-16 bg-background border-t border-border px-4 pb-2 pt-2'>
            <Link href={dashboard()} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                <HomeIcon className="w-5 h-5" />
                <span className="text-[10px] font-medium">Inicio</span>
            </Link>
            <Link href="/events" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                <Calendar1Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">Eventos</span>
            </Link>
            <Link href="/articles" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                <FileText className="w-5 h-5" />
                <span className="text-[10px] font-medium">Artículos</span>
            </Link>
            <Link href="/videos" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                <VideoIcon className="w-5 h-5" />
                <span className="text-[10px] font-medium">Videos</span>
            </Link>
        </nav>
    );
}
