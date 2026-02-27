import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PageProps, Permission } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import PermissionModal from './PermissionModal';

interface PermissionsPageProps extends PageProps {
    permissions: {
        data: Permission[];
        links: any[];
    };
}

export default function Index({ permissions }: PermissionsPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
    const { flash } = usePage<any>().props;

    const handleCreate = () => {
        setEditingPermission(null);
        setIsModalOpen(true);
    };

    const handleEdit = (permission: Permission) => {
        setEditingPermission(permission);
        setIsModalOpen(true);
    };

    const handleDelete = (permission: Permission) => {
        if (confirm('Are you sure you want to delete this permission?')) {
            router.delete(`/permissions/${permission.id}`);
        }
    };

    const breadcrumbs = [
        {
            title: 'Permissions',
            href: '/permissions',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Permission Management</h1>
                    <Button onClick={handleCreate}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Permission
                    </Button>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-900/30 dark:text-green-400">
                        {flash.success}
                    </div>
                )}

                <div className="border rounded-lg shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Guard Name</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {permissions.data.map((permission) => (
                                <TableRow key={permission.id}>
                                    <TableCell className="font-medium">{permission.name}</TableCell>
                                    <TableCell>{permission.guard_name}</TableCell>
                                    <TableCell>
                                        {new Date(permission.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(permission)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                onClick={() => handleDelete(permission)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {permissions.links && permissions.links.length > 3 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-1">
                            {permissions.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 text-sm rounded ${link.active
                                        ? 'bg-black/30 text-white dark:border-neutral-100'
                                        : 'bg-white border text-gray-700 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-gray-300'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <PermissionModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                permission={editingPermission}
            />
        </AppLayout>
    );
}
