import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    unread_notifications_count: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: Auth;
    flash: {
        success: string | null;
        error: string | null;
    };
};

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions?: Permission[];
}

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    attributes: Record<string, string> | null;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    roles?: Role[]; // Added roles
    [key: string]: unknown;
}

export interface Wallpaper {
    id: number;
    title: string;
    slug: string;
    alt: string | null;
    src: string;
    is_locked: boolean;
    lock_text: string | null;
    lock_subtitle: string | null;
    category: 'mobile' | 'desktop' | 'both';
    resolution: string | null;
    file_size: string | null;
    downloads_count: number;
    is_featured: boolean;
    status: 'draft' | 'published' | 'archived';
    published_at: string | null;
    author_id: number | null;
    author?: User;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
