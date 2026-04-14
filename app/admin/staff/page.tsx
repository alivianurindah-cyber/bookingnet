'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, Mail, Phone, Calendar as CalendarIcon, Edit, Trash } from 'lucide-react';

const mockStaff = [
  { id: '1', name: 'Sarah Jenkins', role: 'Senior Stylist', email: 'sarah@example.com', phone: '+1 (555) 111-2222', status: 'Active', services: 5 },
  { id: '2', name: 'Michael Chen', role: 'Barber', email: 'michael@example.com', phone: '+1 (555) 333-4444', status: 'Active', services: 3 },
  { id: '3', name: 'Emily Davis', role: 'Colorist', email: 'emily@example.com', phone: '+1 (555) 555-6666', status: 'On Leave', services: 2 },
];

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">Manage your team members and their schedules.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Staff Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockStaff.map((staff) => (
          <Card key={staff.id}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{staff.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{staff.role}</p>
                </div>
              </div>
              <Badge variant={staff.status === 'Active' ? 'default' : 'secondary'}>
                {staff.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" /> {staff.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" /> {staff.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" /> Assigned to {staff.services} services
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" className="w-full" size="sm">
                  <CalendarIcon className="mr-2 h-4 w-4" /> Schedule
                </Button>
                <Button variant="outline" size="sm" className="px-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="px-2 text-destructive hover:text-destructive">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
