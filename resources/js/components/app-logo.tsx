import { Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-2 group">
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            </div>
            <div className="flex flex-col leading-tight">
                <span className="text-base font-black tracking-tight text-gray-900 dark:text-white">
                    <span className="text-blue-600">Community</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Network
                </span>
            </div>
        </div>
    );
}
