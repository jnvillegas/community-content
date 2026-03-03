import { Head, Link } from '@inertiajs/react';
import { Plus, Download, Eye, MapPin, MoreHorizontal, Edit, Trash2, Smartphone, Monitor } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from "@/lib/utils";

interface Wallpaper {
    id: number;
    title: string;
    src: string;
    category: 'mobile' | 'desktop' | 'both';
    resolution?: string;
    file_size?: string;
    author?: {
        name: string;
    };
    created_at: string;
}

interface Props {
    wallpapers: Wallpaper[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Wallpapers', href: '/wallpapers' },
    { title: 'Gallery', href: '/wallpapers/gallery' },
];

export default function Gallery({ wallpapers }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Wallpaper Gallery" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white uppercase italic">
                            Wallpaper <span className="text-primary-500">Gallery</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Stunning visuals for your devices, captured by our explorers.</p>
                    </div>
                    <Button asChild>
                        <Link href="/wallpapers/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Upload Wallpaper
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wallpapers.length === 0 ? (
                        <div className="col-span-full py-32 text-center border-2 border-dashed border-muted rounded-3xl">
                            <p className="text-gray-400 font-bold uppercase tracking-widest">No wallpapers found</p>
                            <Button variant="link" asChild className="mt-2">
                                <Link href="/wallpapers/create">Upload your first wallpaper</Link>
                            </Button>
                        </div>
                    ) : (
                        wallpapers.map((wallpaper) => (
                            <div key={wallpaper.id} className="group relative bg-background dark:bg-card border border-muted rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={wallpaper.src}
                                        alt={wallpaper.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Link Overlay */}
                                    <Link href={`/wallpapers/${wallpaper.id}`} className="absolute inset-0 z-0" />

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3 flex gap-1">
                                        {(wallpaper.category === 'mobile' || wallpaper.category === 'both') && (
                                            <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-white">
                                                <Smartphone className="w-3.5 h-3.5" />
                                            </div>
                                        )}
                                        {(wallpaper.category === 'desktop' || wallpaper.category === 'both') && (
                                            <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-white">
                                                <Monitor className="w-3.5 h-3.5" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <Button size="icon" variant="secondary" className="rounded-full h-10 w-10" asChild>
                                            <a href={`/wallpapers/${wallpaper.id}/download`} download>
                                                <Download className="h-5 w-5" />
                                            </a>
                                        </Button>
                                        <Button size="icon" variant="primary" className="rounded-full h-10 w-10" asChild>
                                            <Link href={`/wallpapers/${wallpaper.id}`}>
                                                <Eye className="h-5 w-5" />
                                            </Link>
                                        </Button>
                                    </div>

                                    {/* Resolution Badge */}
                                    {wallpaper.resolution && (
                                        <div className="absolute bottom-3 right-3 bg-primary-500/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-black uppercase text-white tracking-wider">
                                            {wallpaper.resolution}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex justify-between gap-2 items-start">
                                        <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1 leading-tight group-hover:text-primary-500 transition-colors">
                                            {wallpaper.title}
                                        </h3>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors shrink-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/wallpapers/${wallpaper.id}/edit`} className="cursor-pointer">
                                                        <Edit className="mr-2 h-3.5 w-3.5" /> Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-500">
                                                    <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                        <span>{wallpaper.author?.name || 'Explorer'}</span>
                                        <span>{wallpaper.file_size || ''}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
