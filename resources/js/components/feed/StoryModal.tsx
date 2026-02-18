import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle, Send, X, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";

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
}

export default function StoryModal({ story, isOpen, onClose }: StoryModalProps) {
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { auth } = usePage().props as any;

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [story?.id, isOpen]);

    const images = story?.images && story.images.length > 0 ? story.images : (story ? [story.content_url] : []);

    const nextImage = () => {
        if (!story) return;
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex((prev) => prev + 1);
        } else {
            onClose();
        }
    };

    const prevImage = () => {
        if (!story) return;
        if (currentImageIndex > 0) {
            setCurrentImageIndex((prev) => prev - 1);
        }
    };

    // Auto-advance logic
    useEffect(() => {
        if (!isOpen || !story) return;

        const timer = setTimeout(() => {
            nextImage();
        }, 5000); // 5 seconds per image

        return () => clearTimeout(timer);
    }, [currentImageIndex, isOpen, story?.id]);

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
                            />
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="absolute top-6 left-0 right-0 z-50 flex items-center justify-between px-4 text-white">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white/80">
                            <AvatarImage src={story.author.avatar} />
                            <AvatarFallback>{story.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold leading-none drop-shadow-md">{story.author.name}</span>
                            <span className="text-xs text-white/70 mt-1 drop-shadow-md">{story.created_at}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6 drop-shadow-md" />
                    </button>
                </div>

                {/* Content Image & Navigation Areas */}
                <div className="flex-1 relative bg-black flex items-center justify-center select-none">
                    <img
                        key={`${story.id}-${currentImageIndex}`}
                        src={images[currentImageIndex]}
                        alt={story.title}
                        className="w-full h-full object-contain animate-fade-in"
                    />

                    {/* Navigation Tap Areas */}
                    <div
                        className="absolute inset-y-0 left-0 w-1/3 cursor-pointer z-10"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    />
                    <div
                        className="absolute inset-y-0 right-0 w-1/3 cursor-pointer z-10"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    />
                </div>

                {/* Bottom Actions & Input */}
                <div className="p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent shrink-0 space-y-4 z-20">
                    <div className="flex items-center gap-3 text-white">
                        <form onSubmit={submitComment} className="flex-1 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 hover:bg-white/15 transition-colors">
                            <Input
                                placeholder="Send a message"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="flex-1 border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-white/60 text-sm h-auto"
                            />
                            {comment && (
                                <button type="submit" disabled={isSubmitting}>
                                    <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                                </button>
                            )}
                        </form>

                        <button onClick={toggleLike} className="p-1 hover:scale-110 transition-transform">
                            <Heart className={`w-7 h-7 filter drop-shadow-lg transition-all ${story.is_liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                        </button>

                        <button className="p-1 hover:scale-110 transition-transform">
                            <Share2 className="w-7 h-7 text-white filter drop-shadow-lg" />
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
