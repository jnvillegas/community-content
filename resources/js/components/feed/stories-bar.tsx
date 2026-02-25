import { useState, useRef, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Plus, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StoryModal from './StoryModal';
import CreateStoryModal from './CreateStoryModal';

interface Story {
    id: number;
    title: string;
    description: string;
    content_url: string;
    images: string[];
    likes_count: number;
    is_liked: boolean;
    comments: any[];
    author: {
        name: string;
        avatar: string;
    };
    created_at: string;
}

interface StoriesBarProps {
    stories: Story[];
}

export default function StoriesBar({ stories }: StoriesBarProps) {
    const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [draggedDistance, setDraggedDistance] = useState(0);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const velocityRef = useRef(0);
    const velocitySamplesRef = useRef<number[]>([]);
    const lastXRef = useRef(0);
    const lastTimeRef = useRef(0);
    const animationFrameRef = useRef<number | null>(null);

    const selectedStory = stories.find(s => s.id === selectedStoryId) || null;

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
        const friction = 0.992;
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
                if (velocitySamplesRef.current.length > 8) {
                    velocitySamplesRef.current.shift();
                }
            }

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
                velocityRef.current = (sum / velocitySamplesRef.current.length) * 1.6;
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
            setSelectedStoryId(id);
        }
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

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            stopInertia();
            const el = scrollContainerRef.current;
            const scrollAmount = Math.min(370, el.clientWidth * 0.9);
            el.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Scroll state for disabling buttons
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const update = () => {
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 1);
        };

        update();
        el.addEventListener('scroll', update, { passive: true });

        // Resize observer in case children change
        const ro = new ResizeObserver(update);
        ro.observe(el);

        window.addEventListener('resize', update);

        return () => {
            el.removeEventListener('scroll', update);
            ro.disconnect();
            window.removeEventListener('resize', update);
        };
    }, [stories]);

    // Touch handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!scrollContainerRef.current) return;
        stopInertia();
        setIsDragging(true);
        const touch = e.touches[0];
        setStartX(touch.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        setDraggedDistance(0);

        lastXRef.current = touch.pageX;
        lastTimeRef.current = performance.now();
        velocityRef.current = 0;
        velocitySamplesRef.current = [];
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        const touch = e.touches[0];
        const x = touch.pageX - scrollContainerRef.current.offsetLeft;
        const now = performance.now();
        const dt = now - lastTimeRef.current;

        if (dt > 0) {
            const dx = touch.pageX - lastXRef.current;
            const currentVelocity = dx / dt;
            velocitySamplesRef.current.push(currentVelocity);
            if (velocitySamplesRef.current.length > 8) velocitySamplesRef.current.shift();
        }

        const walk = x - startX;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
        setDraggedDistance(Math.abs(x - startX));

        lastXRef.current = touch.pageX;
        lastTimeRef.current = now;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (velocitySamplesRef.current.length > 0) {
            const sum = velocitySamplesRef.current.reduce((a, b) => a + b, 0);
            velocityRef.current = (sum / velocitySamplesRef.current.length) * 1.6;
        }
        if (Math.abs(velocityRef.current) > 0.1) startInertia();
    };

    return (
        <div className="group relative mb-10 w-full mx-auto overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Historias</h3>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={!canScrollLeft}
                        onClick={() => scroll('left')}
                        className={`h-10 w-10 rounded-full bg-white shadow-md dark:bg-background transition-opacity ${!canScrollLeft ? 'opacity-40 pointer-events-none' : 'hover:bg-gray-50'}`}
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={!canScrollRight}
                        onClick={() => scroll('right')}
                        className={`h-10 w-10 rounded-full bg-white shadow-md dark:bg-background transition-opacity ${!canScrollRight ? 'opacity-40 pointer-events-none' : 'hover:bg-gray-50'}`}
                    >
                        <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </Button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`flex w-full items-center gap-5 overflow-x-auto pb-4 scrollbar-hide select-none ${(isDragging || isAnimating) ? 'snap-none' : 'snap-x snap-mandatory'
                    }`}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    scrollBehavior: (isDragging || isAnimating) ? 'auto' : 'smooth'
                }}
            >
                <style>{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    @keyframes progress {
                        from { width: 0; }
                        to { width: 100%; }
                    }
                    .animate-progress {
                        animation: progress 5s linear forwards;
                    }
                `}</style>

                <div key="create" className="snap-start">
                    <div
                        onClick={() => setIsCreateModalOpen(true)}
                        className='flex items-center justify-center w-24 h-32 z-10 cursor-pointer border-dashed border-2 border-gray-500 rounded-2xl'
                    >
                        <Plus className='h-8 w-6 text-gray-500' />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">Add Story</p>
                </div>
                {stories.map((story) => (
                    <div key={story.id} className="snap-start">
                        <div
                            onClick={() => handleCardClick(story.id)}
                            className='flex items-center justify-center w-24 h-32 z-10 cursor-pointer rounded-2xl'
                        >
                            <img src={story.content_url} alt={story.title} className="w-full h-full object-cover rounded-2xl" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">{story.title}</p>
                    </div>
                ))}
            </div>

            <StoryModal
                story={selectedStory}
                isOpen={!!selectedStoryId}
                onClose={() => setSelectedStoryId(null)}
            />

            <CreateStoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
}
