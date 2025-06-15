import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllBookings from "@/components/bookings/AllBookings";
import PendingBookings from "@/components/bookings/PendingBookings";
import CompletedBookings from "@/components/bookings/CompletedBookings";
import { GetBookingByProviderId } from "@/api";
import MyLoader from "@/components/MyLoader";
import { useAuth } from "@/contexts/AuthContext";

export default function MyBookings() {
  const [isLoading, setIsLoading] = useState(true);
  const [submitTriger, setSubmitTrigger] = useState(false);
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  const providerId = user?.providerId;

  useEffect(() => {
    setIsLoading(true);
    const fetchBookings = async () => {
      try {
        const result = await GetBookingByProviderId(providerId);
        setBookings(result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (providerId) {
      fetchBookings();
    }
  }, [providerId, submitTriger]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
        <p className="text-muted-foreground">
          View and manage all service bookings on the platform.
        </p>
      </div>

      <Tabs defaultValue="all-bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-bookings">All Bookings</TabsTrigger>
          <TabsTrigger value="pending-bookings">Pending Bookings</TabsTrigger>
          <TabsTrigger value="completed-services">
            Completed Services
          </TabsTrigger>
        </TabsList>

        {/* All Bookings Tab */}
        <TabsContent value="all-bookings" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center">
              <MyLoader />
            </div>
          ) : (
            bookings && (
              <AllBookings
                setSubmitTrigger={setSubmitTrigger}
                bookings={bookings}
              />
            )
          )}
        </TabsContent>

        {/* Pending Bookings Tab */}
        <TabsContent value="pending-bookings" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center">
              <MyLoader />
            </div>
          ) : (
            <PendingBookings
              setSubmitTrigger={setSubmitTrigger}
              bookings={bookings}
            />
          )}
        </TabsContent>

        {/* Completed Services Tab */}
        <TabsContent value="completed-services" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center">
              <MyLoader />
            </div>
          ) : (
            <CompletedBookings bookings={bookings} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
