'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const NAV_ITEMS = [
  { name: 'My Bookings', href: '/customer', icon: CalendarDays },
  { name: 'Profile Settings', href: '/customer/settings', icon: Settings },
];

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <header className="px-6 py-4 border-b bg-background flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">BookneticSaaS</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium mr-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            John Doe
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-background rounded-xl border p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <span className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
