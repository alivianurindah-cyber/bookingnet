'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, MoreHorizontal, Mail, Phone } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockCustomers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', totalBookings: 12, lastVisit: 'Oct 24, 2023', spent: '$650.00' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 (555) 987-6543', totalBookings: 3, lastVisit: 'Sep 15, 2023', spent: '$360.00' },
  { id: '3', name: 'Mike Ross', email: 'mike@example.com', phone: '+1 (555) 456-7890', totalBookings: 8, lastVisit: 'Oct 10, 2023', spent: '$200.00' },
  { id: '4', name: 'Sarah Lee', email: 'sarah@example.com', phone: '+1 (555) 234-5678', totalBookings: 1, lastVisit: 'Aug 05, 2023', spent: '$50.00' },
  { id: '5', name: 'Tom Hardy', email: 'tom@example.com', phone: '+1 (555) 876-5432', totalBookings: 24, lastVisit: 'Oct 26, 2023', spent: '$1,200.00' },
];

export default function CustomersPage() {
  const [search, setSearch] = useState('');

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database and view history.</p>
        </div>
        <Button>Add Customer</Button>
      </div>

      <div className="flex items-center gap-2 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground absolute ml-3" />
        <Input 
          placeholder="Search by name or email..." 
          className="pl-9" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-center">Bookings</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{customer.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Mail className="h-3 w-3" /> {customer.email}</div>
                    <div className="flex items-center gap-2"><Phone className="h-3 w-3" /> {customer.phone}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{customer.totalBookings}</TableCell>
                <TableCell>{customer.lastVisit}</TableCell>
                <TableCell className="text-right font-medium">{customer.spent}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Book Appointment</DropdownMenuItem>
                      <DropdownMenuItem>Send Email</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredCustomers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
