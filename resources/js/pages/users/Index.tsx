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
import { PageProps, Role, User } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import UserModal from './UserModal';

interface UsersPageProps extends PageProps {
    users: {
        data: User[];
        links: any[];
    };
    roles: Role[];
}

export default function Index({ auth, users, roles }: UsersPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const { flash } = usePage<any>().props;

    const handleCreate = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (user: User) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${user.id}`);
        }
    };

    const breadcrumbs = [
        {
            title: 'Users',
            href: '/users',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">User Management</h1>
                    <Button onClick={handleCreate}>
                        <Plus className="w-4 h-4 mr-2" />
                        New User
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
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.roles && user.roles.length > 0 ? (
                                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 rounded-md bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400">
                                                {user.roles[0].name}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500">No Role</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(user)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                onClick={() => handleDelete(user)}
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

                {users.links && users.links.length > 3 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-1">
                            {users.links.map((link, i) => (
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

            <UserModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={editingUser}
                roles={roles}
            />
        </AppLayout>
    );
}
