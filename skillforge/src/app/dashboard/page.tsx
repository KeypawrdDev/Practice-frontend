import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          🎉 Welcome to your Dashboard!
        </h2>
        <div className="space-y-2 text-green-700">
          <p><strong>Name:</strong> {session.user?.name}</p>
          <p><strong>Email:</strong> {session.user?.email}</p>
          <p><strong>Role:</strong> {session.user?.role}</p>
          <p><strong>GitHub Login:</strong> {session.user?.githubLogin}</p>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/profile" className="text-blue-600 hover:underline">View Profile</a></li>
            <li><a href="/settings" className="text-blue-600 hover:underline">Settings</a></li>
            <li><a href="/boards" className="text-blue-600 hover:underline">My Boards</a></li>
          </ul>
        </div>
        
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-2">Recent Activity</h3>
          <p className="text-gray-600 text-sm">No recent activity</p>
        </div>
        
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-2">Statistics</h3>
          <div className="space-y-1 text-sm">
            <p>Boards: 0</p>
            <p>Tasks: 0</p>
            <p>Completed: 0</p>
          </div>
        </div>
      </div>
    </main>
  );
}
