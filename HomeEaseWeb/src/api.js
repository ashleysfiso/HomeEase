import axios from "axios";
import handleAxiosError from "./utils";

const baseURL = "https://localhost:7234/api/";

export async function loginUser(creds) {
  let data;
  await axios
    .post(`${baseURL}Account/login`, {
      email: creds.email,
      password: creds.password,
    })
    .then((res) => {
      console.log(res.data);
      data = res.data;
    })
    .catch((err) => {
      const errorMessage = handleAxiosError(err);
      throw {
        message: errorMessage,
      };
    });

  return data;
}

export async function registerUser(creds) {
  let data;

  await axios
    .post(`${baseURL}Account/register/customers`, {
      username: creds.username,
      email: creds.email,
      phoneNumber: creds.phoneNumber,
      password: creds.password,
    })
    .then((res) => {
      //console.log(res);
      data = res.data;
    })
    .catch((err) => {
      const errorMessage = handleAxiosError(err);
      throw {
        message: errorMessage,
      };
    });

  return data;
}

export async function getServices() {
  let data;
  await axios
    .get(`${baseURL}ServiceOfferings`)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      const errorMessage = handleAxiosError(err);
      throw {
        message: errorMessage,
      };
    });

  return data;
}

export async function getServiceById(spId, sId) {
  let service;
  await axios
    .get(`${baseURL}ServiceOfferings/${spId}/${sId}`)
    .then((res) => {
      service = res.data;
    })
    .catch((err) => {
      const errorMessage = handleAxiosError(err);
      throw {
        message: errorMessage,
      };
    });

  return service;
}

export async function createBooking(bookingInfo) {
  let result;
  await axios
    .post(`${baseURL}Bookings`, {
      customerId: bookingInfo.customerId,
      serviceId: bookingInfo.serviceId,
      serviceProviderId: bookingInfo.serviceProviderId,
      bookingDate: bookingInfo.date,
      totalCost: bookingInfo.totalPrice,
      address: bookingInfo.address,
      additionalInformation: bookingInfo.additionalInfo,
    })
    .then((res) => {
      result = res;
    })
    .catch((err) => {
      const errorMessage = handleAxiosError(err);
      throw {
        message: errorMessage,
      };
    });

  return result;
}

export async function GetBookingByCustomerId(customerId) {
  let bookings;
  await axios
    .get(`${baseURL}Bookings/customer/${customerId}`)
    .then((res) => {
      bookings = res.data;
    })
    .catch((err) => {
      const errorMessage = handleAxiosError(err);
      throw {
        message: errorMessage,
      };
    });

  return bookings;
}
