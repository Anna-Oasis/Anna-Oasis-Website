import api from "@/api";
import { getToken } from "../auth/authUtil";

export async function createAdmissionSession(sessionData: {
  from: string;
  to: string;
  semesters: number[];
  academic_year: string;
}) {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.post(
      `/api/executive_warden/admissions/session`,
      sessionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Create Error:", error);
    throw error;
  }
}

export async function getAdmissionSessions() {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.get(`/api/executive_warden/admissions/session`, {
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

export async function editAdmissionSession(
  id: number | string,
  sessionData: {
    from: string;
    to: string;
    semesters: number[];
    academic_year: string;
  },
) {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.put(
      `/api/executive_warden/admissions/session/${id}`,
      sessionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Edit Error:", error);
    throw error;
  }
}
