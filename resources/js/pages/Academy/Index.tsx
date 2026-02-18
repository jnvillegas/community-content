import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Clock, GraduationCap, PlayCircle, Star, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string;
    instructor: {
        name: string;
    };
    status: string;
}

interface Props {
    courses: Course[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Academy',
        href: '/academy',
    },
];

export default function Index({ courses }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Creator Academy" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl flex items-center gap-3">
                        <GraduationCap className="h-12 w-12 text-primary" />
                        Creator Academy
                    </h1>
                    <p className="mt-4 text-xl text-muted-foreground max-w-3xl">
                        Empower your creative journey with our expert-led courses. From strategy to technical mastery, learn how to build your brand and community.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <Link key={course.id} href={`/academy/${course.slug}`} className="group block">
                            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={course.cover_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'}
                                        alt={course.title}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <Badge className="absolute top-4 right-4 bg-primary/90 hover:bg-primary text-primary-foreground border-none">
                                        Course
                                    </Badge>
                                </div>
                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="outline" className="text-secondary-foreground border-secondary/50">
                                            New
                                        </Badge>
                                    </div>
                                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                        {course.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 mt-2">
                                        {course.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground italic">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            <span>by {course.instructor.name}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0 border-t border-border/50 bg-muted/30 py-4">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                                            <BookOpen className="h-4 w-4 text-primary" />
                                            <span>Academy</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-primary font-semibold group-hover:underline">
                                            View Details
                                            <PlayCircle className="h-4 w-4 ml-1" />
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}

                    {courses.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                            <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                            <h3 className="text-lg font-semibold">No courses found</h3>
                            <p className="text-muted-foreground">Check back soon for new content!</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

// @ts-ignore - route is defined by Ziggy
function route(name: string, params?: any) {
    // This is a placeholder since we don't have Ziggy types here
    // In production, the global route() function will be used.
    // @ts-ignore
    return window.route(name, params);
}
