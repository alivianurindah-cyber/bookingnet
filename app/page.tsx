import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, CreditCard, Bell, Globe, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">BookneticSaaS</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/book/demo" className="text-muted-foreground hover:text-foreground transition-colors">Demo Booking</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/admin">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            The Ultimate Appointment <br className="hidden md:block" />
            <span className="text-primary">Booking & Scheduling</span> SaaS
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Automate bookings, manage calendars, process payments, and run multi-location operations with ease. Built for clinics, salons, coaches, and agencies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/admin">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14 rounded-full">Start your free trial</Button>
            </Link>
            <Link href="/book/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14 rounded-full">View Demo Booking</Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to run your business</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">All-in-one booking, automation, and revenue system designed to scale with you.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<CalendarDays className="h-6 w-6" />}
                title="Smart Booking Engine"
                description="Real-time availability, custom time slots, recurring appointments, and group bookings."
              />
              <FeatureCard 
                icon={<Users className="h-6 w-6" />}
                title="Customer CRM"
                description="Detailed customer profiles, booking history, notes, and a self-service customer dashboard."
              />
              <FeatureCard 
                icon={<CreditCard className="h-6 w-6" />}
                title="Integrated Payments"
                description="Accept deposits or full payments via Stripe, PayPal, or local payment methods."
              />
              <FeatureCard 
                icon={<Bell className="h-6 w-6" />}
                title="Automated Notifications"
                description="Reduce no-shows with automated Email, SMS, and WhatsApp reminders."
              />
              <FeatureCard 
                icon={<Globe className="h-6 w-6" />}
                title="Multi-Location Support"
                description="Manage multiple branches, staff schedules, and location-specific pricing from one dashboard."
              />
              <FeatureCard 
                icon={<BarChart3 className="h-6 w-6" />}
                title="Advanced Analytics"
                description="Track revenue, booking stats, conversion rates, and export detailed reports."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">BookneticSaaS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BookneticSaaS. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-background p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
