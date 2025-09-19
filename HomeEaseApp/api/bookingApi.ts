import api from "./axiosConfig";

interface createBooking {
  customerId: number | null | undefined;
  serviceId: string | string[];
  serviceProviderId: string | string[];
  serviceTypeName: string;
  size: string;
  bookingDate: string;
  time: string;
  totalCost: number;
  address: string;
}

export async function getUpcomingCustomerBooking(customerId: number) {
  try {
    const res = await api.get(`Bookings/upcoming/customer/${customerId}`);
    return res.data;
  } catch (err: any) {
    console.log(`From get customer upcoming booking: error.message}`);
    throw err.message;
  }
}

export async function getUpcomingProviderBooking(providerId: number) {
  try {
    const res = await api.get(`Bookings/upcoming/provider/${providerId}`);
    return res.data;
  } catch (err: any) {
    throw err.message;
  }
}

export async function get5RecentCustomerBookings(customerId: number) {
  try {
    const res = await api.get(`Bookings/customer/recent5/${customerId}`);
    return res.data;
  } catch (err: any) {
    throw err.message;
  }
}

export async function get5RecentProviderBookings(providerId: number) {
  try {
    const res = await api.get(`Bookings/provider/recent5/${providerId}`);
    return res.data;
  } catch (err: any) {
    throw err.message;
  }
}

export async function createBooking(booking: createBooking) {
  try {
    const res = await api.post("Bookings", booking);
    return res.data;
  } catch (err: any) {
    throw err.message;
  }
}
