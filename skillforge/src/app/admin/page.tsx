import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Admin() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  if (session.user?.role !== 'admin') {
    redirect('/unauthorized');
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-4">
          🔒 Admin Only Area
        </h2>
        <p className="text-red-700">
          This page is only accessible to users with admin role.
        </p>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Admin Functions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-2">User Management</h3>
            <p className="text-gray-600 text-sm mb-4">Manage users and permissions</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm">
              View Users
            </button>
          </div>
          
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-2">System Settings</h3>
            <p className="text-gray-600 text-sm mb-4">Configure system-wide settings</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded text-sm">
              Open Settings
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
