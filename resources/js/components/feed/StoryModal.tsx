import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle, Send, X, Share2, ArrowRightCircle, ArrowLeftCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Comment {
    id: number;
    user: {
        name: string;
        avatar: string;
    };
    content: string;
    created_at: string;
}

interface StoryData {
    id: number;
    title: string;
    description: string;
    content_url: string;
    images: string[];
    likes_count: number;
    is_liked: boolean;
    comments: Comment[];
    author: {
        name: string;
        avatar: string;
    };
    created_at: string;
}

interface StoryModalProps {
    story: StoryData | null;
    isOpen: boolean;
    onClose: () => void;
    onStoryEnd?: () => void;
    onStoryPrev?: () => void;
}

export default function StoryModal({ story, isOpen, onClose, onStoryEnd, onStoryPrev }: StoryModalProps) {
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { auth } = usePage().props as any;
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [isPressing, setIsPressing] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const touchStartXRef = useRef<number | null>(null);
    const lastTouchXRef = useRef<number | null>(null);
    const TOUCH_THRESHOLD = 50;

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [story?.id, isOpen]);

    const images = story?.images && story.images.length > 0 ? story.images : (story ? [story.content_url] : []);

    const nextImage = () => {
        if (!story) return;
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex((prev) => prev + 1);
        } else {
            // Story ended, trigger callback for next story or close
            if (onStoryEnd) {
                onStoryEnd();
            } else {
                onClose();
            }
        }
    };

    const prevImage = () => {
        if (!story) return;
        if (currentImageIndex > 0) {
            setCurrentImageIndex((prev) => prev - 1);
        } else {
            // Already on the first image of this story, go to previous story
            if (onStoryPrev) {
                onStoryPrev();
            }
        }
    };

    // Touch swipe handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        const t = e.touches[0];
        touchStartXRef.current = t.clientX;
        lastTouchXRef.current = t.clientX;
        setIsPressing(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const t = e.touches[0];
        lastTouchXRef.current = t.clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartXRef.current === null || lastTouchXRef.current === null) {
            touchStartXRef.current = null;
            lastTouchXRef.current = null;
            setIsPressing(false);
            return;
        }

        const dx = lastTouchXRef.current - touchStartXRef.current;
        if (Math.abs(dx) > TOUCH_THRESHOLD) {
            if (dx < 0) {
                // swipe left -> next
                nextImage();
            } else {
                // swipe right -> prev
                prevImage();
            }
        }

        touchStartXRef.current = null;
        lastTouchXRef.current = null;
        setIsPressing(false);
    };

    const handleMouseDown = () => {
        setIsPressing(true);
    };

    const handleMouseUp = () => {
        setIsPressing(false);
    };

    // Auto-advance logic
    useEffect(() => {
        if (!isOpen || !story || commentsOpen || isPressing || isInputFocused) return;

        const timer = setTimeout(() => {
            nextImage();
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentImageIndex, isOpen, story?.id, commentsOpen, isPressing, isInputFocused]);

    if (!story) return null;

    const toggleLike = () => {
        router.post(`/stories/${story.id}/like`, {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);
        router.post(`/stories/${story.id}/comments`, {
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

    console.log(story);


    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>

            <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0 bg-black border-none h-[90vh] flex flex-col focus:outline-none focus-visible:ring-0">

                <DialogHeader className="sr-only">
                    <DialogTitle>{story.title}</DialogTitle>
                    <DialogDescription>{story.description}</DialogDescription>
                </DialogHeader>

                {/* Progress Bars */}
                <div className="absolute top-2 left-0 right-0 z-50 flex gap-1 px-2">
                    {images.map((_, index) => (
                        <div key={index} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-white transition-all duration-100 ${index < currentImageIndex ? 'w-full' :
                                    index === currentImageIndex ? 'animate-progress-fast' : 'w-0'
                                    }`}
                                style={{
                                    animationPlayState: (commentsOpen || isPressing || isInputFocused) ? 'paused' : 'running'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="absolute top-6 left-0 right-0 z-50 flex items-center justify-between px-4 text-white">
                    <div className="flex items-center gap-3">
                        {/* <Avatar className="h-10 w-10 border-2 border-white/80">
                            <AvatarImage src={story.author.avatar} />
                            <AvatarFallback>{story.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold leading-none drop-shadow-md">{story.author.name}</span>
                            <span className="text-xs text-white/70 mt-1 drop-shadow-md">{story.created_at}</span>
                        </div> */}
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6 drop-shadow-md" />
                    </button>
                </div>

                {/* Content Image & Navigation Areas */}
                <div
                    className="flex-1 relative bg-black flex items-center justify-center select-none"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <img
                        key={`${story.id}-${currentImageIndex}`}
                        src={images[currentImageIndex]}
                        alt={story.title}
                        className="w-full h-full object-contain animate-fade-in"
                    />

                    {/* Navigation overlays: visible on desktop (md+), hidden on mobile. Buttons placed outside the image area with semi-transparent bg */}
                    <div className="hidden absolute w-full justify-between px-2 md:flex">
                        <button
                            aria-label="Anterior"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <ArrowLeftCircle className="w-7 h-7 text-white" />
                        </button>
                        <button
                            aria-label="Siguiente"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <ArrowRightCircle className="w-7 h-7 text-white" />
                        </button>
                    </div>

                    {/* Touch swipe area for mobile (hidden overlays above are md+) */}
                    <div className="absolute left-0 right-0 top-0 bottom-0 md:hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} />
                </div>

                {/* Bottom Actions & Input */}
                <div className="p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent shrink-0 space-y-4 z-20">
                    <div className="flex items-center gap-3 text-white">
                        <form onSubmit={submitComment} className="flex-1 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 hover:bg-white/15 transition-colors">
                            <Input
                                placeholder="Send Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                className="flex-1 border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-white/60 text-sm h-auto"
                            />
                            {comment && (
                                <button type="submit" disabled={isSubmitting}>
                                    <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                                </button>
                            )}
                        </form>

                        <button onClick={toggleLike} className="flex gap-2 items-center justify-center p-1 transition-transform min-w-[32px]">
                            <Heart className={`w-7 h-7 filter drop-shadow-lg transition-all ${story.is_liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                            {(story.likes_count ?? 0) >= 1 && (
                                <span className="text-[16px] font-bold leading-none drop-shadow-md">{story.likes_count}</span>
                            )}
                        </button>

                        <button
                            onClick={() => setCommentsOpen(true)}
                            className="flex flex gap-2 items-center justify-center p-1 transition-transform min-w-[32px]"
                            aria-label="Ver comentarios"
                        >
                            <MessageCircle className="flex w-7 h-7 text-white filter drop-shadow-lg" />
                            {story.comments && story.comments.length >= 1 && (
                                <span className="text-[16px] font-bold leading-none drop-shadow-md">{story.comments.length}</span>
                            )}
                        </button>
                    </div>
                </div>
                {/* Comments modal (inside story) */}
                <Dialog open={commentsOpen} onOpenChange={(open) => !open && setCommentsOpen(false)}>
                    <DialogContent className="sm:max-w-md top-[73%]">
                        <DialogHeader>
                            <DialogTitle>Comments</DialogTitle>
                            {/* <DialogDescription>
                                <div className="flex items-center gap-3 mt-2">
                                    <Heart className="w-5 h-5 text-red-500" />
                                    <span className="font-bold">{story.likes_count ?? 0} likes</span>
                                </div>
                            </DialogDescription> */}
                        </DialogHeader>

                        <div className="p-2">
                            <ScrollArea className="h-64">
                                <div className="space-y-4">
                                    {story.comments && story.comments.length > 0 ? (
                                        story.comments.map((c: Comment) => (
                                            <div key={c.id} className="flex items-start gap-3">
                                                <Avatar className="h-8 w-8">
                                                    {/* <AvatarImage src={c.user.avatar} /> */}
                                                    <AvatarFallback>{c.user.name?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium">{c.user.name}</span>
                                                        {/* <span className="text-xs text-muted-foreground">{format(new Date(c.created_at), 'd MMM yyyy HH:mm', { locale: es })}</span> */}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-1">{c.content}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center text-sm text-muted-foreground py-8">No hay comentarios aún</div>
                                    )}
                                </div>
                            </ScrollArea>

                            {/* Quick comment input inside comments modal */}
                            {auth.user && (
                                <form onSubmit={submitComment} className="mt-4 flex items-center gap-2">
                                    <Input
                                        placeholder="Send Comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    <Button type="submit" disabled={isSubmitting}>
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </DialogContent>
        </Dialog>
    );
}
