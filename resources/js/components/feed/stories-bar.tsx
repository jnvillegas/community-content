
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Plus } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface EventStory {
    id: number;
    title: string;
    start_date: string;
    slug: string;
    cover_image?: string; // Assuming we might have this, or use placeholder
}

interface StoriesBarProps {
    events: EventStory[];
}

export default function StoriesBar({ events }: StoriesBarProps) {
    return (
        <div className="mb-10 w-full overflow-hidden">
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max gap-4 pb-4">
                    {/* Add Event (Maybe link to create event?) */}
                    <Link href="/admin/events/create" className="group relative h-48 w-32 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-800">
                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-gray-900/10 to-transparent"></div>
                        <div className="flex h-full flex-col items-center justify-center gap-2">
                            <div className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform group-hover:scale-110 dark:bg-blue-900/30">
                                <Plus className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-bold text-gray-900 dark:text-gray-100">Add Event</span>
                        </div>
                    </Link>

                    {events.map((event) => (
                        <div key={event.id} className="group relative h-48 w-32 shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-transform hover:-translate-y-1">
                            <img
                                src={event.cover_image || `https://picsum.photos/seed/event${event.id}/300/500`}
                                className="absolute h-full w-full object-cover transition-transform group-hover:scale-110"
                                alt={event.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                            <div className="absolute bottom-3 left-3 right-3 whitespace-normal">
                                <span className="text-[11px] font-bold text-white line-clamp-2 leading-tight">
                                    {event.title}
                                </span>
                            </div>
                        </div>
                    ))}

                    {events.length === 0 && (
                        <div className="flex h-48 w-64 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-gray-400">
                            <span className="text-sm">No upcoming events</span>
                        </div>
                    )}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
