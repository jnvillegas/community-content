import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { GraduationCap } from 'lucide-react';
import CourseCard from '@/components/feed/course-card';

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string;
    instructor: {
        name: string;
        avatar: string;
    };
    modules_count: number;
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

            <div className="p-4 md:p-8 space-y-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
                        {/* <GraduationCap className="h-8 w-8 text-primary" /> */}
                        Academy Courses
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Empower your creative journey with our expert-led courses.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
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
