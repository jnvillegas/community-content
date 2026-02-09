import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Event, PageProps, User } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Registration {
    id: number;
    user_id: number;
    status: string;
    created_at: string;
    user: User;
    attended_at?: string;
}

interface Props extends PageProps {
    event: Event;
    registrations: {
        data: Registration[];
        links: any[];
    };
}

export default function Attendees({ event, registrations }: Props) {
    const handleMarkAttendance = (userId: number) => {
        router.post(`/admin/events/${event.slug}/attendees/${userId}/mark`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Home', href: '/dashboard' },
            { title: 'Events', href: '/admin/events' },
            { title: 'Attendees', href: '#' },
        ]}>
            <Head title={`Attendees - ${event.title}`} />

            <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                <div className="mb-6">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2" asChild>
                        <Link href="/admin/events">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Events
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-black tracking-tight mt-2">Attendees</h1>
                    <p className="text-muted-foreground">{event.title}</p>
                </div>

                <div className="border rounded-lg bg-card overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Registration Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {registrations.data.length > 0 ? (
                                registrations.data.map((reg) => (
                                    <TableRow key={reg.id}>
                                        <TableCell className="font-medium">{reg.user.name}</TableCell>
                                        <TableCell>{reg.user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={reg.status === 'confirmed' ? 'default' : (reg.status === 'attended' ? 'default' : 'secondary')}>
                                                {reg.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{new Date(reg.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            {reg.status !== 'attended' && reg.status !== 'cancelled' && (
                                                <Button size="sm" variant="outline" onClick={() => handleMarkAttendance(reg.user_id)}>
                                                    <Check className="w-4 h-4 mr-1" />
                                                    Mark Present
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No attendees found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {registrations.links.length > 3 && (
                    <div className="mt-4 flex justify-center gap-2">
                        {registrations.links.map((link, i) => (
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
