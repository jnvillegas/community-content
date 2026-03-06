import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ArticleCard({ activity }: { activity: any }) {
    const { subject } = activity;
    if (!subject) return null;

    console.log("article", subject)

    return (
        <article className="glass-card bg-card rounded-xl overflow-hidden group transition-all duration-500 p-5">
            <div className="relative aspect-video overflow-hidden rounded-xl">
                {subject.cover_image || subject.content_url || subject.featured_image ? (
                    <Link href={subject.slug ? `/events/${subject.slug}` : '#'} >
                        <img
                            src={subject.cover_image || subject.content_url || subject.featured_image}
                            alt={subject.title}
                            className="w-full h-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-102"
                        />
                    </Link>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#000000] to-[#0f0f0f]" />
                )}

                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-zinc-900/20 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10">
                        ARTICLE
                    </span>
                </div>
            </div>

            <div className='flex justify-between items-center my-4 mb-0'>
                <h2 className="text-2xl m-0 font-bold leading-tight text-zinc-800 dark:text-white transition-colors">
                    {subject.title}
                </h2>
                <Link href={subject.slug ? `/events/${subject.slug}` : '#'} className='flex bg-background p-2 rounded-2xl border-2 border-solid border-border cursor-pointer items-center gap-2 transition-all'>
                    Reading
                </Link>
            </div>
        </article>
    );
}
