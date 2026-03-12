import React, { useRef } from 'react';
import axios from 'axios';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Color from '@tiptap/extension-color';
import { FontSize } from '@/extensions/font-size';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered, Quote, ImageIcon, Link as LinkIcon
} from 'lucide-react';

interface TipTapEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const TipTapEditor = ({ content, onChange, placeholder = 'Start writing...' }: TipTapEditorProps) => {
    const [fontFamily, setFontFamily] = React.useState('Inter');
    const [fontSize, setFontSize] = React.useState('16px');
    const imageInputRef = useRef<HTMLInputElement>(null);
    const editorReady = useRef(false);

    const syncState = React.useCallback((editor: any) => {
        const attrs = editor.getAttributes('textStyle');
        const font = attrs.fontFamily?.replace(/['"]+/g, '') || 'Inter';
        const size = attrs.fontSize || '16px';
        setFontFamily(font);
        setFontSize(size);
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            FontFamily,
            Color,
            FontSize,
            Image,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder }),
        ],
        content: content,
        onCreate: () => {
            // Mark as ready after initialization completes
            // This prevents onUpdate from overwriting the original content
            // during TipTap's HTML normalization phase
            requestAnimationFrame(() => {
                editorReady.current = true;
            });
        },
        onUpdate: ({ editor }) => {
            // Only propagate changes AFTER initialization is complete
            // TipTap normalizes HTML on init which can truncate base64 images
            if (editorReady.current) {
                onChange(editor.getHTML());
            }
        },
        onSelectionUpdate: ({ editor }) => syncState(editor),
        onTransaction: ({ editor }) => syncState(editor),
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-6 py-4'
            }
        },
    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = () => {
        imageInputRef.current?.click();
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post('/content-images', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response.data?.url) {
                    editor.chain().focus().setImage({ src: response.data.url }).run();
                }
            } catch (error) {
                console.error('Failed to upload image:', error);
            }
        }
        // Reset input
        e.target.value = '';
    };

    return (
        <div className="flex flex-col min-h-[500px]">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 p-2">
                {/* Font Family Selector */}
                <Select
                    value={fontFamily}
                    onValueChange={(value) => {
                        setFontFamily(value);
                        editor.chain().focus().setFontFamily(value).run();
                    }}
                >
                    <SelectTrigger className="w-[140px] h-8 text-xs bg-white dark:bg-gray-950">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Inter">Inter (Sans)</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Playfair Display">Playfair (Serif)</SelectItem>
                        <SelectItem value="monospace">Monospace</SelectItem>
                        <SelectItem value="cursive">Cursive</SelectItem>
                    </SelectContent>
                </Select>

                {/* Font Size Selector */}
                <Select
                    value={fontSize}
                    onValueChange={(value) => {
                        setFontSize(value);
                        editor.chain().focus().setFontSize(value).run();
                    }}
                >
                    <SelectTrigger className="w-[80px] h-8 text-xs bg-white dark:bg-gray-950">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="12px">12px</SelectItem>
                        <SelectItem value="14px">14px</SelectItem>
                        <SelectItem value="16px">16px</SelectItem>
                        <SelectItem value="18px">18px</SelectItem>
                        <SelectItem value="20px">20px</SelectItem>
                        <SelectItem value="24px">24px</SelectItem>
                        <SelectItem value="30px">30px</SelectItem>
                        <SelectItem value="36px">36px</SelectItem>
                    </SelectContent>
                </Select>

                <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-700 mx-1" />

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-800' : ''}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-800' : ''}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'bg-gray-200 dark:bg-gray-800' : ''}
                >
                    <Strikethrough className="h-4 w-4" />
                </Button>
                <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-700 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-800' : ''}
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-800' : ''}
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-700 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-800' : ''}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-800' : ''}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-700 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-gray-800' : ''}
                >
                    <Quote className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={setLink} className={editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-800' : ''}>
                    <LinkIcon className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={addImage}>
                    <ImageIcon className="h-4 w-4" />
                </Button>
                <input
                    type="file"
                    ref={imageInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>

            {/* Content using tailwind typography */}
            <div className="flex-1 overflow-y-auto cursor-text" onClick={() => editor.chain().focus().run()}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .ProseMirror img.ProseMirror-selectednode {
                        outline: 3px solid #3b82f6 !important;
                        outline-offset: 2px;
                        box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.3);
                        border-radius: 2px;
                    }
                    .ProseMirror img {
                        cursor: pointer;
                        transition: outline 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
                    }
                `}} />
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default TipTapEditor;
