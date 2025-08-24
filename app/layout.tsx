
import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'Todo App', description: 'Next.js + NestJS Todo' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <nav className="sticky top-0 z-10 bg-black/40 backdrop-blur border-b border-gray-800">
          <div className="max-w-3xl mx-auto flex items-center justify-between p-4">
            <Link className="font-bold text-xl" href="/">Todo<span className="text-orange-500">Pro</span></Link>
            <div className="space-x-3">
             <nav className="flex space-x-6">
      <Link
        href="/signin"
         className="px-4 py-2 rounded-xl text-sm font-medium text-orange-400 border border-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-md"
      >
        Sign In
      </Link>

      <Link
        href="/signup"
         className="px-4 py-2 rounded-xl text-sm font-medium text-orange-400 border border-orange-400 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-md"
      >
        Sign Up
      </Link>

      <Link
        href="/todos"
        className="px-4 py-2 rounded-xl text-sm font-medium text-orange-300 hover:text-orange-500 hover:underline transition-all duration-300"
      >
        Dashboard
      </Link>
    </nav>
            </div>
          </div>
        </nav>
        <main className="max-w-3xl mx-auto p-4">{children}</main>
        <footer className="text-center text-xs text-gray-400 py-6">Built with Next.js + Tailwind</footer>
      </body>
    </html>
  );
}
