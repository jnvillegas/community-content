import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Event, PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, CheckCircle2, XCircle } from 'lucide-react';

interface Props extends PageProps {
    event: Event;
    stats: {
        total: number;
        confirmed: number;
        cancelled: number;
        attended: number;
        revenue?: number;
    };
}

export default function Stats({ event, stats }: Props) {
    return (
        <AppLayout breadcrumbs={[
            { title: 'Home', href: '/dashboard' },
            { title: 'Events', href: '/admin/events' },
            { title: 'Stats', href: '#' },
        ]}>
            <Head title={`Stats - ${event.title}`} />

            <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
                <div className="mb-6">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2" asChild>
                        <Link href="/admin/events">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Events
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-black tracking-tight mt-2">Event Statistics</h1>
                    <p className="text-muted-foreground">{event.title}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.confirmed}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Attended</CardTitle>
                            <Users className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.attended}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.cancelled}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
