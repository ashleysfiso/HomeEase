import api from "./axiosConfig";

interface LoginResponse {
  token: string;
  name: string;
}

export async function apiLogin(email: string, password: string) {
  try {
    const res = await api.post("Auth/login-app", { email, password });
    return res.data;
  } catch (err: any) {
    throw err.message;
  }
}

export async function apiRegister(
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string
) {
  try {
    const res = await api.post("Auth/register/customer", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    });
    return res.data;
  } catch (err: any) {
    throw err.message;
  }
}

export async function getUser(userId: string) {
  try {
    const res = await api.get(`Auth/get-user/${userId}`);
    return res.data;
  } catch (err: any) {
    console.log(`From Auth Error: ${err.statusCode}`);
    throw err.message;
  }
}
