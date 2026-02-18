import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import {
    ChevronLeft,
    Save,
    Plus,
    Trash2,
    Edit as EditIcon,
    Video,
    FileText,
    Clock,
    Layout,
    BookOpen,
    Image as ImageIcon,
    Eye
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { BreadcrumbItem } from '@/types';
import { cn } from '@/lib/utils';


interface Lesson {
    id: number;
    title: string;
    slug: string;
    content_type: 'video' | 'text';
    video_url?: string;
    content_body?: string;
    duration?: string;
    order: number;
}

interface Module {
    id: number;
    title: string;
    order: number;
    lessons: Lesson[];
}

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string;
    status: 'draft' | 'published';
    modules: Module[];
}

interface Props {
    course: Course;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Academy', href: '/admin/academy' },
    { title: 'Courses', href: '/admin/academy/courses' },
    { title: 'Edit Course', href: '#' },
];

export default function EditCourse({ course }: Props) {
    const [activeTab, setActiveTab] = useState<'info' | 'syllabus'>('info');

    // Course Info Form
    const { data: courseData, setData: setCourseData, put: updateCourse, processing: updatingCourse, errors: courseErrors } = useForm({
        title: course.title,
        description: course.description,
        cover_image: course.cover_image,
        status: course.status,
    });

    const handleUpdateCourse = (e: React.FormEvent) => {
        e.preventDefault();
        updateCourse(`/admin/academy/courses/${course.id}`, {
            onSuccess: () => alert('Course updated successfully')
        });
    };

    // Module Management
    const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
    const [moduleToAdd, setModuleToAdd] = useState({ title: '' });

    const handleAddModule = () => {
        router.post(`/admin/academy/courses/${course.id}/modules`, moduleToAdd, {
            onSuccess: () => {
                setIsAddModuleOpen(false);
                setModuleToAdd({ title: '' });
                alert('Module added');
            }
        });
    };

    const handleDeleteModule = (moduleId: number) => {
        if (confirm('Are you sure? All lessons in this module will be deleted.')) {
            router.delete(`/admin/academy/courses/${course.id}/modules/${moduleId}`, {
                onSuccess: () => alert('Module deleted')
            });
        }
    };

    // Lesson Management
    const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
    const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
    const [lessonToAdd, setLessonToAdd] = useState({
        title: '',
        content_type: 'video' as 'video' | 'text',
        video_url: '',
        content_body: '',
        duration: '',
    });

    const handleAddLesson = () => {
        if (!activeModuleId) return;
        router.post(`/admin/academy/modules/${activeModuleId}/lessons`, lessonToAdd, {
            onSuccess: () => {
                setIsAddLessonOpen(false);
                setLessonToAdd({ title: '', content_type: 'video', video_url: '', content_body: '', duration: '' });
                setActiveModuleId(null);
                alert('Lesson added');
            }
        });
    };

    const handleDeleteLesson = (moduleId: number, lessonId: number) => {
        if (confirm('Delete this lesson?')) {
            router.delete(`/admin/academy/modules/${moduleId}/lessons/${lessonId}`, {
                onSuccess: () => alert('Lesson deleted')
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${course.title}`} />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mb-20">
                <div className="max-w-5xl mx-auto w-full space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" asChild className="rounded-full">
                                <Link href="/admin/academy/courses">
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
                                <p className="text-sm text-muted-foreground">Manage your course content and settings.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" asChild className="border-border/50">
                                <Link href={`/academy/${course.slug}`}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Preview
                                </Link>
                            </Button>
                            <Button onClick={handleUpdateCourse} disabled={updatingCourse} className="shadow-md">
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex p-1 bg-muted/50 rounded-lg w-fit border border-border/50 backdrop-blur-sm">
                        <button
                            onClick={() => setActiveTab('info')}
                            className={cn(
                                "px-8 py-2.5 text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-200",
                                activeTab === 'info' ? "bg-white dark:bg-gray-900 shadow-sm text-primary ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <Layout className="h-4 w-4" />
                                Details
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('syllabus')}
                            className={cn(
                                "px-8 py-2.5 text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-200",
                                activeTab === 'syllabus' ? "bg-white dark:bg-gray-900 shadow-sm text-primary ring-1 ring-border/50" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Syllabus
                            </div>
                        </button>
                    </div>

                    {activeTab === 'info' ? (
                        /* General Info Form */
                        <div className="grid gap-6 md:grid-cols-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="md:col-span-2 space-y-6">
                                <Card className="border-border/50 shadow-sm">
                                    <CardHeader className="bg-muted/30 border-b border-border/50">
                                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Course Metadata</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase text-muted-foreground">Course Title</Label>
                                            <Input
                                                value={courseData.title}
                                                onChange={e => setCourseData('title', e.target.value)}
                                                className="h-12 border-border/50 font-bold text-lg focus:border-primary/50"
                                            />
                                            {courseErrors.title && <p className="text-xs text-red-500">{courseErrors.title}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase text-muted-foreground">Description</Label>
                                            <Textarea
                                                value={courseData.description}
                                                onChange={e => setCourseData('description', e.target.value)}
                                                className="min-h-[300px] border-border/50 resize-none leading-relaxed text-base"
                                            />
                                            {courseErrors.description && <p className="text-xs text-red-500">{courseErrors.description}</p>}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card className="border-border/50 shadow-sm overflow-hidden">
                                    <CardHeader className="bg-muted/30 border-b border-border/50">
                                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Publication Status</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <Select
                                            value={courseData.status}
                                            onValueChange={v => setCourseData('status', v as any)}
                                        >
                                            <SelectTrigger className="h-11 border-border/50">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Published</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </CardContent>
                                </Card>

                                <Card className="border-border/50 shadow-sm overflow-hidden text-clip">
                                    <CardHeader className="bg-muted/30 border-b border-border/50">
                                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground text-ellipsis">Appearance</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase text-muted-foreground">Cover Image URL</Label>
                                            <Input
                                                value={courseData.cover_image}
                                                onChange={e => setCourseData('cover_image', e.target.value)}
                                                placeholder="https://..."
                                                className="border-border/50"
                                            />
                                        </div>
                                        {courseData.cover_image && (
                                            <div className="aspect-video rounded-lg overflow-hidden border border-border/50 relative group shadow-inner">
                                                <img src={courseData.cover_image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Button variant="secondary" size="sm" onClick={() => setCourseData('cover_image', '')} className="h-8">
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        /* Syllabus Editor */
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold tracking-tight">Curriculum Builder</h2>
                                <Dialog open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="shadow-md bg-primary hover:bg-primary/90">
                                            <Plus className="h-4 w-4 mr-2" />
                                            New Module
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Add New Module</DialogTitle>
                                            <DialogDescription>Modules are sections that contain related lessons.</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label>Module Title</Label>
                                                <Input
                                                    value={moduleToAdd.title}
                                                    onChange={e => setModuleToAdd({ title: e.target.value })}
                                                    placeholder="e.g. Phase 1: Foundations"
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="ghost" onClick={() => setIsAddModuleOpen(false)}>Cancel</Button>
                                            <Button onClick={handleAddModule} disabled={!moduleToAdd.title}>Create Module</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="space-y-6">
                                {course.modules.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-24 bg-muted/10 border-2 border-dashed border-border/50 rounded-2xl space-y-4">
                                        <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
                                            <BookOpen className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-lg">Your syllabus is empty</p>
                                            <p className="text-sm text-muted-foreground">Add your first module to start organizing your lessons.</p>
                                        </div>
                                        <Button variant="secondary" onClick={() => setIsAddModuleOpen(true)} className="px-8 border border-border/50 shadow-sm">
                                            Add First Module
                                        </Button>
                                    </div>
                                )}

                                {course.modules.map((module, index) => (
                                    <Card key={module.id} className="border-border/50 overflow-hidden shadow-sm group/module transition-all hover:shadow-md">
                                        <div className="bg-muted/40 px-6 py-5 flex items-center justify-between border-b border-border/50">
                                            <div className="flex items-center gap-4">
                                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-black border border-primary/20">
                                                    {index + 1}
                                                </div>
                                                <h3 className="font-bold text-xl tracking-tight">{module.title}</h3>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover/module:opacity-100 transition-all duration-200">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => {
                                                        setActiveModuleId(module.id);
                                                        setIsAddLessonOpen(true);
                                                    }}
                                                    className="h-9 px-4 border border-border/50 shadow-sm bg-white dark:bg-gray-900"
                                                >
                                                    <Plus className="h-4 w-4 mr-2 text-primary" />
                                                    Add Lesson
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDeleteModule(module.id)} className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <CardContent className="p-0">
                                            <div className="divide-y divide-border/30">
                                                {module.lessons.map((lesson) => (
                                                    <div key={lesson.id} className="px-6 py-4 flex items-center justify-between hover:bg-muted/10 transition-colors group/lesson">
                                                        <div className="flex items-center gap-5">
                                                            <div className={cn(
                                                                "p-2 rounded-md",
                                                                lesson.content_type === 'video' ? "bg-blue-500/10 text-blue-600" : "bg-orange-500/10 text-orange-600"
                                                            )}>
                                                                {lesson.content_type === 'video' ? (
                                                                    <Video className="h-5 w-5" />
                                                                ) : (
                                                                    <FileText className="h-5 w-5" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-base">{lesson.title}</p>
                                                                <div className="flex items-center gap-3 mt-1">
                                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{lesson.content_type}</span>
                                                                    {lesson.duration && (
                                                                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium italic">
                                                                            <Clock className="h-3 w-3" />
                                                                            {lesson.duration}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 opacity-0 group-hover/lesson:opacity-100 transition-all">
                                                            <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-primary/10 hover:text-primary rounded-full">
                                                                <EditIcon className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteLesson(module.id, lesson.id)} className="h-9 w-9 text-red-500 hover:bg-red-500/10 rounded-full">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {module.lessons.length === 0 && (
                                                    <div className="py-10 text-center text-sm text-muted-foreground font-medium italic">
                                                        No lessons added to this module yet.
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Add Lesson Dialog */}
                <Dialog open={isAddLessonOpen} onOpenChange={(open) => {
                    setIsAddLessonOpen(open);
                    if (!open) {
                        setActiveModuleId(null);
                        setLessonToAdd({ title: '', content_type: 'video', video_url: '', content_body: '', duration: '' });
                    }
                }}>
                    <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                            <DialogTitle>New Lesson</DialogTitle>
                            <DialogDescription>Add a new content piece to your module curriculum.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-5 py-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider">Lesson Title</Label>
                                <Input
                                    value={lessonToAdd.title}
                                    onChange={e => setLessonToAdd({ ...lessonToAdd, title: e.target.value })}
                                    placeholder="Enter lesson title..."
                                    className="h-11 border-border/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider">Content Format</Label>
                                <Select
                                    value={lessonToAdd.content_type}
                                    onValueChange={v => setLessonToAdd({ ...lessonToAdd, content_type: v as any })}
                                >
                                    <SelectTrigger className="h-11 border-border/50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="video">Video Recording</SelectItem>
                                        <SelectItem value="text">Written Material</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {lessonToAdd.content_type === 'video' ? (
                                <div className="space-y-2 animate-in zoom-in-95 duration-200">
                                    <Label className="text-xs font-bold uppercase tracking-wider">Video URL</Label>
                                    <Input
                                        value={lessonToAdd.video_url}
                                        onChange={e => setLessonToAdd({ ...lessonToAdd, video_url: e.target.value })}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="h-11 border-border/50"
                                    />
                                    <p className="text-[10px] text-muted-foreground italic font-medium px-1">Supports YouTube, Vimeo, and direct MP4 URLs.</p>
                                </div>
                            ) : (
                                <div className="space-y-2 animate-in zoom-in-95 duration-200">
                                    <Label className="text-xs font-bold uppercase tracking-wider">Content Body</Label>
                                    <Textarea
                                        value={lessonToAdd.content_body}
                                        onChange={e => setLessonToAdd({ ...lessonToAdd, content_body: e.target.value })}
                                        className="h-40 border-border/50 resize-none"
                                        placeholder="Write your lesson content here..."
                                    />
                                </div>
                            )}
                            <div className="space-y-2 w-1/2">
                                <Label className="text-xs font-bold uppercase tracking-wider">Duration</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50" />
                                    <Input
                                        value={lessonToAdd.duration}
                                        onChange={e => setLessonToAdd({ ...lessonToAdd, duration: e.target.value })}
                                        placeholder="e.g. 15:00"
                                        className="h-11 pl-10 border-border/50"
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="gap-2">
                            <Button variant="ghost" onClick={() => setIsAddLessonOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddLesson} disabled={!lessonToAdd.title} className="shadow-lg">
                                Add to Module
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
