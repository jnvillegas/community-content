import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    ChevronRight,
    Plus,
    Users,
    CheckCircle2,
    BarChart3
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
import { BreadcrumbItem } from '@/types';

interface CourseStat {
    id: number;
    title: string;
    slug: string;
    modules_count: number;
    students_count: number;
}

interface Stats {
    total_students: number;
    total_courses: number;
    total_completions: number;
    average_progress: number;
}

interface Props {
    stats: Stats;
    courses: CourseStat[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Academy',
        href: '/admin/academy',
    },
    {
        title: 'Dashboard',
        href: '/admin/academy',
    },
];

export default function AcademyDashboard({ stats, courses }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Academy Dashboard" />

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Header Actions */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Academy Dashboard</h1>
                        <p className="text-muted-foreground">Monitor course performance and student engagement.</p>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-border/50 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_students}</div>
                            <p className="text-xs text-muted-foreground mt-1">Unique active learners</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Active Courses</CardTitle>
                            <BookOpen className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_courses}</div>
                            <p className="text-xs text-muted-foreground mt-1">Published materials</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Completions</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.total_completions}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total lessons finished</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50 shadow-sm transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Avg. Progress</CardTitle>
                            <BarChart3 className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats.average_progress}%</div>
                            <p className="text-xs text-muted-foreground mt-1">Global engagement rate</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Course List */}
                <Card className="border-border/50">
                    <CardHeader>
                        <CardTitle>Course Performance</CardTitle>
                        <CardDescription>
                            Overview of student enrollment and content structure for each course.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course Title</TableHead>
                                    <TableHead className="text-center">Modules</TableHead>
                                    <TableHead className="text-center">Students</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow key={course.id} className="hover:bg-muted/30">
                                        <TableCell className="font-semibold">{course.title}</TableCell>
                                        <TableCell className="text-center">{course.modules_count}</TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Users className="h-3 w-3 text-muted-foreground" />
                                                {course.students_count}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/academy/${course.slug}`}>
                                                    View
                                                    <ChevronRight className="h-4 w-4 ml-1" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {courses.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No courses found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
