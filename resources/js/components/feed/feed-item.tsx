import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Calendar, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from '@inertiajs/react';

interface Activity {
    id: number;
    user: {
        id: number;
        name: string;
        avatar?: string;
    };
    type: string;
    subject_type: string;
    subject: any;
    created_at: string;
}

interface FeedItemProps {
    activity: Activity;
}

export default function FeedItem({ activity }: FeedItemProps) {
    const { user, subject, type, created_at } = activity;

    // Determine content type
    const isEvent = type === 'created_event' || activity.subject_type.includes('Event');

    if (!subject) return null;

    return (
        <Card className="group relative border-none bg-black overflow-hidden mb-12 h-[380px] md:h-[400px] rounded-[3rem] shadow-2xl transition-all duration-700 hover:scale-[1.01] hover:shadow-black/40">
            {/* Background Image / Placeholder */}
            <div className="absolute inset-0 z-0">
                {subject.cover_image ? (
                    <img
                        src={subject.cover_image}
                        alt={subject.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900" />
                )}
                {/* Visual Depth Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 z-10" />
            </div>

            {/* Content Layer */}
            <div className="relative z-20 h-full flex flex-col p-8 pointer-events-none">
                {/* Top Row: User & Heart */}
                <div className="flex items-start justify-between pointer-events-auto">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-2 border-white/20 backdrop-blur-lg shadow-xl">
                            <AvatarImage src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                            <AvatarFallback className="bg-white/10 text-white text-xs">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-[12px] font-bold text-white/90 drop-shadow-md">
                            {user.name} • {formatDistanceToNow(new Date(created_at), { addSuffix: true, locale: es })}
                        </span>
                    </div>

                    <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:text-red-400 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all active:scale-90">
                        <Heart className="h-5 w-5" />
                    </Button>
                </div>

                {/* Bottom Content Area */}
                <div className="mt-auto space-y-6 pointer-events-auto">
                    {/* Title & Description */}
                    <div className="space-y-3">
                        <h3 className="text-3xl md:text-4xl font-black text-white leading-none tracking-tighter uppercase drop-shadow-2xl">
                            {subject.title}
                        </h3>
                        {subject.description && (
                            <p className="text-white/60 leading-relaxed text-sm max-w-[90%] font-medium drop-shadow-md line-clamp-2">
                                {subject.description || subject.excerpt}
                            </p>
                        )}
                    </div>

                    {/* Final Row: Stats & Action */}
                    <div className="flex items-end justify-between gap-6 pt-5 border-t border-white/5">
                        {/* 3 Detail Columns (Balanced for 400px) */}
                        <div className="flex gap-10">
                            {isEvent && subject.start_date && (
                                <div className="flex flex-col gap-1">
                                    <span className="text-white font-black text-lg md:text-xl leading-none">
                                        {format(new Date(subject.start_date), "d MMM", { locale: es })}
                                    </span>
                                    <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Fecha</span>
                                </div>
                            )}

                            <div className="flex flex-col gap-1">
                                <span className="text-white font-black text-lg md:text-xl leading-none truncate max-w-[120px]">
                                    {isEvent ? (subject.location || 'Online') : 'Artículo'}
                                </span>
                                <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">
                                    {isEvent ? 'Lugar' : 'Tipo'}
                                </span>
                            </div>

                            <div className="hidden sm:flex flex-col gap-1">
                                <span className="text-white font-black text-lg md:text-xl leading-none">
                                    {isEvent ? 'Presencial' : 'Comunidad'}
                                </span>
                                <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Estado</span>
                            </div>
                        </div>

                        {/* White Pill Button */}
                        <Button asChild className="bg-white hover:bg-white/90 text-black font-black rounded-full px-8 py-7 h-auto text-base shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all hover:translate-y-[-2px] active:translate-y-[1px]">
                            <Link href={isEvent ? `/events/${subject.slug}` : `/articles/${subject.slug}`}>
                                {isEvent ? 'Inscribirme' : 'Ver más'}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
