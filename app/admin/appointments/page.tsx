'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, MoreHorizontal, Filter } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockAppointments = [
  { id: 'APT-001', customer: 'John Doe', service: 'Haircut & Styling', date: 'Oct 24, 2023', time: '09:00 AM', staff: 'Sarah Jenkins', status: 'Confirmed', price: '$50.00' },
  { id: 'APT-002', customer: 'Jane Smith', service: 'Color & Highlights', date: 'Oct 24, 2023', time: '10:30 AM', staff: 'Michael Chen', status: 'Pending', price: '$120.00' },
  { id: 'APT-003', customer: 'Mike Ross', service: 'Beard Trim', date: 'Oct 24, 2023', time: '01:00 PM', staff: 'Sarah Jenkins', status: 'Completed', price: '$25.00' },
  { id: 'APT-004', customer: 'Sarah Lee', service: 'Consultation', date: 'Oct 25, 2023', time: '03:00 PM', staff: 'Michael Chen', status: 'Cancelled', price: '$0.00' },
  { id: 'APT-005', customer: 'Tom Hardy', service: 'Haircut & Styling', date: 'Oct 26, 2023', time: '11:00 AM', staff: 'Sarah Jenkins', status: 'Confirmed', price: '$50.00' },
];

export default function AppointmentsPage() {
  const [search, setSearch] = useState('');

  const filteredAppointments = mockAppointments.filter(a => 
    a.customer.toLowerCase().includes(search.toLowerCase()) || 
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed': return <Badge variant="default" className="bg-blue-500">{status}</Badge>;
      case 'Pending': return <Badge variant="outline" className="text-yellow-600 border-yellow-600">{status}</Badge>;
      case 'Completed': return <Badge variant="default" className="bg-green-500">{status}</Badge>;
      case 'Cancelled': return <Badge variant="destructive">{status}</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">View and manage all customer bookings.</p>
        </div>
        <Button>New Appointment</Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground absolute ml-3" />
          <Input 
            placeholder="Search by customer or ID..." 
            className="pl-9" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Staff</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((apt) => (
              <TableRow key={apt.id}>
                <TableCell className="font-medium text-muted-foreground">{apt.id}</TableCell>
                <TableCell className="font-medium">{apt.customer}</TableCell>
                <TableCell>{apt.service}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{apt.date}</span>
                    <span className="text-xs text-muted-foreground">{apt.time}</span>
                  </div>
                </TableCell>
                <TableCell>{apt.staff}</TableCell>
                <TableCell>{getStatusBadge(apt.status)}</TableCell>
                <TableCell className="text-right">{apt.price}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cancel Booking</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredAppointments.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
