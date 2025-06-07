import axios from "axios";
import handleAxiosError from "./utils";

const baseURL = "https://localhost:7234/api/";
//===================================================================================================================
// Account Fuctions
export async function LoginUser(creds) {
  let data;
  await axios
    .post(
      `${baseURL}Auth/login`,
      {
        email: creds.email,
        password: creds.password,
      },
      {
        withCredentials: true, // ✅ THIS IS REQUIRED
      }
    )
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      console.log(err);
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
    .post(`${baseURL}Auth/register/customer`, {
      firstName: creds.firstName,
      lastName: creds.lastName,
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
//===================================================================================================================
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

export async function GetServiceProviderServiceOfferings(spId) {
  return await axios
    .get(`${baseURL}ServiceOfferings/${spId}`)
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

export async function CreateServiceOffering(details) {
  return await axios
    .post(`${baseURL}ServiceOfferings`, {
      serviceId: details.serviceId,
      serviceProviderId: details.serviceProviderId,
      rate: details.rate,
      availability: "Mon-Sun",
      description:
        "This is a placeholder description for the service. Please update this section with detailed and accurate information about the service being offered, including what is provided, any limitations or requirements, pricing details if applicable, and any other relevant notes. This description should be written and maintained by the service provider to ensure clarity and transparency for potential customers.",
      pricingOptionsToSO: details.options,
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

export async function UpdatePricingOption(option) {
  return axios
    .put(`${baseURL}ServiceOfferingPricingOption`, {
      serviceProviderId: option.serviceProviderId,
      serviceId: option.serviceId,
      pricingOptionId: option.pricingOptionId,
      price: option.price,
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

export async function UpdateServiceOfferingStatus(details) {
  return axios
    .put(
      `${baseURL}ServiceOfferings/${details.spId}/${details.sId}/${details.status}`
    )
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

export async function DeleteServiceOffering(spId, sId) {
  return await axios
    .delete(`${baseURL}ServiceOfferings/${spId}/${sId}`)
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

//===================================================================================================================
// Bookings functions
export async function CreateBooking(bookingInfo) {
  let result;
  await axios
    .post(`${baseURL}Bookings`, {
      customerId: bookingInfo.customerId,
      serviceId: bookingInfo.serviceId,
      serviceProviderId: bookingInfo.serviceProviderId,
      serviceTypeName: bookingInfo.serviceTypeName,
      size: bookingInfo.sizes,
      bookingDate: bookingInfo.date,
      time: bookingInfo.time,
      totalCost: bookingInfo.totalPrice,
      address: bookingInfo.address,
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
  return await axios
    .get(`${baseURL}Bookings/customer/${customerId}`)
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

export async function GetAllBookings() {
  return await axios
    .get(`${baseURL}Bookings`)
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

export async function GetBookingByProviderId(providerId) {
  return await axios
    .get(`${baseURL}Bookings/provider/${providerId}`)
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

export async function UpdateBooking(booking) {
  return axios
    .put(`${baseURL}Bookings/${booking.id}`, {
      status: booking.status,
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

//===================================================================================================================
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

export async function UpdateService(service) {
  return axios
    .put(`${baseURL}Services/${service.id}`, {
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

export async function DeleteService(id) {
  return await axios
    .delete(`${baseURL}Services/${id}`)
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
//===================================================================================================================
//Service Providers Functions

export async function GetServiceProviders() {
  return await axios
    .get(`${baseURL}ServiceProviders`)
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

export async function UpdateStatus(id, status) {
  return await axios
    .put(`${baseURL}ServiceProviders/${id}`, { status: status })
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
//===================================================================================================================
//Pending Approvals functions
export async function CreateServiceProviderApplication(details) {
  return await axios
    .post(`${baseURL}PendingApproval`, {
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
      phoneNumber: details.phoneNumber,
      companyName: details.companyName,
      experience: details.experience,
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

export async function GetPendingApprovals() {
  return await axios
    .get(`${baseURL}PendingApproval`)
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

export async function UpdatePendingApprovalStatus(id, status) {
  return await axios
    .put(`${baseURL}PendingApproval/${id}`, { status: status })
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

export async function ApproveServiceProviderApplication(details) {
  return await axios
    .post(`${baseURL}Auth/register/provider`, {
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
      phoneNumber: details.phoneNumber,
      password: "Provider@123",
      companyName: details.companyName,
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

//===================================================================================================================
//Service Types
export async function CreateServiceType(serviceType) {
  return await axios
    .post(`${baseURL}ServiceType`, {
      serviceId: serviceType.serviceId,
      name: serviceType.name,
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

export async function UpdateServiceType(id, status) {
  return await axios
    .put(`${baseURL}ServiceType/${id}`, { status: status })
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

export async function DeleteServiceType(id) {
  return await axios
    .delete(`${baseURL}ServiceType/${id}`)
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

//===================================================================================================================
//Pricing Options
export async function CreatePricingOption(option) {
  return await axios
    .post(`${baseURL}PricingOption`, {
      serviceTypeId: option.serviceTypeId,
      name: option.name,
      unitLabel: option.unitLabel,
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

export async function DeletePricingOption(id) {
  return await axios
    .delete(`${baseURL}PricingOption/${id}`)
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
