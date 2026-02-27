import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    permissions: string[]; // Added permissions list
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
    permission?: string; // Added permission requirement
    onClick?: () => void;
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

export interface EventCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    color?: string;
    icon?: string;
    created_at: string;
    updated_at: string;
}

export interface Event {
    id: number;
    title: string;
    slug: string;
    description: string;
    type: 'WORKSHOP' | 'MEETUP' | 'WEBINAR' | 'TRIP';
    status: 'DRAFT' | 'PUBLISHED' | 'COMPLETED' | 'CANCELLED';
    start_date: string;
    end_date: string;
    registration_deadline: string | null;
    max_attendees: number | null;
    active_registrations_count?: number;
    requires_subscription: boolean;
    location: string | null;
    location_url: string | null;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    virtual_url: string | null;
    cover_image: string | null;
    created_by: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    categories?: EventCategory[];
    creator?: User;
    registrations?: any[]; // Define deeper if needed
    is_registered?: boolean; // For frontend helper
    likes?: any[]; // EventLike objects
    comments?: any[]; // EventComment objects
    likes_count?: number;
    is_liked?: boolean;
    comments_count?: number;
}
