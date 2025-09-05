import api from "@/api";
import { getToken } from "../auth/authUtil";
import { toast } from "sonner";

export async function submitStudentDetails(formData: FormData, navigate: (path: string) => void) {
  const token = await getToken();
  if (!token) {
    toast.error("No authentication token found");
    throw new Error("No authentication token found");
  }
  try {
    const response = await api.post("/api/student/details", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Form submitted successfully:", response.data);
    toast.success("Form has submitted successfully");
    setTimeout(() => navigate("/User/Student/admission"), 1000);
  } catch (error) {
    console.error(error);
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response: any };
      console.log("Error response data:", err.response.data);
      console.log("Error response status:", err.response.status);
      console.log("Error response headers:", err.response.headers);
    }
    toast.error("Failed to submit form. Please try again.");
  }
}

export async function getStudentDetails() {
  const token = await getToken();
  if (!token) {
    toast.error("No authentication token found");
    throw new Error("No authentication token found");
  }
  try {
    const response = await api.get("/api/student/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch student details:", error);
    toast.error("Failed to fetch student details.");
    throw error;
  }
}

export async function updateStudentDetails(
  rollNo: string,
  formData: FormData,
  navigate: (path: string) => void
) {
  const token = await getToken();
  if (!token) {
    toast.error("No authentication token found");
    throw new Error("No authentication token found");
  }
  try {
    const response = await api.put(`/api/student/details/${rollNo}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Form updated successfully:", response.data);
    toast.success("Details updated successfully");
    setTimeout(() => navigate("/User/Student/details"), 1000);
  } catch (error) {
    console.error(error);
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response: any };
      console.log("Error response data:", err.response.data);
      console.log("Error response status:", err.response.status);
      console.log("Error response headers:", err.response.headers);
    }
    toast.error("Failed to update details. Please try again.");
  }
}