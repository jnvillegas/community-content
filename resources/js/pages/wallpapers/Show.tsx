import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Edit, Download, Lock, Calendar, User, Eye } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Wallpaper } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Props {
    wallpaper: Wallpaper;
}

export default function Show({ wallpaper }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Wallpapers', href: '/wallpapers' },
        { title: wallpaper.title, href: `/wallpapers/${wallpaper.id}` },
    ];

    const getStatusBadge = (status: Wallpaper['status']) => {
        switch (status) {
            case 'published':
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Published</Badge>;
            case 'draft':
                return <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-none">Draft</Badge>;
            case 'archived':
                return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">Archived</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getCategoryBadge = (category: Wallpaper['category']) => {
        const colors = {
            mobile: 'bg-blue-100 text-blue-700',
            desktop: 'bg-purple-100 text-purple-700',
            both: 'bg-indigo-100 text-indigo-700',
        };
        return <Badge className={`${colors[category]} hover:${colors[category]} border-none capitalize`}>{category}</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={wallpaper.title} />

            <div className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950/20">
                {/* Fixed Top bar */}
                <div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 md:px-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild className="text-gray-500">
                            <Link href="/wallpapers">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800" />
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest">
                            Wallpaper Details
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" asChild>
                            <a href={wallpaper.src} target="_blank" rel="noopener noreferrer">
                                <Eye className="mr-2 h-4 w-4" />
                                View Full Size
                            </a>
                        </Button>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold">
                            <Link href={`/wallpapers/${wallpaper.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="mx-auto max-w-[1400px] p-4 md:p-8 space-y-8">
                    {/* Title & Status */}
                    <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                                {wallpaper.title}
                            </h1>
                            <div className="flex items-center gap-2">
                                {getStatusBadge(wallpaper.status)}
                                {wallpaper.is_featured && (
                                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none">
                                        Featured
                                    </Badge>
                                )}
                                {wallpaper.is_locked && (
                                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">
                                        <Lock className="mr-1 h-3 w-3" />
                                        Locked
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="font-medium">/{wallpaper.slug}</span>
                            <span>•</span>
                            {getCategoryBadge(wallpaper.category)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                        {/* Main Content */}
                        <div className="space-y-8">
                            {/* Image Preview */}
                            <Card className="border-none shadow-sm overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800">
                                        <img
                                            src={wallpaper.src}
                                            alt={wallpaper.alt || wallpaper.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {wallpaper.is_locked && (
                                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                                <div className="text-center text-white space-y-2">
                                                    <Lock className="h-12 w-12 mx-auto" />
                                                    <p className="font-bold text-xl">{wallpaper.lock_text}</p>
                                                    <p className="text-sm opacity-80">{wallpaper.lock_subtitle}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Description */}
                            {wallpaper.alt && (
                                <Card className="border-none shadow-sm">
                                    <CardHeader className="p-6">
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                            Description
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 pt-0">
                                        <p className="text-gray-700 dark:text-gray-300">{wallpaper.alt}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Lock Settings (if locked) */}
                            {wallpaper.is_locked && (
                                <Card className="border-none shadow-sm border-l-4 border-l-orange-500">
                                    <CardHeader className="p-6 bg-orange-50/20 dark:bg-orange-950/20">
                                        <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-600">
                                            <Lock className="h-4 w-4" />
                                            Lock Settings
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-3">
                                        <div>
                                            <p className="text-xs font-bold uppercase text-gray-500 mb-1">Lock Message</p>
                                            <p className="text-gray-900 dark:text-gray-100 font-medium">{wallpaper.lock_text}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase text-gray-500 mb-1">Lock Subtitle</p>
                                            <p className="text-gray-900 dark:text-gray-100 font-medium">{wallpaper.lock_subtitle}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Stats Card */}
                            <Card className="border-none shadow-sm">
                                <CardHeader className="p-6">
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                        Statistics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Downloads</span>
                                        <div className="flex items-center gap-2">
                                            <Download className="h-4 w-4 text-gray-400" />
                                            <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                                                {wallpaper.downloads_count}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Image Details Card */}
                            <Card className="border-none shadow-sm">
                                <CardHeader className="p-6">
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                        Image Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 space-y-3">
                                    {wallpaper.resolution && (
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-500">Resolution</span>
                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {wallpaper.resolution}
                                            </span>
                                        </div>
                                    )}
                                    {wallpaper.file_size && (
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-500">File Size</span>
                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {wallpaper.file_size}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Category</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                                            {wallpaper.category}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Metadata Card */}
                            <Card className="border-none shadow-sm bg-gray-50/50 dark:bg-gray-900/50">
                                <CardHeader className="p-6">
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500">
                                        Metadata
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 space-y-3">
                                    {wallpaper.author && (
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-gray-400" />
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500">Author</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {wallpaper.author.name}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <Separator className="bg-gray-100 dark:bg-gray-800" />
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500">Created</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {new Date(wallpaper.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <Separator className="bg-gray-100 dark:bg-gray-800" />
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500">Updated</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {new Date(wallpaper.updated_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    {wallpaper.published_at && (
                                        <>
                                            <Separator className="bg-gray-100 dark:bg-gray-800" />
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500">Published</p>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {new Date(wallpaper.published_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Actions Card */}
                            <Card className="border-none shadow-sm">
                                <CardHeader className="p-6">
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                                        Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 space-y-2">
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <a href={wallpaper.src} download>
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Image
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <a href={wallpaper.src} target="_blank" rel="noopener noreferrer">
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Full Size
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
