import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Event, PageProps } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Calendar,
    MapPin,
    Video,
    Users,
    Clock,
    CheckCircle2,
    AlertCircle,
    Share2,
    ArrowLeft
} from 'lucide-react';

import { useState } from 'react';

interface Props extends PageProps {
    event: Event;
    registrations_count: number;
    can_register: {
        can: boolean;
        reason: string | null;
    };
    is_registered: boolean;
}

export default function Show({ event, registrations_count, can_register, is_registered, auth }: Props) {
    const { post, delete: destroy, processing } = useForm();

    const handleRegister = () => {
        post(`/events/${event.id}/register`, {
            preserveScroll: true,
            onSuccess: () => {
                // Toast handled by flash message usually, but we can add local too
            }
        });
    };

    const handleUnregister = () => {
        if (confirm('Are you sure you want to cancel your registration?')) {
            destroy(`/events/${event.id}/unregister`, {
                preserveScroll: true,
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const isVirtual = event.type === 'WEBINAR' || (event.type as string) === 'LIVE';

    const breadcrumbs = [
        { title: 'Home', href: '/dashboard' },
        { title: 'Community Events', href: '/events' },
        { title: event.title, href: `/events/${event.slug}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.title} />

            <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/50">
                {/* Hero Section */}
                <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-gray-900">
                    <img
                        src={event.cover_image || '/images/event-placeholder.jpg'}
                        alt={event.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
                        <Button variant="ghost" className="text-white hover:bg-white/20 gap-2" asChild>
                            <Link href="/events">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Eventos
                            </Link>
                        </Button>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 text-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge className="bg-primary hover:bg-primary/90 text-white border-none text-md py-1 px-3">
                                    {event.type}
                                </Badge>
                                {event.status !== 'PUBLISHED' && (
                                    <Badge variant="outline" className="text-white border-white/50">
                                        {event.status}
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
                                {event.title}
                            </h1>
                            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-200 font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <span>{formatDate(event.start_date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isVirtual ? <Video className="w-5 h-5 text-primary" /> : <MapPin className="w-5 h-5 text-primary" />}
                                    <span>{isVirtual ? 'Online Event' : (event.location || 'Location TBA')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto p-4 md:p-8 -mt-8 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="border-none shadow-lg">
                                <CardContent className="p-6 md:p-8">
                                    <h2 className="text-2xl font-bold mb-4">About this Event</h2>
                                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                        {event.description}
                                    </div>

                                    <Separator className="my-8" />

                                    {/* Additional Info could go here (Speakers, Agenda, etc.) */}
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        Attendees
                                    </h3>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="font-semibold text-foreground">{registrations_count}</span> people registered
                                        {event.max_participants && (
                                            <span>(Max {event.max_participants})</span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Registration Card */}
                            <Card className="border-none shadow-lg sticky top-24">
                                <CardContent className="p-6 space-y-6">

                                    {/* Status Box */}
                                    {is_registered ? (
                                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-4 flex flex-col items-center text-center gap-2">
                                            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-600 dark:text-green-300">
                                                <CheckCircle2 className="w-6 h-6" />
                                            </div>
                                            <h3 className="font-bold text-green-800 dark:text-green-300">You're Registered!</h3>
                                            <p className="text-sm text-green-700 dark:text-green-400">
                                                We'll send you a reminder before the event starts.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-sm font-medium">
                                                <span>Price</span>
                                                <span className="text-xl font-bold text-primary">Free</span>
                                            </div>
                                            {event.max_participants && (
                                                <div className="text-xs text-muted-foreground text-right">
                                                    {(event.max_participants - registrations_count)} spots left
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        {!auth.user ? (
                                            <Button className="w-full font-bold" size="lg" asChild>
                                                <Link href="/login">Login to Register</Link>
                                            </Button>
                                        ) : is_registered ? (
                                            <Button
                                                variant="outline"
                                                className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:hover:bg-red-900/20"
                                                onClick={handleUnregister}
                                                disabled={processing}
                                            >
                                                Cancel Registration
                                            </Button>
                                        ) : can_register.can ? (
                                            <Button
                                                className="w-full font-bold shadow-lg shadow-primary/20"
                                                size="lg"
                                                onClick={handleRegister}
                                                disabled={processing}
                                            >
                                                {processing ? 'Registering...' : 'Register Now'}
                                            </Button>
                                        ) : (
                                            <div className="space-y-2">
                                                <Button disabled className="w-full" variant="secondary" size="lg">
                                                    Registration Closed
                                                </Button>
                                                {can_register.reason && (
                                                    <p className="text-xs text-center text-red-500 font-medium flex items-center justify-center gap-1">
                                                        <AlertCircle className="w-3 h-3" />
                                                        {can_register.reason}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Admin Edit Link */}
                                    {auth.user?.roles?.some(r => r.name === 'admin') && (
                                        <div className="pt-4 border-t">
                                            <Button variant="ghost" size="sm" className="w-full" asChild>
                                                <Link href={`/admin/events/${event.slug}/edit`}>
                                                    Edit Event (Admin)
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Location / Meta */}
                            {!isVirtual && event.locationUrl && (
                                <Card className="border-none shadow-md overflow-hidden">
                                    {/* Simple Map Placeholder or Link */}
                                    <a href={event.locationUrl} target="_blank" rel="noopener noreferrer" className="block relative h-32 bg-gray-100 hover:opacity-90 transition-opacity">
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-medium gap-2">
                                            <MapPin className="w-5 h-5" />
                                            View on Maps
                                        </div>
                                    </a>
                                    <CardContent className="p-4">
                                        <p className="text-sm font-medium">{event.address || event.location}</p>
                                    </CardContent>
                                </Card>
                            )}

                            <Button variant="outline" className="w-full gap-2" onClick={() => navigator.share?.({ title: event.title, url: window.location.href }).catch(() => { })}>
                                <Share2 className="w-4 h-4" />
                                Share Event
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
