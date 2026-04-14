'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const mockAppointments = [
  { id: 1, title: 'Haircut - John Doe', time: '09:00 AM', duration: 60, staff: 'SJ', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 2, title: 'Coloring - Jane Smith', time: '10:30 AM', duration: 120, staff: 'MC', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 3, title: 'Beard Trim - Mike Ross', time: '01:00 PM', duration: 30, staff: 'SJ', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 4, title: 'Consultation - Sarah Lee', time: '03:00 PM', duration: 45, staff: 'MC', color: 'bg-orange-100 text-orange-700 border-orange-200' },
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your staff schedules and bookings.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Today</Button>
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" className="rounded-none rounded-l-md"><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-none rounded-r-md border-l"><ChevronRight className="h-4 w-4" /></Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Booking
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-6 flex-1 min-h-0">
        <div className="space-y-6 overflow-y-auto pr-2">
          <Card>
            <CardContent className="p-3">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md mx-auto"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm">Staff Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8"><AvatarFallback>SJ</AvatarFallback></Avatar>
                <div className="text-sm font-medium">Sarah Jenkins</div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8"><AvatarFallback>MC</AvatarFallback></Avatar>
                <div className="text-sm font-medium">Michael Chen</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader className="py-4 border-b">
            <CardTitle className="text-lg">
              {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-y-auto relative">
            {/* Simple Daily View Mockup */}
            <div className="absolute inset-0 p-4 space-y-4">
              {mockAppointments.map((apt) => (
                <div 
                  key={apt.id} 
                  className={`p-3 rounded-lg border ${apt.color} flex items-center justify-between`}
                >
                  <div>
                    <div className="font-semibold">{apt.title}</div>
                    <div className="text-sm opacity-80">{apt.time} ({apt.duration} mins)</div>
                  </div>
                  <Avatar className="h-8 w-8 border-2 border-white/50">
                    <AvatarFallback className="bg-transparent">{apt.staff}</AvatarFallback>
                  </Avatar>
                </div>
              ))}
              
              {/* Empty state lines */}
              <div className="border-t border-dashed my-8 relative">
                <span className="absolute -top-3 left-0 bg-background px-2 text-xs text-muted-foreground">12:00 PM</span>
              </div>
              <div className="border-t border-dashed my-8 relative">
                <span className="absolute -top-3 left-0 bg-background px-2 text-xs text-muted-foreground">02:00 PM</span>
              </div>
              <div className="border-t border-dashed my-8 relative">
                <span className="absolute -top-3 left-0 bg-background px-2 text-xs text-muted-foreground">04:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
