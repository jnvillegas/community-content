import { Link } from '@inertiajs/react';
import { BookOpen, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CourseCardProps {
    course: {
        id: number;
        title: string;
        description: string;
        cover_image: string;
        slug: string;
        instructor: {
            name: string;
            avatar: string;
        };
        modules_count: number;
    };
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
        <Link href={`/academy/${course.slug}`}>
            <Card className="overflow-hidden h-full grow hover:shadow-lg transition-all duration-200 cursor-pointer border-0 bg-white dark:bg-zinc-800">
                {/* Course Cover Image */}
                <div className="relative h-48 overflow-hidden bg-linear-to-br from-blue-400 to-blue-600">
                    {course.cover_image ? (
                        <img
                            src={course.cover_image}
                            alt={course.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-white/50" />
                        </div>
                    )}
                </div>

                {/* Course Info */}
                <CardContent className="pt-4 pb-3 px-4">
                    <h3 className="font-bold text-base line-clamp-2 text-gray-900 dark:text-white mb-1">
                        {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                        {course.description}
                    </p>

                    {/* Instructor Info */}
                    <div className="flex items-center gap-2 mb-4">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                            <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                                {course.instructor.name}
                            </p>
                        </div>
                    </div>

                    {/* Modules Count */}
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.modules_count} módulos</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
