import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Event, PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Pencil, Trash, Eye, BarChart } from 'lucide-react';

interface Props extends PageProps {
    events: {
        data: Event[];
        links: any[];
    };
}

export default function Index({ events }: Props) {
    const handleDelete = (slug: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(`/admin/events/${slug}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Home', href: '/dashboard' },
            { title: 'Events Management', href: '/admin/events' },
        ]}>
            <Head title="Events Management" />

            <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Events Management</h1>
                        <p className="text-muted-foreground">Manage all community events.</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/events/create">
                            <Plus className="w-4 h-4 mr-2" />
                            New Event
                        </Link>
                    </Button>
                </div>

                <div className="border rounded-lg bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Dates</TableHead>
                                <TableHead>Attendees</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.data.length > 0 ? (
                                events.data.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span>{event.title}</span>
                                                <span className="text-xs text-muted-foreground truncate max-w-[200px]">{event.slug}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{event.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={event.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                                                {event.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div>{new Date(event.start_date).toLocaleDateString()}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {new Date(event.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {/* We might need to load count using withCount in controller, checking props */}
                                            {/* Current controller: 'createdBy', 'categories'. No count yet. Using placeholder */}
                                            <span className="text-muted-foreground">-</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/events/${event.slug}`} target="_blank">
                                                            <Eye className="mr-2 h-4 w-4" /> View Public
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/admin/events/${event.slug}/edit`}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/admin/events/${event.slug}/stats`}>
                                                            <BarChart className="mr-2 h-4 w-4" /> Stats & Attendees
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleDelete(event.slug)} className="text-red-600 focus:text-red-600">
                                                        <Trash className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No events found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {/* Pagination - Simple implementation */}
                {events.links.length > 3 && (
                    <div className="mt-4 flex justify-center gap-2">
                        {events.links.map((link, i) => (
                            link.url ? (
                                <Button
                                    key={i}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    asChild
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
