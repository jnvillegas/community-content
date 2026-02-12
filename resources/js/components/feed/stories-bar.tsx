import { useState, useRef, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Plus, Heart, Calendar, MessageCircle, Share2, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventModal from './EventModal';

interface EventStory {
    id: number;
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    formatted_date?: string;
    slug: string;
    cover_image?: string;
    color: string;
    likes_count: number;
    is_liked: boolean;
    comments: any[];
    author?: {
        name: string;
        avatar: string;
    };
}

interface StoriesBarProps {
    events: EventStory[];
}

export default function StoriesBar({ events }: StoriesBarProps) {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [draggedDistance, setDraggedDistance] = useState(0);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const velocityRef = useRef(0);
    const velocitySamplesRef = useRef<number[]>([]);
    const lastXRef = useRef(0);
    const lastTimeRef = useRef(0);
    const animationFrameRef = useRef<number | null>(null);

    const selectedEvent = events.find(e => e.id === selectedEventId) || null;

    const stopInertia = () => {
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
        setIsAnimating(false);
    };

    const startInertia = () => {
        if (!scrollContainerRef.current) return;

        setIsAnimating(true);
        const friction = 0.992; // Fricción muy baja para planeo suave
        let lastTimestamp = performance.now();

        const step = (now: number) => {
            if (!scrollContainerRef.current || Math.abs(velocityRef.current) < 0.005) {
                stopInertia();
                return;
            }

            const dt = Math.min(now - lastTimestamp, 32);
            scrollContainerRef.current.scrollLeft -= velocityRef.current * dt;
            velocityRef.current *= Math.pow(friction, dt / 16);

            lastTimestamp = now;
            animationFrameRef.current = requestAnimationFrame(step);
        };

        animationFrameRef.current = requestAnimationFrame(step);
    };

    // Mover listeners a window durante el drag para mayor precisión y evitar bloqueos
    useEffect(() => {
        if (!isDragging) return;

        const handleWindowMouseMove = (e: MouseEvent) => {
            if (!scrollContainerRef.current) return;
            const x = e.pageX - scrollContainerRef.current.offsetLeft;
            const now = performance.now();
            const dt = now - lastTimeRef.current;

            if (dt > 0) {
                const dx = e.pageX - lastXRef.current;
                const currentVelocity = dx / dt;

                velocitySamplesRef.current.push(currentVelocity);
                if (velocitySamplesRef.current.length > 8) { // Más samples para estabilidad
                    velocitySamplesRef.current.shift();
                }
            }

            // Sensibilidad 1:1 para que siga exactamente la mano sin saltos
            const walk = (x - startX);
            scrollContainerRef.current.scrollLeft = scrollLeft - walk;
            setDraggedDistance(Math.abs(x - startX));

            lastXRef.current = e.pageX;
            lastTimeRef.current = now;
        };

        const handleWindowMouseUp = () => {
            setIsDragging(false);

            if (velocitySamplesRef.current.length > 0) {
                const sum = velocitySamplesRef.current.reduce((a, b) => a + b, 0);
                velocityRef.current = (sum / velocitySamplesRef.current.length) * 1.6; // Boost de inercia
            }

            if (Math.abs(velocityRef.current) > 0.1) {
                startInertia();
            }
        };

        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleWindowMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
        };
    }, [isDragging, startX, scrollLeft]);


    const handleCardClick = (id: number) => {
        if (draggedDistance < 6 && !isAnimating) {
            setSelectedEventId(id);
        }
    };

    const handleLike = (e: React.MouseEvent, eventId: number) => {
        e.stopPropagation();
        router.post(`/events/${eventId}/like`, {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;

        stopInertia();
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        setDraggedDistance(0);

        lastXRef.current = e.pageX;
        lastTimeRef.current = performance.now();
        velocityRef.current = 0;
        velocitySamplesRef.current = [];
    };

    const handleShare = (e: React.MouseEvent, event: EventStory) => {
        e.stopPropagation();
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

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            stopInertia(); // IMPORTANTE: Detener inercia para que las flechas funcionen
            const scrollAmount = 370; // 350px card + 20px gap
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="group relative mb-10 w-full overflow-hidden">
            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 z-30 flex items-center bg-gradient-to-r from-[#F8F9FA] via-[#F8F9FA]/50 to-transparent pr-12 opacity-0 transition-opacity group-hover:opacity-100 dark:from-gray-950 dark:via-gray-950/50">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-50 dark:bg-gray-900"
                    onClick={() => scroll('left')}
                >
                    <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </Button>
            </div>

            <div className="absolute inset-y-0 right-0 z-30 flex items-center bg-gradient-to-l from-[#F8F9FA] via-[#F8F9FA]/50 to-transparent pl-12 opacity-0 transition-opacity group-hover:opacity-100 dark:from-gray-950 dark:via-gray-950/50">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-50 dark:bg-gray-900"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </Button>
            </div>

            {/* Scroll Container */}
            <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                className={`flex w-full gap-5 overflow-x-auto pb-4 scrollbar-hide select-none ${(isDragging || isAnimating) ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'
                    }`}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    scrollBehavior: (isDragging || isAnimating) ? 'auto' : 'smooth'
                }}
            >
                {/* CSS to hide scrollbar in Chrome/Safari */}
                <style>{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>

                {/* Add Event */}
                <div className="snap-start">
                    <Link href="/admin/events/create" className="group/card relative flex h-[350px] w-[350px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm transition-all hover:scale-[1.01] dark:bg-gray-900 dark:border-gray-800">
                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-gray-900/10 to-transparent"></div>
                        <div className="flex h-full flex-col items-center justify-center gap-3">
                            <div className="flex size-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform group-hover/card:scale-110 dark:bg-blue-900/30">
                                <Plus className="h-8 w-8" />
                            </div>
                            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Add Event</span>
                        </div>
                    </Link>
                </div>

                {events.map((event) => (
                    <div
                        key={event.id}
                        className="snap-start relative h-[350px] w-[350px] shrink-0 cursor-pointer overflow-hidden rounded-3xl shadow-md transition-all hover:scale-[1.01]"
                        onClick={() => handleCardClick(event.id)}
                    >
                        {/* Background Image */}
                        <img
                            src={event.cover_image || `https://picsum.photos/seed/event${event.id}/400/400`}
                            className="absolute h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                            alt={event.title}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 opacity-80 transition-opacity hover:opacity-95"></div>

                        {/* Top Left: Author Info */}
                        <div className="absolute top-5 left-5 z-20 flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full border-2 border-white/80 overflow-hidden shadow-sm bg-gray-500">
                                <img
                                    src={event.author?.avatar}
                                    alt={event.author?.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col text-white shadow-black drop-shadow-md">
                                <span className="text-base font-bold leading-tight">{event.author?.name}</span>
                                <span className="text-xs text-center text-white/80">{event.location}</span>
                            </div>
                        </div>

                        {/* Right Column: Actions */}
                        <div className="absolute right-5 top-8 z-20 flex flex-col items-center gap-4">
                            {/* Like Button */}
                            <button
                                className="flex flex-col items-center group/btn focus:outline-none"
                                onClick={(e) => handleLike(e, event.id)}
                            >
                                <Heart className={`w-6 h-6 mb-1 filter drop-shadow-lg transition-transform group-hover/btn:scale-110 ${event.is_liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                                <span className="text-xs font-bold text-white drop-shadow-md">{event.likes_count}</span>
                            </button>

                            {/* Comment Button */}
                            <button className="flex flex-col items-center group/btn focus:outline-none">
                                <MessageCircle className="w-6 h-6 mb-1 text-white filter drop-shadow-lg transition-transform group-hover/btn:scale-110" />
                                <span className="text-xs font-bold text-white drop-shadow-md">{event.comments?.length || 100}</span>
                            </button>

                            {/* Share Button */}
                            <button
                                className="flex flex-col items-center group/btn focus:outline-none"
                                onClick={(e) => handleShare(e, event)}
                            >
                                <Share2 className="w-6 h-6 text-white filter drop-shadow-lg transition-transform group-hover/btn:scale-110" />
                            </button>
                        </div>

                        {/* Bottom Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 pointer-events-none">
                            <div className="w-[220px] whitespace-normal">
                                <h3 className="text-xl font-bold text-white leading-tight mb-4 drop-shadow-md pointer-events-auto">
                                    {event.title}
                                </h3>
                            </div>

                            {/* Meta Bar */}
                            <div className="flex items-center justify-between border-t border-white/20 pt-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                                    <Calendar className="w-4 h-4" />
                                    <span>{event.formatted_date}</span>
                                </div>

                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white transition-all hover:bg-white/30 hover:scale-110 pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MapPin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}

                {events.length === 0 && (
                    <div className="flex h-[350px] w-[350px] items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400">
                        <span className="text-sm">No upcoming events</span>
                    </div>
                )}
            </div>

            <EventModal
                event={selectedEvent as any}
                isOpen={!!selectedEventId}
                onClose={() => setSelectedEventId(null)}
            />
        </div>
    );
}

