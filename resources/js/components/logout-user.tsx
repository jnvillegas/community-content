import { router } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { logout } from '@/routes';

export default function LogoutUser() {
    const handleLogout = () => {
        router.post(logout().url, {}, {
            onFinish: () => {
                router.visit('/login');
            }
        });
    };

    return (
        <div className="space-y-6 pt-6 border-t border-border">
            <HeadingSmall
                title="Sign out"
                description="End your current session on this device"
            />
            <div className="space-y-4 rounded-lg border border-border bg-muted/50 p-4 dark:bg-muted/10">
                <div className="relative space-y-0.5">
                    <p className="font-medium">Session</p>
                    <p className="text-sm text-muted-foreground">
                        End your current session on this device
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="gap-2"
                >
                    <LogOut className="h-4 w-4" />
                    Sign out
                </Button>
            </div>
        </div>
    );
}
