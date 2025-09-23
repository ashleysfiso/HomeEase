import api from "./axiosConfig";

interface CreateReview {
  bookingId: number;
  rating: number;
  comment: string;
}

export async function getReviews(
  serviceId: number,
  providerId: number,
  skip: number,
  take: number
) {
  try {
    const result = await api.get(
      `Reviews/service-offering/paged/${providerId}/${serviceId}?skip=${skip}&take=${take}`
    );
    return result.data;
  } catch (err: any) {
    throw err.message;
  }
}

export async function addReview(review: CreateReview) {
  try {
    const result = await api.post(`Reviews`, review);
  } catch (err: any) {
    throw err.message;
  }
}
