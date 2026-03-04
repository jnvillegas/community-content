import { Download, ExternalLink } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function WallpaperCard({ activity }: { activity: any }) {
    const { subject } = activity;
    if (!subject) return null;

    return (
        <article className="glass-card rounded-xl overflow-hidden group transition-all duration-500 hover:shadow-2xs hover:shadow-black/40 bg-background border border-gray-200 dark:border-white/5 w-[100%] mb-10">
            <div className="relative aspect-video overflow-hidden">
                {subject.src ? (
                    <img
                        src={subject.src}
                        alt={subject.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
                    <h2 className="text-xl font-bold text-white mb-1">
                        {subject.title}
                    </h2>
                    <p className="text-white/70 text-sm">
                        {subject.category || 'Wallpaper'}
                    </p>
                </div>
            </div>

            <div className="p-4 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-2">
                    <img
                        src={subject.author?.avatar}
                        alt={subject.author?.name}
                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {subject.author?.name}
                    </span>
                </div>

                <div className="flex gap-2">
                    <a
                        href={route('wallpaper.download', subject.id)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                        title="Download"
                    >
                        <Download className="h-4 w-4" />
                    </a>
                    <Link
                        href={route('wallpapers.index')}
                        className="p-2 rounded-lg bg-[#1d9bf0] text-white hover:bg-[#1a8cd8] transition-colors"
                        title="View Gallery"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
