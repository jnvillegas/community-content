import { Head, Link } from '@inertiajs/react';
import { Image as ImageIcon, ArrowLeft, Eye, Edit } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Article {
    id: number;
    title: string;
    slug: string;
    featured_image: string | null;
}

interface Props {
    articles: Article[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Articles',
        href: '/articles',
    },
    {
        title: 'Gallery',
        href: '/articles/gallery',
    },
];

export default function Gallery({ articles }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Article Gallery" />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            {/* <Button variant="ghost" size="icon" asChild className="-ml-2 h-8 w-8">
                                <Link href="/articles">
                                    <ArrowLeft className="h-4 w-4" />
                                </Link>
                            </Button> */}
                            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Article Gallery</h1>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">A visual overview of your article featured images.</p>
                    </div>
                </div>

                {articles.length === 0 ? (
                    <Card className="border-card shadow-sm bg-background/50 dark:bg-card/30 h-64 flex flex-col items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-gray-200 mb-2" />
                        <p className="text-gray-500 font-medium">No articles with images found</p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {articles.map((article) => (
                            <Card key={article.id} className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-neutral-900">
                                <CardContent className="p-0">
                                    <div className="relative aspect-video overflow-hidden">
                                        {article.featured_image ? (
                                            <img
                                                src={article.featured_image}
                                                alt={article.title}
                                                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                                <ImageIcon className="h-8 w-8 text-neutral-300" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button variant="secondary" size="sm" asChild className="rounded-full h-9 w-9 p-0">
                                                <Link href={`/articles/${article.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="secondary" size="sm" asChild className="rounded-full h-9 w-9 p-0">
                                                <Link href={`/articles/${article.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-blue-500 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider font-semibold">
                                            /{article.slug}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
