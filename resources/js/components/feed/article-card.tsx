import { Share2, ArrowRight } from 'lucide-react';
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


/*
    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: subject.title,
                url: `/articles/${subject.id}`,
            }).catch(() => {
                // Fallback or silent fail
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(`${window.location.origin}/articles/${subject.id}`);
            alert('Enlace copiado al portapapeles');
        }
    };*/
/*
    return (
        <article className="glass-card rounded-2xl overflow-hidden group transition-all duration-500 hover:shadow-xl hover:shadow-black/10 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 w-full mb-8 flex flex-col md:flex-row gap-6 p-4 md:p-6 text-left">
           
            <div className="relative w-full md:w-1/3 aspect-video md:aspect-square shrink-0">
                {subject.cover_image || subject.content_url || subject.featured_image ? (
                    <img
                        src={subject.cover_image || subject.content_url || subject.featured_image}
                        alt={subject.title}
                        className="w-full h-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105 shadow-sm"
                    />
                ) : (
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border border-gray-100 dark:border-white/5" />
                )}
            </div>

          
            <div className="flex flex-col flex-1 justify-between py-1">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Link href={`/articles/${subject.id}`}>
                            <h2 className="text-2xl md:text-3xl font-bold leading-tight text-zinc-900 dark:text-white hover:text-[#1d9bf0] transition-colors cursor-pointer">
                                {subject.title}
                            </h2>
                        </Link>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
                            {subject.excerpt || subject.description || 'Explora nuestro último contenido de la comunidad.'}
                        </p>
                    </div>
                </div>

            
                <div className="mt-8">
                    
                    <div className="border-t border-b border-zinc-100 dark:border-white/10 py-2 mb-1">
                        <div className="flex items-center gap-3 px-1">
                            <span className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold italic">Article</span>
                            <span className="text-zinc-300 dark:text-zinc-600">•</span>
                            <span className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold">
                                {subject.formatted_date || 'Recientemente'}
                            </span>
                        </div>
                    </div>

                   
                    <div className="flex items-center justify-between">
                        <Link
                            href={`/articles/${subject.id}`}
                            className="text-[#1d9bf0] hover:text-[#1d9bf0]/80 font-bold text-[15px] flex items-center gap-2 transition-all hover:translate-x-1"
                        >
                            Read Article
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <button
                            onClick={handleShare}
                            className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 text-zinc-500 hover:text-[#1d9bf0] hover:bg-zinc-100 dark:hover:bg-white/10 transition-all transform active:scale-95 border border-zinc-100 dark:border-white/5"
                            title="Share Article"
                        >
                            <Share2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
*/}