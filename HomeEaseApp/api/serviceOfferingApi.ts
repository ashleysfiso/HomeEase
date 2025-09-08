import api from "./axiosConfig";

export async function getPopularServices() {
  try {
    const res = await api.get(`ServiceOfferings/popular`);
    return res.data;
  } catch (err: any) {
    throw err.message;
  }
}

export async function getServiceOfferings(
  skip: number,
  take: number,
  searchTerm: string
) {
  try {
    const res = await api.get(
      `ServiceOfferings/paged?skip=${skip}&take=${take}&searchTerm=${searchTerm}`
    );
    return res.data;
  } catch (err: any) {
    throw err.message;
  }
}
