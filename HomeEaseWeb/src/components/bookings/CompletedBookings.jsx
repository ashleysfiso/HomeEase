import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DatePicker } from "@/components/ui/date-picker";

export default function CompletedBookings({ bookings }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Services</CardTitle>
        <CardDescription>View all completed service bookings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-1 max-w-sm relative">
            <Input placeholder="Search completed services..." />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <DatePicker />
        </div>

        <div className="border rounded-md">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-2 text-left font-medium">Booking ID</th>
                <th className="p-2 text-left font-medium">Customer</th>
                <th className="p-2 text-left font-medium">Service</th>
                <th className="p-2 text-left font-medium">Provider</th>
                <th className="p-2 text-left font-medium">Completion Date</th>
                <th className="p-2 text-left font-medium">Rating</th>
                <th className="p-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedServices.map((service) => (
                <tr key={service.id} className="border-b">
                  <td className="p-2">#{service.id}</td>
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {service.customer.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{service.customer.name}</span>
                    </div>
                  </td>
                  <td className="p-2">{service.service}</td>
                  <td className="p-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {service.provider.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{service.provider.name}</span>
                    </div>
                  </td>
                  <td className="p-2">{service.completionDate}</td>
                  <td className="p-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-4 w-4 ${
                            star <= service.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </td>
                  <td className="p-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

const completedServices = [
  {
    id: 1003,
    customer: { name: "Emily Wilson", initials: "EW" },
    service: "Electrical Work",
    provider: { name: "David Miller", initials: "DM" },
    completionDate: "Mar 14, 2025",
    rating: 5,
  },
  {
    id: 1005,
    customer: { name: "Olivia Martinez", initials: "OM" },
    service: "Deep Cleaning",
    provider: { name: "John Smith", initials: "JS" },
    completionDate: "Mar 13, 2025",
    rating: 4,
  },
  {
    id: 997,
    customer: { name: "William Davis", initials: "WD" },
    service: "House Cleaning",
    provider: { name: "John Smith", initials: "JS" },
    completionDate: "Mar 12, 2025",
    rating: 5,
  },
  {
    id: 995,
    customer: { name: "Sophia Garcia", initials: "SG" },
    service: "Plumbing Repair",
    provider: { name: "Robert Davis", initials: "RD" },
    completionDate: "Mar 11, 2025",
    rating: 3,
  },
];
