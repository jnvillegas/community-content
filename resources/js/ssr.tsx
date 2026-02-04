import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: async (name) => {
            const pages = import.meta.glob('./pages/**/*.{tsx,jsx}');

            // Try .tsx first, then .jsx
            const tsxPath = `./pages/${name}.tsx`;
            const jsxPath = `./pages/${name}.jsx`;

            if (pages[tsxPath]) {
                return pages[tsxPath]();
            } else if (pages[jsxPath]) {
                return pages[jsxPath]();
            }

            throw new Error(`Page not found: ${name}`);
        },
        setup: ({ App, props }) => {
            return <App {...props} />;
        },
    }),
);
