import "./globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = { 
  title: "SkillForge", 
  description: "Practice app" 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-background text-foreground">
        <SessionProvider>
          <a href="#main" className="sr-only focus:not-sr-only p-2">
            Skip to content
          </a>
          <div className="mx-auto max-w-6xl p-4">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}