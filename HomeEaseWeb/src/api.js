import axiosInstance from "./axiosInstance";
import handleAxiosError from "./utils";
import axios from "axios";

const baseURL = "https://localhost:7234/api/";

//===================================================================================================================
// Account Functions
export async function LoginUser(creds) {
  try {
    const res = await axios.post(
      `${baseURL}Auth/login`,
      {
        email: creds.email,
        password: creds.password,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function RegisterUser(creds) {
  try {
    const res = await axiosInstance.post("Auth/register/customer", {
      firstName: creds.firstName,
      lastName: creds.lastName,
      email: creds.email,
      phoneNumber: creds.phoneNumber,
      password: creds.password,
    });
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function EditUserProfile(creds) {
  try {
    const res = await axiosInstance.put("Auth/edit-profile", creds);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetUserProfile(userId) {
  try {
    const res = await axiosInstance.get(`Auth/user-profile/${userId}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function UpdatePassword(creds) {
  try {
    const res = await axiosInstance.put("Auth/update-password", creds);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function UpdateLogo(userId, url) {
  try {
    const res = await axiosInstance.put(
      `ServiceProviders/company-logo/${userId}/${url}`
    );
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetPresignedURL(fileName, contentType) {
  try {
    const res = await axiosInstance.get(
      "https://localhost:7234/api/AwsUpload/presigned-url",
      {
        params: { fileName: fileName, contentType: contentType },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw { message: handleAxiosError(err) };
  }
}

//===================================================================================================================
// Service offerings functions
export async function GetServiceOfferings() {
  try {
    const res = await axiosInstance.get("ServiceOfferings");
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetServiceById(spId, sId) {
  try {
    const res = await axiosInstance.get(`ServiceOfferings/${spId}/${sId}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetServiceProviderServiceOfferings(spId) {
  try {
    const res = await axiosInstance.get(`ServiceOfferings/${spId}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function CreateServiceOffering(details) {
  try {
    const res = await axiosInstance.post("ServiceOfferings", {
      serviceId: details.serviceId,
      serviceProviderId: details.serviceProviderId,
      rate: details.rate,
      availability: "Mon-Sun",
      description:
        "This is a placeholder description for the service. Please update this section with detailed and accurate information about the service being offered, including what is provided, any limitations or requirements, pricing details if applicable, and any other relevant notes. This description should be written and maintained by the service provider to ensure clarity and transparency for potential customers.",
      pricingOptionsToSO: details.options,
    });
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function UpdatePricingOption(option) {
  try {
    const res = await axiosInstance.put("ServiceOfferingPricingOption", option);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function UpdateServiceOfferingStatus(details) {
  try {
    const res = await axiosInstance.put(
      `ServiceOfferings/${details.spId}/${details.sId}/${details.status}`
    );
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function DeleteServiceOffering(spId, sId) {
  try {
    const res = await axiosInstance.delete(`ServiceOfferings/${spId}/${sId}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

//===================================================================================================================
// Bookings functions
export async function CreateBooking(bookingInfo) {
  try {
    const res = await axiosInstance.post("Bookings", bookingInfo);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetBookingByCustomerId(customerId) {
  try {
    const res = await axiosInstance.get(`Bookings/customer/${customerId}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetAllBookings() {
  try {
    const res = await axiosInstance.get("Bookings");
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetBookingByProviderId(providerId) {
  try {
    const res = await axiosInstance.get(`Bookings/provider/${providerId}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function UpdateBooking(booking) {
  try {
    const res = await axiosInstance.put(`Bookings/${booking.id}`, {
      status: booking.status,
    });
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

//===================================================================================================================
// Services functions
export async function GetAvailableServices() {
  try {
    const res = await axiosInstance.get("Services");
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function AddNewService(service) {
  try {
    const res = await axiosInstance.post("Services", service);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function UpdateService(service) {
  try {
    const res = await axiosInstance.put(`Services/${service.id}`, service);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function UpdateServiceImgURl(id, url) {
  try {
    const res = await axiosInstance.put(`Services/service-image/${id}/${url}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function DeleteService(id) {
  try {
    const res = await axiosInstance.delete(`Services/${id}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

//===================================================================================================================
// Service Providers Functions
export async function GetServiceProviders() {
  try {
    const res = await axiosInstance.get("ServiceProviders");
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function UpdateStatus(id, status) {
  try {
    const res = await axiosInstance.put(`ServiceProviders/${id}`, { status });
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

//===================================================================================================================
// Pending Approvals functions
export async function CreateServiceProviderApplication(details) {
  try {
    const res = await axiosInstance.post("PendingApproval", details);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetPendingApprovals() {
  try {
    const res = await axiosInstance.get("PendingApproval");
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function UpdatePendingApprovalStatus(id, status) {
  try {
    const res = await axiosInstance.put(`PendingApproval/${id}`, { status });
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function ApproveServiceProviderApplication(details) {
  try {
    const res = await axiosInstance.post("Auth/register/provider", {
      ...details,
      password: "Provider@123",
    });
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

//===================================================================================================================
// Service Types
export async function CreateServiceType(serviceType) {
  try {
    const res = await axiosInstance.post("ServiceType", serviceType);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function UpdateServiceType(id, status) {
  try {
    const res = await axiosInstance.put(`ServiceType/${id}`, { status });
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function DeleteServiceType(id) {
  try {
    const res = await axiosInstance.delete(`ServiceType/${id}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

//===================================================================================================================
// Pricing Options
export async function CreatePricingOption(option) {
  try {
    const res = await axiosInstance.post("PricingOption", option);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function DeletePricingOption(id) {
  try {
    const res = await axiosInstance.delete(`PricingOption/${id}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

//===================================================================================================================
// Reviews
export async function CreateReview(review) {
  try {
    const res = await axiosInstance.post("Reviews", review);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function DeleteReview(id) {
  try {
    const res = await axiosInstance.delete(`Reviews/${id}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetProviderReviews(providerId) {
  try {
    const res = await axiosInstance.get(`Reviews/provider/${providerId}`);
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetServiceOfferingReviews(providerId, serviceId) {
  try {
    const res = await axiosInstance.get(
      `Reviews/service-offering/${providerId}/${serviceId}`
    );
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetReviews() {
  try {
    const res = await axiosInstance.get("Reviews");
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

//===================================================================================================================
// Dashboard
export async function GetServiceProviderDashboard(providerId) {
  try {
    const res = await axiosInstance.get(
      `Bookings/provider/dashboard/${providerId}`
    );
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
}

export async function GetAdminDashboard() {
  try {
    const res = await axiosInstance.get("Bookings/provider/dashboard/admin");
    return res.data;
  } catch (err) {
    throw { message: handleAxiosError(err) };
  }
} // End
