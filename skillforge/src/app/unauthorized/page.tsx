import Link from 'next/link';

export default function Unauthorized() {
  return (
    <main className="p-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-red-600">🚫 Unauthorized</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            Access Denied
          </h2>
          <p className="text-red-700 mb-6">
            You don&apos;t have permission to access this page.
          </p>
          <div className="space-y-3">
            <Link 
              href="/dashboard"
              className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go to Dashboard
            </Link>
            <Link 
              href="/"
              className="block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
