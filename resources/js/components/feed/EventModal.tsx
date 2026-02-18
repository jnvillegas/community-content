import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Send, X, Share2, MapPin, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Comment {
    id: number;
    user: {
        name: string;
        avatar: string;
    };
    content: string;
    created_at: string;
}

interface EventData {
    id: number;
    title: string;
    description: string;
    location: string;
    cover_image: string;
    start_date: string;
    end_date: string;
    slug: string;
    color: string;
    likes_count: number;
    is_liked: boolean;
    comments: Comment[];
    author?: {
        name: string;
        avatar: string;
    };
}

interface EventModalProps {
    event: EventData | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { auth } = usePage().props as any;

    if (!event) return null;

    const toggleLike = () => {
        router.post(`/events/${event.id}/like`, {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleShare = () => {
        const shareData = {
            title: event.title,
            text: `Check out this event: ${event.title}!`,
            url: `${window.location.origin}/events/${event.slug}`,
        };

        if (navigator.share) {
            navigator.share(shareData).catch(() => { });
        } else {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);
        router.post(`/events/${event.id}/comments`, {
            content: comment
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setComment("");
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-5xl p-0 overflow-hidden gap-0 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 h-[85vh] flex flex-col md:flex-row">

                {/* Accessibility */}
                <DialogHeader className="sr-only">
                    <DialogTitle>{event.title}</DialogTitle>
                    <DialogDescription>{event.description}</DialogDescription>
                </DialogHeader>  {/* Close Button Mobile */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-50 p-2 bg-black/50 text-white rounded-full backdrop-blur-sm md:hidden"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side: Image */}
                <div className="md:w-[55%] h-56 md:h-full relative bg-black flex items-center justify-center">
                    <img
                        src={event.cover_image || "/images/placeholder-event.jpg"}
                        alt={event.title}
                        className="w-full h-full object-contain md:object-cover"
                    />
                </div>

                {/* Right Side: Social Content */}
                <div className="md:w-[45%] flex flex-col h-full bg-white dark:bg-gray-950 border-l border-gray-100 dark:border-gray-800">

                    {/* 1. Header: Author Info */}
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <img
                                    src={event.author?.avatar || auth.user.profile_photo_url}
                                    alt={event.author?.name || "Author"}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-none">
                                    {event.author?.name || "Comunidad"}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {event.location || "Ubicación"}
                                </span>
                            </div>
                        </div>
                        {/* Close Button Desktop */}
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hidden md:block">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* 2. Scrollable Content: Post Info & Comments */}
                    <ScrollArea className="flex-1">
                        <div className="p-4 space-y-6">

                            {/* Event Info */}
                            <div className="space-y-3">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
                                    {event.title}
                                </h2>

                                <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span>{format(new Date(event.start_date), "PPP", { locale: es })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                                        >
                                            Como llegar
                                        </a>
                                    </div>
                                </div>

                                {event.description && (
                                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                                        {event.description}
                                    </p>
                                )}

                                <div className="flex justify-center pt-2">
                                    <Button asChild variant="link" className="text-blue-600 dark:text-blue-400 font-bold hover:no-underline p-0 h-auto text-base translate-y-[-4px]">
                                        <Link href={`/events/${event.slug}`}>
                                            Ver detalles y registrarme →
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            {/* Comments List */}
                            <div className="space-y-4">
                                {event.comments.length > 0 ? (
                                    event.comments.map((comment) => (
                                        <div key={comment.id} className="flex gap-3 items-start">
                                            <Avatar className="w-8 h-8 shrink-0">
                                                <AvatarImage src={comment.user.avatar} />
                                                <AvatarFallback>{comment.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col text-sm">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-bold text-gray-900 dark:text-gray-100">{comment.user.name}</span>
                                                    <span className="text-xs text-gray-400">{comment.created_at}</span>
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300 leading-snug">{comment.content}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-sm text-gray-400">Sin comentarios aún.</p>
                                        <p className="text-xs text-gray-300">Sé el primero en comentar.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollArea>

                    {/* 3. Footer: Actions & Input */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shrink-0">
                        {/* Actions Row */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`hover:bg-transparent p-0 ${event.is_liked ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'}`}
                                    onClick={toggleLike}
                                >
                                    <Heart className={`w-7 h-7 ${event.is_liked ? 'fill-current' : ''}`} />
                                </Button>

                                <Button variant="ghost" size="icon" className="hover:bg-transparent p-0 text-gray-900 dark:text-gray-100">
                                    <MessageCircle className="w-7 h-7" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-transparent p-0 text-gray-900 dark:text-gray-100"
                                    onClick={handleShare}
                                >
                                    <Share2 className="w-7 h-7" />
                                </Button>
                            </div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {event.likes_count} Me gusta
                            </div>
                        </div>

                        {/* Input Row */}
                        <form onSubmit={submitComment} className="flex items-center gap-3 relative">
                            <Input
                                placeholder="Añade un comentario..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="flex-1 border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-400 text-sm h-auto py-2"
                            />
                            <Button
                                type="submit"
                                variant="ghost"
                                size="sm"
                                disabled={!comment.trim() || isSubmitting}
                                className="text-blue-600 font-semibold hover:text-blue-700 hover:bg-transparent px-0 disabled:opacity-50"
                            >
                                Publicar
                            </Button>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
