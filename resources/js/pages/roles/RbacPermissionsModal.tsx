import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Permission, Role } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, Plus, Shield, X } from 'lucide-react';
import { useState } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
    role: Role | null;
}

export default function RbacPermissionsModal({ open, onClose, role }: Props) {
    const [newPermissionName, setNewPermissionName] = useState('');

    const { data, setData, post, put, processing, errors, reset } = useForm({
        permissions: [] as number[],
        newPermission: '',
    });

    const { permissions = [] } = (role || {}) as Role;
    const permissionIds = permissions.map((p: Permission) => p.id);

    const handleTogglePermission = (permissionId: number) => {
        const currentPermissions = data.permissions || [];
        const newPermissions = currentPermissions.includes(permissionId)
            ? currentPermissions.filter((id) => id !== permissionId)
            : [...currentPermissions, permissionId];
        setData('permissions', newPermissions);
    };

    const handleAddPermission = (e: React.FormEvent) => {
        e.preventDefault();
        setData('newPermission', newPermissionName);
        post('/permissions', {
            onSuccess: (page: any) => {
                const newPermission = page.props.flash?.new_permission;
                if (newPermission) {
                    setData('permissions', [
                        ...(data.permissions || []),
                        newPermission.id,
                    ]);
                }
                setNewPermissionName('');
            },
        });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (role) {
            put(`/roles/${role.id}/permissions`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Manage Permissions for {role?.name}
                    </DialogTitle>
                    <DialogDescription>
                        Assign permissions to this role or create new
                        permissions.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="newPermission">
                            Add New Permission
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="newPermission"
                                value={newPermissionName}
                                onChange={(e) =>
                                    setNewPermissionName(e.target.value)
                                }
                                placeholder="e.g., edit posts, delete users"
                                disabled={processing}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handleAddPermission}
                                disabled={!newPermissionName || processing}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        {errors.newPermission && (
                            <p className="text-sm text-red-500">
                                {errors.newPermission}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label>Permissions</Label>
                        <ScrollArea className="h-[300px] rounded-md border p-4">
                            <div className="space-y-3">
                                {permissionIds.map((permissionId) => {
                                    const permission = permissions.find(
                                        (p: Permission) =>
                                            p.id === permissionId,
                                    );
                                    if (!permission) return null;

                                    const isChecked =
                                        data.permissions?.includes(
                                            permissionId,
                                        ) || false;

                                    return (
                                        <div
                                            key={permission.id}
                                            className="flex items-start space-x-3 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                                        >
                                            <Checkbox
                                                id={`permission-${permission.id}`}
                                                checked={isChecked}
                                                onCheckedChange={() =>
                                                    handleTogglePermission(
                                                        permission.id,
                                                    )
                                                }
                                                className="mt-0.5"
                                            />
                                            <div className="flex-1 space-y-1">
                                                <Label
                                                    htmlFor={`permission-${permission.id}`}
                                                    className="cursor-pointer font-normal"
                                                >
                                                    {permission.name}
                                                </Label>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {permission.guard_name}
                                                </p>
                                            </div>
                                            <div
                                                className={`h-2 w-2 rounded-full ${
                                                    isChecked
                                                        ? 'bg-green-500'
                                                        : 'bg-gray-300 dark:bg-gray-600'
                                                }`}
                                            />
                                        </div>
                                    );
                                })}
                                {permissions.length === 0 && (
                                    <div className="py-8 text-center text-gray-500">
                                        <Shield className="mx-auto mb-2 h-12 w-12 opacity-50" />
                                        <p>No permissions available</p>
                                        <p className="text-sm">
                                            Create a new permission above
                                        </p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                        {errors.permissions && (
                            <p className="text-sm text-red-500">
                                {errors.permissions}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            disabled={processing}
                        >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Check className="mr-2 h-4 w-4" />
                            Save Permissions
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
