import { Event } from "@/types";
import { Link } from "@inertiajs/react";
import { CalendarIcon, MapPinIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const isVirtual = event.type === 'WEBINAR' || (event.type as string) === 'LIVE'; // Adjust logic based on your types

    // Date formatting helper
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={event.cover_image || '/images/event-placeholder.jpg'}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant={event.status === 'PUBLISHED' ? "default" : "secondary"}>
                        {event.type}
                    </Badge>
                </div>
            </div>

            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2">
                        <Link href={`/events/${event.slug}`} className="hover:text-primary transition-colors">
                            {event.title}
                        </Link>
                    </h3>
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-2 flex-grow">
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {event.description}
                </p>

                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDate(event.start_date)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {isVirtual ? <VideoIcon className="w-4 h-4" /> : <MapPinIcon className="w-4 h-4" />}
                        <span className="truncate">
                            {isVirtual ? 'Online' : (event.location || 'Ubicación por definir')}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full" variant="outline">
                    <Link href={`/events/${event.slug}`}>
                        Ver Detalles
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
