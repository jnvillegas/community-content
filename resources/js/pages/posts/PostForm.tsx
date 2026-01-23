import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Post } from '@/types';
import { useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    post?: Post | null;
}

interface Attribute {
    key: string;
    value: string;
}

export default function PostForm({ post: editingPost }: Props) {
    const isEditing = !!editingPost;
    const [attributes, setAttributes] = useState<Attribute[]>([]);

    const { data, setData, post, put, processing, errors, transform } = useForm<{
        title: string;
        content: string;
        attributes: Record<string, string> | null;
    }>({
        title: editingPost?.title || '',
        content: editingPost?.content || '',
        attributes: editingPost?.attributes || null,
    });

    useEffect(() => {
        if (editingPost?.attributes) {
            const attrs = Object.entries(editingPost.attributes).map(([key, value]) => ({
                key,
                value: String(value),
            }));
            setAttributes(attrs);
        }
    }, [editingPost]);

    const handleAttributeChange = (index: number, field: 'key' | 'value', value: string) => {
        const newAttributes = [...attributes];
        newAttributes[index][field] = value;
        setAttributes(newAttributes);
    };

    const addAttribute = () => {
        setAttributes([...attributes, { key: '', value: '' }]);
    };

    const removeAttribute = (index: number) => {
        const newAttributes = [...attributes];
        newAttributes.splice(index, 1);
        setAttributes(newAttributes);
    };

    transform((data) => ({
        ...data,
        attributes: attributes.reduce((acc, curr) => {
            if (curr.key.trim()) acc[curr.key.trim()] = curr.value;
            return acc;
        }, {} as Record<string, string>),
    }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && editingPost) {
            put(`/posts/${editingPost.id}`);
        } else {
            post('/posts');
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="title" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Title</Label>
                    <Input
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="My Awesome Post"
                        className="h-11 text-lg font-medium bg-gray-50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors"
                        required
                    />
                    {errors.title && (
                        <p className="text-sm text-red-500 font-medium">
                            {errors.title}
                        </p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="content" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Content</Label>
                    <Textarea
                        id="content"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        placeholder="Write something amazing..."
                        className="min-h-[250px] bg-gray-50 dark:bg-gray-800/50 focus:bg-white dark:focus:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors resize-y leading-relaxed"
                        required
                    />
                    {errors.content && (
                        <p className="text-sm text-red-500 font-medium">
                            {errors.content}
                        </p>
                    )}
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                        <Label className="text-base font-bold text-gray-800 dark:text-gray-100">Custom Attributes</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Add metadata to your post (Key: Value pairs)</p>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addAttribute}
                        className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Field
                    </Button>
                </div>

                <div className="space-y-3">
                    {attributes.map((attr, index) => (
                        <div key={index} className="flex gap-3 items-center group animate-in fade-in slide-in-from-top-2 duration-200">
                            <Input
                                placeholder="Attribute Key"
                                value={attr.key}
                                onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                                className="w-[35%] h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                            />
                            <Input
                                placeholder="Attribute Value"
                                value={attr.value}
                                onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                                className="flex-1 h-10 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all opacity-0 group-hover:opacity-100"
                                onClick={() => removeAttribute(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {attributes.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/30 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400">
                            <Plus className="w-8 h-8 mb-2 opacity-50" />
                            <p className="text-sm italic">Click "Add Field" to include custom post data.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => window.history.back()}
                    className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                    Discard Changes
                </Button>
                <Button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-11 shadow-md shadow-blue-500/20 transition-all active:scale-95"
                >
                    {isEditing ? 'Save Post' : 'Publish Post'}
                </Button>
            </div>
        </form>
    );
}
