import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import { ImagePlus, X, Loader2 } from "lucide-react";

interface CreateStoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateStoryModal({ isOpen, onClose }: CreateStoryModalProps) {
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '',
        description: '',
        images: [] as File[],
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setData('images', [...data.images, ...files]);

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviews(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);

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
        post('/stories', {
            onSuccess: () => handleClose(),
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-950 p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-xl font-bold">Crear nueva historia</DialogTitle>
                    <DialogDescription>
                        Comparte momentos con tu comunidad. Ahora puedes subir varias imágenes.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
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

                    <div className="space-y-2">
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

                    <div className="space-y-4">
                        <Label>Imágenes de la historia</Label>

                        {previews.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-1">
                                {previews.map((preview, index) => (
                                    <div key={index} className="relative aspect-[9/16] rounded-lg border overflow-hidden bg-gray-100">
                                        <img src={preview} className="w-full h-full object-cover" alt={`Preview ${index}`} />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full shadow-md hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[8px] px-1 rounded">
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-[9/16] rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-gray-50 transition-all"
                                >
                                    <ImagePlus className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>
                        )}

                        {previews.length === 0 && (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-[9/16] w-full max-w-[150px] mx-auto rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                            >
                                <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-[10px] text-gray-500 text-center px-4 font-medium">Subir imágenes</span>
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
                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 font-bold" disabled={processing || data.images.length === 0}>
                            {processing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Publicar ({data.images.length})
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
