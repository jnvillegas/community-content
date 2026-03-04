import { Link } from '@inertiajs/react';
import {
    Bookmark,
    BookOpen,
    Calendar,
    Crown,
    FileText,
    GraduationCap,
    Image,
    Key,
    LayoutGrid,
    MessageCircle,
    Shield,
    Users,
    Play as VideoIcon,
    Tags,
    Plus,
    Home,
    UserIcon,
    HomeIcon,
    Calendar1Icon,
} from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';

export function AppNavUser() {
    const isMobile = useIsMobile();

    if (!isMobile) return null
    return (
        <nav className='fixed flex items-center justify-center gap-4 bottom-0 z-50 w-full h-12 bg-black'>
            <HomeIcon></HomeIcon>
            <Calendar1Icon></Calendar1Icon>
            <FileText></FileText>
            <VideoIcon></VideoIcon>
        </nav>
    );
}
