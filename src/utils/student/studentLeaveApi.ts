import api from "@/api";
import { getToken } from "../auth/authUtil";
import { toast } from "sonner";

// Helper to validate status for Axios
function validateStatus(status: number) {
  return (status >= 200 && status < 300) || status === 302;
}

// Submit a new leave application
export async function submitLeaveForm(payload: any) {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await api.post(
      "/api/student/leave",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data?.success) {
      throw new Error(
        response.data?.message || "Failed to submit leave form"
      );
    }

    toast.success("Leave application submitted successfully");

    return response.data.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Failed to submit leave form"
    );

    throw error;
  }
}

// Fetch leave history for a student
export async function fetchLeaveForms(
  rollNumber: string | number
) {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await api.get(
      `/api/student/leave/${rollNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus,
      }
    );

    if (!response.data?.success) {
      throw new Error(
        response.data?.message ||
        "Failed to fetch leave forms"
      );
    }

    return response.data.data;
  } catch (error: any) {
    console.error("Failed to fetch leave forms:", error);

    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch leave history"
    );

    throw error;
  }
}