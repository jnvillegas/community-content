import { Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-2 group">
            <svg viewBox="0 0 470 469" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M235 0C255.102 0 274.61 2.53273 293.234 7.27087L372.083 175.875V44.0833C431.365 86.6542 470 156.055 470 234.5C470 364.011 364.787 469 235 469C214.89 469 195.377 466.452 176.747 461.71L97.9167 293.125V424.898C38.6406 382.326 0 312.941 0 234.5C0 104.989 105.213 0 235 0ZM235 97.7083C159.291 97.7083 97.9167 158.952 97.9167 234.5C97.9167 310.048 159.291 371.292 235 371.292C310.709 371.292 372.083 310.048 372.083 234.5C372.083 158.952 310.709 97.7083 235 97.708" fill="currentColor"></path></svg>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Community</span>
            {/* <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110">
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
            </div> */}
        </div>
    );
}
