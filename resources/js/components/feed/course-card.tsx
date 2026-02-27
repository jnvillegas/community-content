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
        <article className="glass-card rounded-xl overflow-hidden group transition-all duration-500 hover:shadow-2xs hover:shadow-black/40 bg-background border border-gray-200 dark:border-white/5 w-[100%] mb-10">
            {/* Imagen superior - aspect-video */}
            <div className="relative aspect-video overflow-hidden">
                {course.cover_image ? (
                    <img
                        src={course.cover_image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a2a1a] to-[#0f0f0f] flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white/30" />
                    </div>
                )}

                {/* Tag superior izquierdo */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-zinc-900/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10">
                        COURSE
                    </span>
                </div>
            </div>

            {/* Contenido inferior */}
            <div className="p-6 md:p-8">
                {/* Título */}
                <h2 className="text-2xl font-bold leading-tight text-zinc-800 dark:text-white transition-colors mb-4">
                    {course.title}
                </h2>

                {/* Descripción */}
                {course.description ? (
                    <p className="text-slate-400 text-base leading-relaxed mb-6 line-clamp-3">
                        {course.description}
                    </p>
                ) : (
                    <p className="text-slate-500 text-base mb-6 line-clamp-3">
                        Curso disponible para aprender
                    </p>
                )}

                {/* Info del instructor y módulos */}
                {/* <div className="flex flex-wrap items-center gap-5 md:gap-6 mb-8 text-sm text-zinc-800 dark:text-white">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{course.instructor.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        <span>{course.modules_count} módulos</span>
                    </div>
                </div> */}

                {/* Footer: botón principal */}
                <div className="flex items-center justify-between pt-6 border-t border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        <span>{course.modules_count} módulos</span>
                    </div>
                    <Link
                        href={`/academy/${course.slug}`}
                        className="bg-[#1d9bf0] text-white font-bold py-3 px-6 md:px-8 rounded-xl transition-all transform active:scale-95 flex items-center gap-2 text-base"
                    >
                        See Course
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
