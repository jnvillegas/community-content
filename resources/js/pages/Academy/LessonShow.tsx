import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Clock,
    GraduationCap,
    Menu,
    PlayCircle,
    Star,
    CheckCircle2,
    Lock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Progress {
    lesson_id: number;
    completed_at: string | null;
}

interface Lesson {
    id: number;
    title: string;
    slug: string;
    content_type: string;
    video_url: string | null;
    content_body: string | null;
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
    modules: Module[];
}

interface Props {
    course: Course;
    lesson: Lesson & { module: { id: number, course: Course } };
    userProgress: Progress[];
}

export default function LessonShow({ course, lesson, userProgress }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const isCompleted = userProgress.some(p => p.lesson_id === lesson.id && p.completed_at !== null);

    const { data, setData, post, processing } = useForm({
        completed: !isCompleted
    });

    const toggleComplete = () => {
        post(`/academy/lessons/${lesson.id}/progress`, {
            preserveScroll: true
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Academy', href: '/academy' },
        { title: course.title, href: `/academy/${course.slug}` },
        { title: lesson.title, href: `/academy/${course.slug}/lessons/${lesson.slug}` },
    ];

    // Helper to get YouTube ID
    const getYouTubeId = (url: string | null) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = getYouTubeId(lesson.video_url);

    // Navigation helpers
    const allLessons = course.modules.flatMap(m => m.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

    const completedCount = userProgress.filter(p => p.completed_at !== null).length;
    const progressPercent = Math.round((completedCount / allLessons.length) * 100);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${lesson.title} - ${course.title}`} />

            <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
                {/* Main Content Area */}
                <div className={cn(
                    "flex-1 flex flex-col min-w-0 transition-all duration-300",
                    sidebarOpen ? "mr-0" : ""
                )}>
                    {/* Header Controls */}
                    <div className="h-14 border-b border-border/50 flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                            <h2 className="text-sm font-semibold truncate max-w-[200px] sm:max-w-md">
                                {lesson.title}
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/academy/${course.slug}`}>
                                    <ChevronLeft className="h-4 w-4 mr-1" />
                                    Back to Course
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Content Scroll Area */}
                    <ScrollArea className="flex-1">
                        <div className="max-w-5xl mx-auto py-8 px-6 lg:px-12 space-y-8">
                            {/* Video Player */}
                            {youtubeId ? (
                                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-border/50">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                                        title={lesson.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : lesson.video_url ? (
                                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-border/50">
                                    <video
                                        controls
                                        className="w-full h-full"
                                        src={lesson.video_url}
                                    />
                                </div>
                            ) : (
                                <div className="bg-muted/30 aspect-video rounded-2xl flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border/50 border-primary/20 bg-primary/5">
                                    <BookOpen className="h-16 w-16 text-primary/30 mb-4" />
                                    <h3 className="text-xl font-semibold">Text Class</h3>
                                    <p className="text-muted-foreground max-w-sm mx-auto">This lesson contains only readable material and supplemental resources.</p>
                                </div>
                            )}

                            {/* Lesson Description/Content */}
                            <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                                <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
                                {lesson.content_body ? (
                                    <div className="whitespace-pre-wrap text-foreground/80 leading-relaxed tabular-nums">
                                        {lesson.content_body}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground italic">No written content available for this lesson.</p>
                                )}
                            </article>
                        </div>
                    </ScrollArea>

                    {/* Footer Progress Navigation */}
                    <div className="h-20 border-t border-border/50 bg-card/50 backdrop-blur-sm p-4 flex items-center justify-between px-8">
                        <div className="flex items-center gap-4">
                            {prevLesson ? (
                                <Button variant="ghost" asChild className="text-muted-foreground">
                                    <Link href={`/academy/${course.slug}/lessons/${prevLesson.slug}`}>
                                        <ChevronLeft className="h-5 w-5 mr-2" />
                                        Previous
                                    </Link>
                                </Button>
                            ) : (
                                <div className="w-24" />
                            )}

                            <Button
                                onClick={toggleComplete}
                                disabled={processing}
                                variant={isCompleted ? "outline" : "secondary"}
                                className={cn(
                                    "px-6 h-11 border-primary/20 transition-all",
                                    isCompleted ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : "bg-primary text-primary-foreground hover:bg-primary/90"
                                )}
                            >
                                {isCompleted ? (
                                    <><CheckCircle2 className="h-5 w-5 mr-2" /> Completed</>
                                ) : (
                                    'Complete & Next'
                                )}
                            </Button>
                        </div>

                        {nextLesson ? (
                            <Button asChild className="bg-muted hover:bg-muted/80 text-foreground px-8 h-12">
                                <Link href={`/academy/${course.slug}/lessons/${nextLesson.slug}`}>
                                    Next Lesson
                                    <ChevronRight className="h-5 w-5 ml-2" />
                                </Link>
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2 text-green-500 font-bold px-4">
                                <GraduationCap className="h-6 w-6" />
                                Course Finished!
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Navigation (Right) */}
                <div className={cn(
                    "w-[355px] border-l border-border/50 bg-card/30 flex flex-col transition-all duration-300 fixed lg:static inset-y-0 right-0 z-20",
                    sidebarOpen ? "translate-x-0" : "translate-x-full lg:hidden"
                )}>
                    <div className="p-6 border-b border-border/50">
                        <h3 className="font-bold flex items-center gap-2 text-lg">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            Course Progress
                        </h3>
                        {/* Simple Progress Bar */}
                        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500 shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 font-medium">
                            {completedCount} of {allLessons.length} lessons completed ({progressPercent}%)
                        </p>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-4">
                            <Accordion
                                type="multiple"
                                defaultValue={[`module-${lesson.module.id}`]}
                                className="space-y-4"
                            >
                                {course.modules.map((module, mIdx) => (
                                    <AccordionItem
                                        key={module.id}
                                        value={`module-${module.id}`}
                                        className="border-none"
                                    >
                                        <AccordionTrigger className="hover:no-underline p-2 rounded-lg hover:bg-muted/50 text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-all">
                                            {mIdx + 1}. {module.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-0">
                                            <div className="space-y-1">
                                                {module.lessons.map((l, lIdx) => {
                                                    const lIsCompleted = userProgress.some(p => p.lesson_id === l.id && p.completed_at !== null);
                                                    const isCurrent = l.id === lesson.id;

                                                    return (
                                                        <Link
                                                            key={l.id}
                                                            href={`/academy/${course.slug}/lessons/${l.slug}`}
                                                            className={cn(
                                                                "flex items-center gap-3 p-3 rounded-xl transition-all group relative",
                                                                isCurrent
                                                                    ? "bg-primary/10 text-primary border border-primary/20"
                                                                    : "hover:bg-muted/50"
                                                            )}
                                                        >
                                                            {isCurrent ? (
                                                                <PlayCircle className="h-5 w-5 fill-current" />
                                                            ) : lIsCompleted ? (
                                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                            ) : (
                                                                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/20" />
                                                            )}
                                                            <div className="min-w-0">
                                                                <p className={cn(
                                                                    "text-sm font-medium truncate leading-none mb-1",
                                                                    lIsCompleted && !isCurrent ? "text-muted-foreground" : ""
                                                                )}>
                                                                    {l.title}
                                                                </p>
                                                                <span className="text-[10px] text-muted-foreground">
                                                                    {l.content_type.toUpperCase()} • {l.duration ? `${Math.round(l.duration / 60)}m` : 'Text'}
                                                                </span>
                                                            </div>
                                                            {isCurrent && (
                                                                <div className="absolute right-3">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                                                </div>
                                                            )}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </AppLayout>
    );
}

