import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Event, PageProps } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Calendar,
    MapPin,
    Clock,
    CheckCircle2,
    AlertCircle,
    Share2,
    ArrowLeft,
    Heart,
    MessageCircle,
    Send
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState, useEffect } from 'react';

interface Props extends PageProps {
    event: Event & {
        likes_count?: number;
        is_liked?: boolean;
        comments?: any[];
        comments_count?: number;
    };
    registrations_count: number;
    can_register: {
        can: boolean;
        reason: string | null;
    };
    is_registered: boolean;
}

export default function Show({ event: initialEvent, registrations_count, can_register, is_registered, auth }: Props) {
    const page = usePage<Props>();
    const { post, delete: destroy, processing } = useForm({});

    const [isLiked, setIsLiked] = useState(initialEvent.is_liked || false);
    const [likesCount, setLikesCount] = useState(initialEvent.likes_count || 0);
    const [comments, setComments] = useState(initialEvent.comments || []);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    // Update state when page.props.event changes
    useEffect(() => {
        const updatedEvent = page.props.event;
        setIsLiked(updatedEvent.is_liked || false);
        setLikesCount(updatedEvent.likes_count || 0);
        setComments(updatedEvent.comments || []);
    }, [page.props.event]);

    const handleRegister = () => {
        post(`/events/${initialEvent.id}/register`, {
            preserveScroll: true,
            onSuccess: () => {
                // Toast handled by flash message usually, but we can add local too
            }
        });
    };

    const handleUnregister = () => {
        if (confirm('¿Estás seguro de que quieres cancelar tu registro?')) {
            destroy(`/events/${initialEvent.id}/unregister`, {
                preserveScroll: true,
            });
        }
    };

    const handleLike = () => {
        router.post(`/events/${initialEvent.id}/like`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Data will update via usePage
            }
        });
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setSubmittingComment(true);
        router.post(`/events/${initialEvent.id}/comments`,
            { content: commentText },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setCommentText('');
                    setSubmittingComment(false);
                }
            }
        );
    };

    const event = page.props.event;

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'EEEE, d MMMM yyyy, HH:mm', { locale: es });
    };

    const isVirtual = event.type === 'WEBINAR' || (event.type as string) === 'LIVE';

    const breadcrumbs = [
        { title: 'Home', href: '/dashboard' },
        { title: 'Community Events', href: '/events' },
        { title: event.title, href: `/events/${event.slug}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.title} />

            <div className="min-h-screen ">
                {/* Hero Banner */}
                <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden bg-gray-900">
                    <img
                        src={event.cover_image || '/images/event-placeholder.jpg'}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
                        <Button variant="ghost" className="text-white hover:bg-white/20 gap-2 backdrop-blur-sm" asChild>
                            <Link href="/events">
                                <ArrowLeft className="w-4 h-4" />
                                Volver
                            </Link>
                        </Button>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 text-white">
                        <div className="max-w-7xl mx-auto w-full">
                            <div className="flex flex-wrap gap-2 mb-6">
                                <Badge className="bg-[#1d9bf0] hover:bg-[#1a87cb] text-white border-none text-sm font-bold py-1.5 px-4">
                                    {event.type}
                                </Badge>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                                {event.title}
                            </h1>
                            <div className="flex flex-col flex-wrap md:flex-row gap-6 md:gap-10 text-gray-100 font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-300 uppercase tracking-widest">Fecha</p>
                                        <p>{format(new Date(event.start_date), 'd MMM yyyy', { locale: es })}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-300 uppercase tracking-widest">Hora</p>
                                        <p>{format(new Date(event.start_date), 'HH:mm', { locale: es })} hs</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                        {isVirtual ? <Clock className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-300 uppercase tracking-widest">Ubicación</p>
                                        <p>{isVirtual ? 'Online' : (event.location || 'Por definir')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About Section */}
                            <Card className="border border-gray-200 dark:border-white/10 shadow-lg bg-white dark:bg-zinc-900/50 overflow-hidden">
                                <CardContent className="p-6 md:p-10">
                                    <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Acerca del evento</h2>
                                    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-lg">
                                        {event.description}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Engagement Section */}
                            <Card className="border border-gray-200 dark:border-white/10 shadow-lg bg-white dark:bg-zinc-900/50 overflow-hidden">
                                <CardContent className="p-6 md:p-10">
                                    <div className="flex items-center gap-6 md:gap-10 pb-6 border-b border-gray-200 dark:border-white/10">
                                        <button
                                            onClick={handleLike}
                                            className={`flex items-center gap-2 transition-all ${isLiked
                                                ? 'text-red-500 scale-105'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
                                                }`}
                                        >
                                            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                                            <span className="font-bold text-lg">{likesCount}</span>
                                        </button>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <MessageCircle className="w-6 h-6" />
                                            <span className="font-bold text-lg">{comments.length}</span>
                                        </div>
                                    </div>

                                    {/* Comments Section */}
                                    <h3 className="text-2xl font-bold mt-8 mb-6 text-zinc-900 dark:text-white">Comentarios</h3>

                                    {/* Comment Form */}
                                    {auth.user ? (
                                        <form onSubmit={handleCommentSubmit} className="mb-8">
                                            <div className="flex gap-4">
                                                <Avatar className="w-10 h-10 flex-shrink-0">
                                                    <AvatarImage src={auth.user.avatar} />
                                                    <AvatarFallback>{auth.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-grow space-y-3">
                                                    <Textarea
                                                        placeholder="Escribe un comentario..."
                                                        value={commentText}
                                                        onChange={(e) => setCommentText(e.target.value)}
                                                        className="resize-none bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10"
                                                    />
                                                    <div className="flex justify-end">
                                                        <Button
                                                            type="submit"
                                                            disabled={!commentText.trim() || submittingComment}
                                                            className="gap-2 bg-[#1d9bf0] hover:bg-[#1a87cb]"
                                                        >
                                                            <Send className="w-4 h-4" />
                                                            {submittingComment ? 'Enviando...' : 'Comentar'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                            <p className="text-sm text-blue-900 dark:text-blue-200">
                                                <Link href="/login" className="font-bold hover:underline">Inicia sesión</Link> para comentar
                                            </p>
                                        </div>
                                    )}

                                    {/* Comments List */}
                                    {comments.length > 0 ? (
                                        <div className="space-y-6">
                                            {comments.map((comment) => (
                                                <div key={comment.id} className="flex gap-4 pb-6 border-b border-gray-200 dark:border-white/10 last:border-0 last:pb-0">
                                                    <Avatar className="w-10 h-10 flex-shrink-0">
                                                        <AvatarImage src={comment.user?.avatar} />
                                                        <AvatarFallback>{comment.user?.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-grow min-w-0">
                                                        <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4">
                                                            <p className="font-bold text-sm text-gray-900 dark:text-white">
                                                                {comment.user?.name}
                                                            </p>
                                                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 whitespace-pre-wrap break-words">
                                                                {comment.content}
                                                            </p>
                                                        </div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                            {comment.created_at && format(
                                                                new Date(comment.created_at),
                                                                'd MMM yyyy HH:mm',
                                                                { locale: es }
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                            <MessageCircle className="w-12 h-12 mx-auto opacity-20 mb-3" />
                                            <p className="font-medium">No hay comentarios aún</p>
                                            <p className="text-sm">¡Sé el primero en comentar!</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Registration Card */}
                            <Card className="border border-gray-200 dark:border-white/10 shadow-lg top-24 bg-white dark:bg-zinc-900/50 overflow-hidden">
                                <CardContent className="p-6 md:p-8 space-y-6">
                                    {/* Status Box */}
                                    {is_registered ? (
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 flex flex-col items-center text-center gap-3">
                                            <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-800/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                                <CheckCircle2 className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-lg">¡Ya estás registrado!</h3>
                                                <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
                                                    Te enviaremos un recordatorio antes del evento.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 bg-green-50 dark:bg-green-900/10 rounded-xl p-4">
                                            <div className="flex justify-between items-center gap-2">
                                                {/* <span className="text-sm font-bold text-gray-600 dark:text-gray-300">Precio</span> */}
                                                <span className="text-sm font-black text-green-500">Registro Gratuito</span>
                                            </div>
                                            {event.max_participants && (
                                                <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                                                    {Math.max(0, event.max_participants - registrations_count)} lugares disponibles
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        {!auth.user ? (
                                            <Button className="w-full font-bold bg-[#1d9bf0] hover:bg-[#1a87cb] text-white" size="lg" asChild>
                                                <Link href="/login">Inicia sesión para registrarte</Link>
                                            </Button>
                                        ) : is_registered ? (
                                            <Button
                                                variant="outline"
                                                className="w-full border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20 font-bold"
                                                onClick={handleUnregister}
                                                disabled={processing}
                                            >
                                                Cancelar registro
                                            </Button>
                                        ) : can_register.can ? (
                                            <Button
                                                className="w-full font-bold bg-[#1d9bf0] hover:bg-[#1a87cb] text-white shadow-lg shadow-[#1d9bf0]/30"
                                                size="lg"
                                                onClick={handleRegister}
                                                disabled={processing}
                                            >
                                                {processing ? 'Registrando...' : 'Registrarse ahora'}
                                            </Button>
                                        ) : (
                                            <div className="space-y-3">
                                                <Button disabled className="w-full" variant="secondary" size="lg">
                                                    Registro cerrado
                                                </Button>
                                                {can_register.reason && (
                                                    <p className="text-xs text-center text-red-500 dark:text-red-400 font-medium flex items-center justify-center gap-1">
                                                        <AlertCircle className="w-3 h-3" />
                                                        {can_register.reason}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <Separator className="dark:bg-white/10" />

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400 font-medium">Asistirán</span>
                                            <span className="font-bold text-gray-900 dark:text-white">{registrations_count}</span>
                                        </div>
                                        {event.max_participants && (
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-[#1d9bf0] h-2 rounded-full transition-all"
                                                    style={{
                                                        width: `${Math.min((registrations_count / event.max_participants) * 100, 100)}%`
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Share Button */}
                            <Button
                                variant="outline"
                                className="w-full gap-2 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-zinc-800 font-bold"
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: event.title,
                                            url: window.location.href
                                        }).catch(() => { });
                                    } else {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert('Enlace copiado al portapapeles');
                                    }
                                }}
                            >
                                <Share2 className="w-4 h-4" />
                                Compartir evento
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
