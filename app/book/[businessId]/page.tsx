'use client';

import { useState, use } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, ChevronLeft, CalendarDays, Clock, User } from 'lucide-react';

const SERVICES = [
  { id: 's1', name: 'Haircut & Styling', duration: '60 min', price: '$50' },
  { id: 's2', name: 'Color & Highlights', duration: '120 min', price: '$120' },
  { id: 's3', name: 'Beard Trim', duration: '30 min', price: '$25' },
];

const STAFF = [
  { id: 'any', name: 'Any Available Staff', role: 'First available' },
  { id: 'st1', name: 'Sarah Jenkins', role: 'Senior Stylist' },
  { id: 'st2', name: 'Michael Chen', role: 'Barber' },
];

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

export default function BookingPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = use(params);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | null>(null);

  const handleNext = () => setStep((s) => Math.min(s + 1, 6));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Book an Appointment</h1>
          <p className="text-muted-foreground mt-2">Demo Business ({businessId})</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300"
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          ></div>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                step >= i ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted text-muted-foreground'
              }`}
            >
              {i}
            </div>
          ))}
        </div>

        <Card className="shadow-lg border-0">
          {step > 1 && step < 6 && (
            <div className="px-6 pt-6 pb-2">
              <Button variant="ghost" size="sm" onClick={handleBack} className="text-muted-foreground">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            </div>
          )}

          <CardContent className="p-6">
            {/* Step 1: Service */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-semibold mb-6">Select a Service</h2>
                <div className="grid gap-4">
                  {SERVICES.map((service) => (
                    <div 
                      key={service.id}
                      onClick={() => { setSelectedService(service.id); handleNext(); }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/50 flex justify-between items-center ${
                        selectedService === service.id ? 'border-primary bg-primary/5' : 'border-muted'
                      }`}
                    >
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" /> {service.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-lg">{service.price}</span>
                        <div className="mt-1">
                          <Button size="sm" variant={selectedService === service.id ? "default" : "outline"}>
                            Select
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Staff */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-semibold mb-6">Choose Staff</h2>
                <div className="grid gap-4">
                  {STAFF.map((s) => (
                    <div 
                      key={s.id}
                      onClick={() => { setSelectedStaff(s.id); handleNext(); }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/50 flex items-center gap-4 ${
                        selectedStaff === s.id ? 'border-primary bg-primary/5' : 'border-muted'
                      }`}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{s.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{s.name}</h3>
                        <p className="text-muted-foreground text-sm">{s.role}</p>
                      </div>
                      <Button size="sm" variant={selectedStaff === s.id ? "default" : "outline"}>
                        Select
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-semibold mb-2">Pick Date & Time</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border mx-auto"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> 
                      {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((t) => (
                        <Button
                          key={t}
                          variant={time === t ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setTime(t)}
                        >
                          {t}
                        </Button>
                      ))}
                    </div>
                    {time && (
                      <Button className="w-full mt-6" onClick={handleNext}>
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Details */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-semibold mb-6">Your Details</h2>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Special Requests (Optional)</Label>
                    <Input id="notes" placeholder="Any notes for the staff..." />
                  </div>
                  <Button className="w-full mt-4" size="lg" onClick={handleNext}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Payment */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-semibold mb-2">Payment</h2>
                
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service</span>
                      <span className="font-medium">{SERVICES.find(s => s.id === selectedService)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Staff</span>
                      <span className="font-medium">{STAFF.find(s => s.id === selectedStaff)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time</span>
                      <span className="font-medium">{date?.toLocaleDateString()} at {time}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{SERVICES.find(s => s.id === selectedService)?.price}</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="card">Card Number</Label>
                    <Input id="card" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="lg" onClick={handleNext}>
                    Pay & Confirm Booking
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Confirmation */}
            {step === 6 && (
              <div className="text-center py-8 animate-in fade-in zoom-in-95">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Your appointment has been successfully scheduled. We&apos;ve sent a confirmation email with the details.
                </p>
                <div className="bg-muted/50 p-6 rounded-xl text-left max-w-sm mx-auto mb-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-medium">{date?.toLocaleDateString()} at {time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Staff</p>
                      <p className="font-medium">{STAFF.find(s => s.id === selectedStaff)?.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline">Add to Calendar</Button>
                  <Button onClick={() => setStep(1)}>Book Another</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
