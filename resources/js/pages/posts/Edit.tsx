import AppLayout from '@/layouts/app-layout';
import { Post } from '@/types';
import { Head } from '@inertiajs/react';
import PostForm from './PostForm';

interface Props {
    post: Post;
}

export default function Edit({ post }: Props) {
    const breadcrumbs = [
        {
            title: 'Blog Posts',
            href: '/posts',
        },
        {
            title: 'Edit Post',
            href: `/posts/${post.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${post.title}`} />

            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                        Edit Post
                    </h1>
                    <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
                        Update the content and metadata for <span className="font-semibold text-blue-600">"{post.title}"</span>.
                    </p>
                </div>

                <PostForm post={post} />
            </div>
        </AppLayout>
    );
}
