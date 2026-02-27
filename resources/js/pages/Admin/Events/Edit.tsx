import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Event, EventCategory } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ArrowLeft, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';

interface Props {
    event: Event;
    categories: EventCategory[];
    types: string[];
}

export default function Edit({ event, categories, types }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: event.title,
        description: event.description || '',
        event_type: event.type,
        status: event.status,
        start_date: event.start_date ? event.start_date.slice(0, 16) : '', // Format for datetime-local
        end_date: event.end_date ? event.end_date.slice(0, 16) : '',
        registration_deadline: event.registration_deadline ? event.registration_deadline.slice(0, 16) : '',
        max_participants: event.max_participants?.toString() || '',
        requires_subscription: !!event.requires_subscription,
        location: event.location || '',
        location_url: event.location_url || '',
        address: event.address || '',
        virtual_url: event.virtual_url || '',
        categories: event.categories?.map(c => String(c.id)) || [],
        cover_image: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Inertia uses POST with _method: PUT for file assignments to work with PUT in Laravel
        post(`/admin/events/${event.slug}`);
    };

    const isVirtual = data.event_type === 'WEBINAR' || data.event_type === 'LIVE';

    return (
        <AppLayout breadcrumbs={[
            { title: 'Home', href: '/dashboard' },
            { title: 'Events', href: '/admin/events' },
            { title: 'Edit', href: '#' },
        ]}>
            <Head title={`Edit ${event.title}`} />

            <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
                <div className="mb-6 flex justify-between items-start">
                    <div>
                        <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2" asChild>
                            <Link href="/admin/events">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Events
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-black tracking-tight mt-2">Edit Event</h1>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm">
                            <CalendarDays className="w-4 h-4" />
                            <span>Publicado originalmente el {format(new Date(event.created_at), "d 'de' MMMM, yyyy", { locale: es })}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Event Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="min-h-[120px]"
                                    required
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Event Type</Label>
                                    <Select
                                        value={data.event_type}
                                        onValueChange={(val) => setData('event_type', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {types.map(t => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.event_type && <p className="text-sm text-red-500">{errors.event_type}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(val: any) => setData('status', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cover_image">Cover Image (Leave empty to keep current)</Label>
                                <Input
                                    id="cover_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setData('cover_image', e.target.files ? e.target.files[0] : null)}
                                />
                                {errors.cover_image && <p className="text-sm text-red-500">{errors.cover_image}</p>}
                                {event.cover_image && (
                                    <div className="mt-2 w-32 h-20 rounded overflow-hidden border">
                                        <img src={event.cover_image} alt="Current cover" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Date & Time</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="start_date">Start Date & Time</Label>
                                <Input
                                    id="start_date"
                                    type="datetime-local"
                                    value={data.start_date}
                                    onChange={e => setData('start_date', e.target.value)}
                                    required
                                />
                                {errors.start_date && <p className="text-sm text-red-500">{errors.start_date}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="end_date">End Date & Time</Label>
                                <Input
                                    id="end_date"
                                    type="datetime-local"
                                    value={data.end_date}
                                    onChange={e => setData('end_date', e.target.value)}
                                    required
                                />
                                {errors.end_date && <p className="text-sm text-red-500">{errors.end_date}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="registration_deadline">Registration Deadline (Optional)</Label>
                                <Input
                                    id="registration_deadline"
                                    type="datetime-local"
                                    value={data.registration_deadline}
                                    onChange={e => setData('registration_deadline', e.target.value)}
                                />
                                {errors.registration_deadline && <p className="text-sm text-red-500">{errors.registration_deadline}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Location & Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {isVirtual ? (
                                <div className="space-y-2">
                                    <Label htmlFor="virtual_url">Virtual Event URL (Link)</Label>
                                    <Input
                                        id="virtual_url"
                                        value={data.virtual_url}
                                        onChange={e => setData('virtual_url', e.target.value)}
                                        placeholder="https://zoom.us/..."
                                    />
                                    {errors.virtual_url && <p className="text-sm text-red-500">{errors.virtual_url}</p>}
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location Name</Label>
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={e => setData('location', e.target.value)}
                                            placeholder="e.g. Main Conference Hall"
                                        />
                                        {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                            placeholder="123 Example St, City"
                                        />
                                        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location_url">Google Maps URL</Label>
                                        <Input
                                            id="location_url"
                                            value={data.location_url}
                                            onChange={e => setData('location_url', e.target.value)}
                                            placeholder="https://maps.google.com/..."
                                        />
                                        {errors.location_url && <p className="text-sm text-red-500">{errors.location_url}</p>}
                                    </div>
                                </>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="max_participants">Max Participants (Optional)</Label>
                                    <Input
                                        id="max_participants"
                                        type="number"
                                        value={data.max_participants}
                                        onChange={e => setData('max_participants', e.target.value)}
                                        placeholder="Leave empty for unlimited"
                                    />
                                    {errors.max_participants && <p className="text-sm text-red-500">{errors.max_participants}</p>}
                                </div>
                                <div className="flex items-center space-x-2 h-full pt-6">
                                    <Checkbox
                                        id="requires_subscription"
                                        checked={data.requires_subscription}
                                        onCheckedChange={(checked) => setData('requires_subscription', !!checked)}
                                    />
                                    <Label htmlFor="requires_subscription" className="cursor-pointer">
                                        Requires Active Subscription?
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" asChild>
                            <Link href="/admin/events">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="min-w-[140px]">
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
