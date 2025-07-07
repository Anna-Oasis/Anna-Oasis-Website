import type { User } from "@/store/userStore";
import {axios_api as api} from "@/utils/api";
import { toast } from "sonner";

const TOKEN_KEY = "authToken";

import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
        "Enter a valid email address"
      )
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });


export const saveToken =  async (token: string) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    localStorage.removeItem(TOKEN_KEY);

  } catch (error) {
    console.error("Error removing token:", error);
  }
};

export const handleLogin = async (
  values: { email: string; password: string },
  onSuccess: () => void
) => {
  try {
    const response = await api.post("/login", values);

    const data = response.data;
    saveToken(data.data.token);
    toast(`Login Successful \n Welcome, ${data.data.name}`);
    console.log("Login API response:", data);
    onSuccess();
  } catch (error: any) {
    toast(`Login Failed \n ${error.response?.data?.message || error.message}`);
  }
};


 /**
 * 
 * @param token - The JWT token to verify
 * @description Verifies the JWT token by making a request to the backend.
 * If the token is valid, it returns the user's role. If the token is expired or invalid,
 * it alerts the user and redirects them to the login page.
 * @returns {Promise<User | null>} - Returns the user's information if the token is valid, otherwise returns null.
 */
export const verifyToken = async (token: string): Promise<User | null> => {
  try {
    const response = await api.get("/verify-token", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = response.data;
    return data.user;
  } catch (error: any) {
    if (error.response?.status === 401) {
      alert("Session Expired \nPlease log in again.");
      await removeToken();
      window.location.href = "/login"; 
      return null;
    }
    alert("Token Verification Failed \n" + (error.response?.data?.message || error.message));
    return null;
  }
};

export const handleSignup = async (
  values: { name: string; email: string; password: string },
  onSuccess: () => void
) => {
  try {
    const response = await api.post("/register", values);
    console.log("Signup API response:", response.data);
    alert("Signup Successful \n You can now log in.");
    onSuccess();
  } catch (error: any) {
    alert(`Signup Failed \n ${error.response?.data?.message || error.message}`);
  }
};
