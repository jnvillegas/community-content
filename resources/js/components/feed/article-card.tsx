import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ArticleCard({ activity }: { activity: any }) {
    const { subject } = activity;
    if (!subject) return null;

    return (
        <article className="glass-card rounded-xl overflow-hidden group transition-all duration-500 hover:shadow-2xs hover:shadow-black/40 bg-background border border-gray-200 dark:border-white/5 w-[100%] mb-10">
            <div className="relative aspect-video overflow-hidden">
                {subject.cover_image || subject.content_url || subject.featured_image ? (
                    <img
                        src={subject.cover_image || subject.content_url || `storage/${subject.featured_image}`}
                        alt={subject.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a2a1a] to-[#0f0f0f]" />
                )}
            </div>

            <div className="p-6 md:p-8">
                <div className="flex justify-between items-start gap-4 mb-4">
                    <h2 className="text-2xl font-bold leading-tight text-zinc-800 dark:text-white transition-colors">
                        {subject.title}
                    </h2>
                </div>

                <p className="text-slate-400 text-base leading-relaxed mb-6 line-clamp-3">
                    {subject.excerpt || subject.description || 'Contenido disponible ahora.'}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-black/10 dark:border-white/10">
                    <div className="ml-auto">
                        <Link
                            href={`/articles/${subject.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#1d9bf0] text-white font-bold py-3 px-6 md:px-8 rounded-xl transition-all transform active:scale-95 flex items-center gap-2 text-base"
                        >
                            More Details
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
