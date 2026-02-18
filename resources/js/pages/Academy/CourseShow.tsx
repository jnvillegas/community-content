import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    Calendar,
    ChevronRight,
    Clock,
    GraduationCap,
    Lock,
    Play,
    PlayCircle,
    Users,
    CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';

interface Lesson {
    id: number;
    title: string;
    slug: string;
    content_type: string;
    duration: number | null;
}

interface Module {
    id: number;
    title: string;
    lessons: Lesson[];
}

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string;
    instructor: {
        name: string;
        avatar?: string;
    };
    modules: Module[];
}

interface Props {
    course: Course;
}

export default function CourseShow({ course }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Academy',
            href: '/academy',
        },
        {
            title: course.title,
            href: `/academy/${course.slug}`,
        },
    ];

    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={course.title} />

            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Course Info and Syllabus */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                                {course.title}
                            </h1>
                            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                                {course.description}
                            </p>
                        </div>

                        {/* Instructor Info */}
                        <div className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border/50">
                            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl uppercase">
                                {course.instructor.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Instructor</p>
                                <p className="text-lg font-semibold text-foreground">{course.instructor.name}</p>
                            </div>
                        </div>

                        {/* Syllabus */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-foreground">Course Content</h2>
                                <span className="text-sm text-muted-foreground font-medium">
                                    {course.modules.length} Modules • {totalLessons} Lessons
                                </span>
                            </div>

                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {course.modules.map((module, index) => (
                                    <AccordionItem
                                        key={module.id}
                                        value={`module-${module.id}`}
                                        className="border border-border/50 bg-card/30 rounded-xl overflow-hidden px-4"
                                    >
                                        <AccordionTrigger className="hover:no-underline py-4">
                                            <div className="flex items-center gap-4 text-left">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <span className="text-lg font-semibold">{module.title}</span>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {module.lessons.length} lessons
                                                    </p>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-4 pt-2">
                                            <div className="space-y-2 pl-12">
                                                {module.lessons.map((lesson) => (
                                                    <Link
                                                        key={lesson.id}
                                                        href={`/academy/${course.slug}/lessons/${lesson.slug}`}
                                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-emphasis/10 transition-colors group"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {lesson.content_type === 'video' ? (
                                                                <PlayCircle className="h-4 w-4 text-primary" />
                                                            ) : (
                                                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                            )}
                                                            <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                                                {lesson.title}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            {lesson.duration ? (
                                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                    <Clock className="h-3 w-3" />
                                                                    {Math.round(lesson.duration / 60)} min
                                                                </span>
                                                            ) : null}
                                                            <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </section>
                    </div>

                    {/* Right Column: Sidebar / CTAs */}
                    <div className="space-y-8">
                        <Card className="sticky top-24 border-border/50 overflow-hidden shadow-xl">
                            <div className="aspect-video relative">
                                <img
                                    src={course.cover_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'}
                                    className="object-cover w-full h-full"
                                    alt={course.title}
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-black">
                                        <Play className="h-8 w-8 fill-current ml-1" />
                                    </div>
                                </div>
                            </div>
                            <CardHeader className="text-center">
                                <CardTitle className="text-3xl font-bold">Free Access</CardTitle>
                                <CardDescription>Start learning today and master content creation.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button asChild size="lg" className="w-full text-lg h-14 bg-primary hover:bg-primary/90">
                                    <Link href={`/academy/${course.slug}/lessons/${course.modules[0]?.lessons[0]?.slug}`}>
                                        <Play className="h-5 w-5 mr-2 fill-current" />
                                        Start Learning
                                    </Link>
                                </Button>
                                <div className="space-y-3 pt-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        <span>Full Lifetime Access</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        <span>Progress Tracking</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        <span>Community Support</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

