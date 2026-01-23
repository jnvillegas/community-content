import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import PostForm from './PostForm';

export default function Create() {
    const breadcrumbs = [
        {
            title: 'Blog Posts',
            href: '/posts',
        },
        {
            title: 'Create Post',
            href: '/posts/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />

            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                        Create New Post
                    </h1>
                    <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
                        Draft a new entry for your blog with flexible custom attributes.
                    </p>
                </div>

                <PostForm />
            </div>
        </AppLayout>
    );
}
