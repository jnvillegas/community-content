import { Link, usePage } from '@inertiajs/react';
import {
    Home,
    Calendar,
    GraduationCap,
    User as UserIcon,
    Bell,
} from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { type PageProps } from '@/types';
import { dashboard } from '@/routes';
import { edit as profileEdit } from '@/routes/profile';
import { index as notificationsIndex } from '@/routes/notifications';

export function AppNavUser() {
    const isMobile = useIsMobile();
    const { auth } = usePage<PageProps>().props;
    const userRoles = auth.roles || [];
    const isAdmin = userRoles.includes('admin');

    if (!isMobile || isAdmin) return null;

    return (
        <nav className='fixed flex items-center justify-around bottom-0 z-50 w-full h-16 bg-background border-t border-border px-4 pb-2 pt-2'>
            <Link href={dashboard()} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                <Home className="w-5 h-5" />
                <span className="text-[10px] font-medium">Inicio</span>
            </Link>

            <Link href="/events" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                <Calendar className="w-5 h-5" />
                <span className="text-[10px] font-medium">Eventos</span>
            </Link>

            <Link href="/academy" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                <GraduationCap className="w-5 h-5" />
                <span className="text-[10px] font-medium">Cursos</span>
            </Link>

            <Link href={notificationsIndex().url} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground relative">
                <div className="relative">
                    <Bell className="w-5 h-5" />
                    {auth.unread_notifications_count > 0 && (
                        <div className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white border border-white dark:border-gray-950">
                            {auth.unread_notifications_count > 9 ? '9+' : auth.unread_notifications_count}
                        </div>
                    )}
                </div>
                <span className="text-[10px] font-medium">Alertas</span>
            </Link>

            <Link href={profileEdit()} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground">
                <UserIcon className="w-5 h-5" />
                <span className="text-[10px] font-medium">Perfil</span>
            </Link>
        </nav>
    );
}
