import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            viewBox="0 0 42 42"
            xmlns="http://www.w3.org/2000/svg"
            className="text-emerald-600"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                // Una 'C' geométrica e isométrica
                d="M36 8L21 0L6 8V34L21 42L36 34V26L30 29V31L21 35.5L12 31V11L21 6.5L30 11V13L36 16V8ZM21 13L26 15.5L21 18L16 15.5L21 13Z"
                fill="currentColor"
            />
        </svg>
    );
}
