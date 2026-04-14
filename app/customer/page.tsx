'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, User } from 'lucide-react';

const mockBookings = [
  { id: 'APT-001', service: 'Haircut & Styling', business: 'Demo Business', date: 'Oct 24, 2023', time: '09:00 AM', staff: 'Sarah Jenkins', status: 'Confirmed', price: '$50.00' },
  { id: 'APT-002', service: 'Beard Trim', business: 'Demo Business', date: 'Sep 15, 2023', time: '01:00 PM', staff: 'Michael Chen', status: 'Completed', price: '$25.00' },
];

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">Manage your upcoming and past appointments.</p>
      </div>

      <div className="grid gap-4">
        {mockBookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="bg-muted/50 p-6 flex flex-col justify-center items-center md:w-48 border-b md:border-b-0 md:border-r">
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {booking.date.split(' ')[0]}
                </div>
                <div className="text-3xl font-bold">
                  {booking.date.split(' ')[1].replace(',', '')}
                </div>
                <div className="text-sm font-medium text-muted-foreground mt-1">
                  {booking.time}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{booking.service}</h3>
                    <p className="text-muted-foreground flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" /> {booking.business}
                    </p>
                  </div>
                  <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className={booking.status === 'Confirmed' ? 'bg-blue-500' : ''}>
                    {booking.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" /> {booking.staff}
                  </div>
                  <div className="font-medium">
                    {booking.price}
                  </div>
                </div>

                {booking.status === 'Confirmed' && (
                  <div className="mt-6 flex gap-3 pt-4 border-t">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Cancel</Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
