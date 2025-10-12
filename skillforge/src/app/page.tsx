

import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main id="main" className="space-y-4 p-8">
      <h1 className="text-2xl font-bold">SkillForge</h1>
      <p>Next.js + React 19 practice app. Start with Prisma + Tailwind baseline.</p>
      
      {/* Authentication Test Section */}
      <div className="border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Authentication Test</h2>
        
        {session ? (
          // User is logged in
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h3 className="font-medium text-green-800">✅ You are logged in!</h3>
              <div className="mt-2 space-y-1 text-sm text-green-700">
                {/* Basic User Info */}
                <p><strong>Name:</strong> {session.user?.name}</p>
                <p><strong>Email:</strong> {session.user?.email}</p>
                
                {/* Custom JWT Fields */}
                <div className="mt-3 pt-3 border-t border-green-300">
                  <h4 className="font-semibold text-green-800 mb-2">Custom JWT Fields:</h4>
                  <p><strong>Role:</strong> {session.user?.role || 'Not set'}</p>
                  <p><strong>Custom Field:</strong> {session.user?.customField || 'Not set'}</p>
                  <p><strong>User ID:</strong> {session.user?.id || 'Not set'}</p>
                  <p><strong>Is Active:</strong> {session.user?.isActive ? 'Yes' : 'No'}</p>
                  <p><strong>GitHub ID:</strong> {session.user?.githubId || 'Not set'}</p>
                  <p><strong>GitHub Login:</strong> {session.user?.githubLogin || 'Not set'}</p>
                </div>
                
                {session.user?.image && (
                  <div className="mt-2">
                    <img 
                      src={session.user.image} 
                      alt="Profile" 
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <form action={async () => {
              "use server";
              await signOut();
            }}>
              <button 
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          // User is not logged in
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <h3 className="font-medium text-yellow-800">❌ You are not logged in</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Click the button below to sign in with GitHub
              </p>
            </div>
            
            <form action={async () => {
              "use server";
              await signIn("github");
            }}>
              <button 
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                Sign in with GitHub
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Additional Test Links */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Test Pages</h2>
        <div className="space-y-2">
          <Link 
            href="/dashboard" 
            className="block text-blue-600 hover:text-blue-800 underline"
          >
            Go to Dashboard (Protected Page)
          </Link>
          <Link 
            href="/admin" 
            className="block text-blue-600 hover:text-blue-800 underline"
          >
            Go to Admin Panel (Admin Only)
          </Link>
          <Link 
            href="/api/auth/session" 
            className="block text-blue-600 hover:text-blue-800 underline"
          >
            View Raw Session Data (API)
          </Link>
        </div>
      </div>
    </main>
  );
}