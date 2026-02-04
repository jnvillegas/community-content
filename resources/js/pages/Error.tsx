import React from 'react';
import { Head } from '@inertiajs/react';

interface ErrorProps {
  status: number;
}

export default function Error({ status }: ErrorProps) {
  const title = {
    503: '503: Service Unavailable',
    500: '500: Server Error',
    404: '404: Page Not Found',
    403: '403: Forbidden',
  }[status];

  const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.',
  }[status];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center dark:bg-gray-900">
      <Head title={title} />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">{status}</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{description || 'An error occurred'}</p>
      <a
        href="/"
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go Home
      </a>
    </div>
  );
}
