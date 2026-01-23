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
import { PageProps, Role } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import RoleModal from './RoleModal';

interface RolesPageProps extends PageProps {
    roles: {
        data: Role[];
        links: any[];
    };
}

export default function Index({ roles }: RolesPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const { flash } = usePage<any>().props;

    const handleCreate = () => {
        setEditingRole(null);
        setIsModalOpen(true);
    };

    const handleEdit = (role: Role) => {
        setEditingRole(role);
        setIsModalOpen(true);
    };

    const handleDelete = (role: Role) => {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(`/roles/${role.id}`);
        }
    };

    const breadcrumbs = [
        {
            title: 'Roles',
            href: '/roles',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Role Management</h1>
                    <Button onClick={handleCreate}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Role
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
                            {roles.data.map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell className="font-medium">{role.name}</TableCell>
                                    <TableCell>{role.guard_name}</TableCell>
                                    <TableCell>
                                        {new Date(role.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(role)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                onClick={() => handleDelete(role)}
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

                {roles.links && roles.links.length > 3 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-1">
                            {roles.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 text-sm rounded ${link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white border text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <RoleModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                role={editingRole}
            />
        </AppLayout>
    );
}
