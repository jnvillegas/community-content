import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Event, EventCategory, PageProps } from '@/types';
import EventCard from '@/components/Events/EventCard'; // Check import path case sensitivity
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Search, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react'; // Inertia router for manual visits

interface Props extends PageProps {
    events: {
        data: Event[];
        links: any[]; // Paginator links
        meta: any;
    };
    categories: EventCategory[];
    filters: {
        search?: string;
        category_id?: string;
        event_type?: string;
        date_from?: string;
        date_to?: string;
    };
}

export default function Index({ events, categories, filters, auth }: Props) {
    // State for filters
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category_id || 'all');
    const [type, setType] = useState(filters.event_type || 'all');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                applyFilters();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const applyFilters = (newCategory?: string, newType?: string) => {
        router.get('/events', {
            search,
            category_id: (newCategory || category) === 'all' ? undefined : (newCategory || category),
            event_type: (newType || type) === 'all' ? undefined : (newType || type)
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        applyFilters(value, undefined);
    };

    const handleTypeChange = (value: string) => {
        setType(value);
        applyFilters(undefined, value);
    };

    const breadcrumbs = [
        { title: 'Home', href: '/dashboard' },
        { title: 'Community Events', href: '/events' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />

            <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Community Events</h1>
                        <p className="text-muted-foreground mt-1">Discover workshops, meetups, and trips happening near you.</p>
                    </div>

                    {/* Admin/Creator Action - Check permission if needed, currently checking role via auth user logic if available, or just valid user */}
                    {auth.user.roles?.some(r => r.name === 'admin') && (
                        <Button asChild>
                            <Link href="/admin/events/create">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Event
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-card rounded-xl border border-border p-4 mb-8 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search events..."
                            className="pl-9 bg-background/50"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4 grow w-full justify-end min-w-[300px]">
                        <Select value={category} onValueChange={handleCategoryChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={String(cat.id)}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={type} onValueChange={handleTypeChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Event Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="WORKSHOP">Workshop</SelectItem>
                                <SelectItem value="MEETUP">Meetup</SelectItem>
                                <SelectItem value="WEBINAR">Webinar</SelectItem>
                                <SelectItem value="TRIP">Trip</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Grid */}
                {events.data.length > 0 ? (
                    <div className="flex flex-wrap gap-6">
                        {events.data.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                            <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-bold">No events found</h3>
                        <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                        <Button
                            variant="link"
                            onClick={() => { setSearch(''); setCategory('all'); setType('all'); router.visit('/events'); }}
                            className="mt-2"
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}

                {/* Pagination - Simple implementation */}
                {events.links.length > 3 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {events.links.map((link, i) => (
                            link.url ? (
                                <Button
                                    key={i}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    asChild
                                    className={!link.url ? 'opacity-50 pointer-events-none' : ''}
                                >
                                    <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            ) : (
                                <span key={i} className="px-4 py-2 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: link.label }} />
                            )
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
