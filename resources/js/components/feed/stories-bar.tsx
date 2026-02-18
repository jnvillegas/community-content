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
            const scrollAmount = 370;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="group relative mb-10 w-full max-w-[780px] mx-auto overflow-hidden">
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

            <div className="absolute inset-y-0 right-0 z-30 flex items-center bg-gradient-l from-[#F8F9FA] via-[#F8F9FA]/50 to-transparent pl-12 opacity-0 transition-opacity group-hover:opacity-100 dark:from-gray-950 dark:via-gray-950/50">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-50 dark:bg-gray-900"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </Button>
            </div>

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

                <div className="snap-start">
                    <div
                        onClick={() => setIsCreateModalOpen(true)}
                        className="group/card relative flex h-[280px] w-[180px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-3xl bg-gray-100 border border-gray-200 shadow-sm transition-all hover:scale-[1.02] dark:bg-gray-900 dark:border-gray-800"
                    >
                        <div className="h-[70%] bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=creator"
                                className="w-full h-full object-cover"
                                alt="Creator"
                            />
                        </div>
                        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 flex size-10 items-center justify-center rounded-full bg-blue-600 text-white border-4 border-white dark:border-gray-900 transition-transform group-hover/card:scale-110">
                            <Plus className="h-6 w-6" />
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-end pb-4 bg-white dark:bg-gray-900">
                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">Crear historia</span>
                        </div>
                    </div>
                </div>

                {stories.map((story) => (
                    <div
                        key={story.id}
                        className="snap-start relative h-[280px] w-[180px] shrink-0 cursor-pointer overflow-hidden rounded-3xl shadow-md transition-all hover:scale-[1.02]"
                        onClick={() => handleCardClick(story.id)}
                    >
                        <img
                            src={story.content_url}
                            className="absolute h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                            alt={story.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                        <div className="absolute top-3 left-3 z-20">
                            <div className="h-10 w-10 rounded-full border-2 border-blue-500 overflow-hidden shadow-sm bg-gray-100 p-0.5">
                                <img
                                    src={story.author.avatar}
                                    alt={story.author.name}
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-3 right-3 z-20 pointer-events-none">
                            <span className="text-xs font-bold text-white leading-tight drop-shadow-md">
                                {story.author.name}
                            </span>
                        </div>
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
