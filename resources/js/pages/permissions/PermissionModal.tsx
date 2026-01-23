import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Permission } from '@/types';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
    permission?: Permission | null;
}

export default function PermissionModal({ open, onClose, permission }: Props) {
    const isEditing = !!permission;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
    });

    useEffect(() => {
        if (permission) {
            setData({
                name: permission.name,
            });
        } else {
            reset();
        }
    }, [permission, open]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && permission) {
            put(`/permissions/${permission.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post('/permissions', {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Permission' : 'Create Permission'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Update permission name.'
                            : 'Add a new permission to the system.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="edit posts"
                            required
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {isEditing ? 'Save Changes' : 'Create Permission'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
