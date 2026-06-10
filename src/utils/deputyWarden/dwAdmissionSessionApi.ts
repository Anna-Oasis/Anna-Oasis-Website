import api from "@/api";
import { getToken } from "../auth/authUtil";

export async function getAdmissionSessions() {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.get(`/api/deputy_warden/admissions/session`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Fetch Error:", error);
    throw error;
  }
}