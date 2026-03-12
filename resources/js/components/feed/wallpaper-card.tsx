import { Download, ExternalLink } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function WallpaperCard({ activity }: { activity: any }) {
    const { subject } = activity;
    if (!subject) return null;

    return (
        <article className="glass-card bg-card rounded-xl overflow-hidden group transition-all duration-500 p-5">
            <div className="relative rounded-xl aspect-video overflow-hidden">
                {subject.src ? (
                    <img
                        src={subject.src}
                        alt={subject.title}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a2a1a] to-[#0f0f0f]" />
                )}

                <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md border border-white/10">
                        {subject.resolution || 'HD'}
                    </span>
                    {subject.is_locked && (
                        <span className="bg-amber-500/80 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md">
                            Premium
                        </span>
                    )}
                </div>

                {/* <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
                    <h2 className="text-xl font-bold text-white mb-1">
                        {subject.title}
                    </h2>
                    <p className="text-white/70 text-sm">
                        {subject.category || 'Wallpaper'}
                    </p>
                </div> */}
            </div>

            <div className="py-4 pb-0 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-2">
                    {subject.title}
                    {/* <img
                        src={subject.author?.avatar}
                        alt={subject.author?.name}
                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {subject.author?.name}
                    </span> */}
                </div>

                <div className="flex gap-2">
                    <a
                        href={route('wallpaper.download', subject.id)}
                        className="flex bg-background p-2 rounded-xl border-2 border-solid border-border items-center gap-2 text-zinc-800 dark:text-white transition-colors"
                        title="Download"
                    >
                        <Download className="h-4 w-4" />
                    </a>
                    <Link
                        href={route('wallpapers.index')}
                        className="flex bg-background p-2 rounded-xl border-2 border-solid border-border items-center gap-2 text-zinc-800 dark:text-white transition-colors"
                        title="View Gallery"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
