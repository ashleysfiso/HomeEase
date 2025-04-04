import axios from "axios";
import handleAxiosError from "./utils";

const baseURL = "https://localhost:7234/api/";
// Account Fuctions
export async function LoginUser(creds) {
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

export async function RegisterUser(creds) {
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
// Service offerings functions
export async function GetServiceOfferings() {
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

export async function GetServiceById(spId, sId) {
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

// Bookings functions
export async function CreateBooking(bookingInfo) {
  let result;
  await axios
    .post(`${baseURL}Bookings`, {
      customerId: bookingInfo.customerId,
      serviceId: bookingInfo.serviceId,
      serviceProviderId: bookingInfo.serviceProviderId,
      bookingDate: bookingInfo.date,
      time: bookingInfo.time,
      totalCost: bookingInfo.totalPrice,
      address: bookingInfo.address,
      additionalInformation: bookingInfo.additionalInfo,
    })
    .then((res) => {
      result = res.data;
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

// Services functions
export async function GetAvailableServices() {
  return await axios
    .get(`${baseURL}Services`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const errorMessage = handleAxiosError(err);
      throw {
        message: errorMessage,
      };
    });
}

export async function AddNewService(service) {
  return await axios
    .post(`${baseURL}Services`, {
      name: service.name,
      description: service.description,
      basePrice: service.basePrice,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const errorMessage = handleAxiosError(err);
      throw {
        message: errorMessage,
      };
    });
}
