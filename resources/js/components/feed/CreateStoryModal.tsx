import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { ImagePlus, X, Loader2 } from "lucide-react";

interface CreateStoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    story?: {
        id: number;
        title: string;
        description: string;
        images: { id: number; url: string }[];
    } | null;
}

export default function CreateStoryModal({ isOpen, onClose, story }: CreateStoryModalProps) {
    const [previews, setPreviews] = useState<{ id?: number; url: string }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, patch, processing, errors, reset, clearErrors, transform } = useForm({
        title: '',
        description: '',
        images: [] as File[],
        deleted_image_ids: [] as number[],
        _method: '', // Helper for multipart PATCH
    });

    // Inertia transform to remove _method if it's empty (for POST requests)
    transform((data) => {
        if (!data._method) {
            const { _method, ...rest } = data;
            return rest;
        }
        return data;
    });

    // Update form and previews when story prop changes
    useEffect(() => {
        if (story) {
            setData({
                title: story.title,
                description: story.description || '',
                images: [],
                deleted_image_ids: [],
                _method: 'PATCH',
            });
            setPreviews(story.images || []);
        } else {
            setData({
                title: '',
                description: '',
                images: [],
                deleted_image_ids: [],
                _method: '',
            });
            clearErrors();
            setPreviews([]);
        }
    }, [story, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setData('images', [...data.images, ...files]);

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviews(prev => [...prev, { url: reader.result as string }]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        const item = previews[index];

        if (item.id) {
            // Existing image from story
            setData('deleted_image_ids', [...data.deleted_image_ids, item.id]);
        } else {
            // Newly added file
            // We need to find the correct index in context of data.images
            // newly added items follow existing ones in previews
            const existingCount = story?.images.filter(img => !data.deleted_image_ids.includes(img.id)).length || 0;
            const newImageIndex = previews.filter((p, i) => i < index && !p.id).length;
            const newImages = [...data.images];
            newImages.splice(newImageIndex, 1);
            setData('images', newImages);
        }

        const newPreviews = [...previews];
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleClose = () => {
        reset();
        clearErrors();
        setPreviews([]);
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (story) {
            // Inertia patch helper doesn't support files well in some Laravel versions 
            // but we use post with _method: PATCH for multipart
            post(route('stories.update', story.id), {
                onSuccess: () => handleClose(),
                forceFormData: true,
            });
        } else {
            post(route('stories.store'), {
                onSuccess: () => handleClose(),
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-sidebar p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-xl font-bold">
                        {story ? 'Editar historia' : 'Crea una nueva historia'}
                    </DialogTitle>
                    <DialogDescription>
                        {story ? 'Modifica los detalles e imágenes de tu historia.' : 'Comparte momentos exclusivos con tu comunidad.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-4 space-y-4 flex flex-col gap-2">
                    <div className="space-y-2 flex flex-col gap-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            placeholder="Dale un nombre a tu historia"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={errors.title ? 'border-red-500' : ''}
                        />
                        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                    </div>

                    <div className="space-y-2 flex flex-col gap-2">
                        <Label htmlFor="description">Descripción (opcional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Añade un poco más de contexto..."
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="resize-none"
                            rows={2}
                        />
                    </div>

                    <div className="space-y-4 flex flex-col flex-wrap gap-4">
                        <Label>{story ? 'Gestionar imágenes' : 'Imágenes de la historia'}</Label>

                        {previews.length === 0 && (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-[9/16] w-full max-w-[150px] mx-auto rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-100/20 flex flex-col items-center justify-center cursor-pointer transition-all"
                            >
                                <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-[10px] text-gray-500 text-center px-4 font-medium">Subir imágenes</span>
                            </div>
                        )}

                        {previews.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-1">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-[9/16] rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center transition-all hover:bg-gray-50 dark:hover:bg-white/5"
                                >
                                    <ImagePlus className="w-6 h-6 text-gray-400" />
                                </button>

                                {previews.map((preview, index) => (
                                    <div key={index} className="relative aspect-[9/16] rounded-lg border overflow-hidden bg-gray-100 group">
                                        <img src={preview.url} className="w-full h-full object-cover" alt={`Preview ${index}`} />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[8px] px-1 rounded">
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        {errors.images && <p className="text-xs text-red-500 text-center">{errors.images}</p>}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button type="button" variant="outline" className="flex-1" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="flex-1 bg-[#1a87cb] hover:bg-[#1a87cb]/90 font-bold" disabled={processing || (previews.length === 0)}>
                            {processing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {story ? 'Guardar cambios' : `Publicar (${data.images.length})`}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
