import { Link } from '@inertiajs/react';
import { ArrowRight, BookOpen } from 'lucide-react';

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
        <article className="glass-card bg-card rounded-xl overflow-hidden group transition-all duration-500 p-5">
            <div className="relative aspect-video overflow-hidden rounded-xl">
                {course.cover_image ? (
                    <Link href={`/academy/${course.slug}`}>
                        <img
                            src={course.cover_image}
                            alt={course.title}
                            className="w-full h-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-102"
                        />
                    </Link>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#000000] to-[#0f0f0f]" />
                )}

                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-zinc-900/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10">
                        COURSE
                    </span>
                </div>
            </div>

            <div className='flex flex-col sm:flex-row justify-between sm:items-center my-4 mb-0 gap-4'>
                <h2 className="text-xl sm:text-2xl m-0 font-bold leading-tight text-zinc-800 dark:text-white transition-colors">
                    {course.title}
                </h2>
                <Link href={`/academy/${course.slug}`} className='flex justify-center bg-background p-2 px-4 rounded-xl border-2 border-solid border-border cursor-pointer items-center gap-2 transition-all hover:bg-accent text-sm font-semibold whitespace-nowrap'>
                    Start Learning
                </Link>
            </div>
        </article>
    );
}
