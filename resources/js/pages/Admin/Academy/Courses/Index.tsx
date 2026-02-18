import { Head, Link, router } from '@inertiajs/react';
import {
    Edit,
    Eye,
    MoreHorizontal,
    Plus,
    Trash2,
    BookOpen,
    Video
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbItem } from '@/types';

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    status: 'draft' | 'published';
    modules_count: number;
    lessons_count: number;
    instructor: {
        name: string;
    };
    created_at: string;
}

interface Props {
    courses: {
        data: Course[];
        links: any[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Academy',
        href: '/admin/academy',
    },
    {
        title: 'Courses',
        href: '/admin/academy/courses',
    },
];

export default function CoursesIndex({ courses }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this course? This will remove all modules and lessons.')) {
            router.delete(`/admin/academy/courses/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Course Management" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
                        <p className="text-muted-foreground">Create and manage your educational content.</p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/academy/courses/create">
                            <Plus className="h-4 w-4 mr-2" />
                            New Course
                        </Link>
                    </Button>
                </div>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle>Course Directory</CardTitle>
                        <CardDescription>A list of all courses currently in the Academy.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="w-[40%] text-xs font-bold uppercase tracking-wider">Course</TableHead>
                                        <TableHead className="text-xs font-bold uppercase tracking-wider">Status</TableHead>
                                        <TableHead className="text-xs font-bold uppercase tracking-wider">Instructor</TableHead>
                                        <TableHead className="text-center text-xs font-bold uppercase tracking-wider">Content</TableHead>
                                        <TableHead className="text-right text-xs font-bold uppercase tracking-wider">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {courses.data.map((course) => (
                                        <TableRow key={course.id} className="hover:bg-muted/30 transition-colors">
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">{course.title}</span>
                                                    <span className="text-[10px] text-muted-foreground font-mono">/{course.slug}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={course.status === 'published' ? 'default' : 'secondary'}
                                                    className={course.status === 'published' ? 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20' : ''}
                                                >
                                                    {course.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm font-medium">{course.instructor.name}</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex flex-col text-xs text-muted-foreground">
                                                    <span className="font-semibold text-foreground">{course.modules_count}</span>
                                                    <span>Modules</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/academy/${course.slug}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Preview
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/academy/courses/${course.id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit Course
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600 focus:text-red-600 cursor-pointer"
                                                            onClick={() => handleDelete(course.id)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {courses.data.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                No courses found. Start by creating your first one!
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
