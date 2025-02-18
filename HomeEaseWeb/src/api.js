import axios from "axios";

const baseURL = "https://localhost:7234/api/";

export async function loginUser(creds) {
  let data;

  console.log(creds.email);
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
      console.log(err.data);
      console.log(err.response.status);
      if (err.response.status === 401) {
        throw {
          message: "Incorrect username or password",
          status: err.response.status,
        };
      } else if (err.request) {
        // Request was made but no response was received
        console.error("No response received:", err.request);
        throw {
          message: `No response received: ${err.request}`,
          status: err.response.status,
        };
      } else {
        // Something else caused the error
        console.error("Error setting up request:", err.message);
        throw {
          message: `Error setting up request: ${err.message}`,
          status: err.response.status,
        };
      }
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
      console.log(res);
      data = res.data;
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 500) {
        throw {
          message: "Incorrect username or password",
          status: err.response.status,
        };
      } else if (err.request) {
        // Request was made but no response was received
        console.error("No response received:", err.request);
        throw {
          message: `No response received: ${err.request}`,
          status: err.response.status,
        };
      } else {
        // Something else caused the error
        console.error("Error setting up request:", err.message);
        throw {
          message: `Error setting up request: ${err.message}`,
          status: err.response.status,
        };
      }
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
    .catch((error) => {
      console.log(error);
      if (err.response.status === 500) {
        throw {
          message: "Incorrect username or password",
          status: err.response.status,
        };
      } else if (err.request) {
        // Request was made but no response was received
        console.error("No response received:", err.request);
        throw {
          message: `No response received: ${err.request}`,
          status: err.response.status,
        };
      } else {
        // Something else caused the error
        console.error("Error setting up request:", err.message);
        throw {
          message: `Error setting up request: ${err.message}`,
          status: err.response.status,
        };
      }
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
    .catch((error) => {
      console.log(error);
      if (err.response.status === 500) {
        throw {
          message: "Incorrect username or password",
          status: err.response.status,
        };
      } else if (err.request) {
        // Request was made but no response was received
        console.error("No response received:", err.request);
        throw {
          message: `No response received: ${err.request}`,
          status: err.response.status,
        };
      } else {
        // Something else caused the error
        console.error("Error setting up request:", err.message);
        throw {
          message: `Error setting up request: ${err.message}`,
          status: err.response.status,
        };
      }
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
    .catch((error) => {
      console.log(error);
    });

  return result;
}
