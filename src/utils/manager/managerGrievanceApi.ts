import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";
import { toast } from "sonner";

export async function getAllManagerGrievances() {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.get("/api/manager/grievance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Manager grievances response:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
        "An error occurred while fetching grievances",
    );
    throw error;
  }
}

export async function updateManagerGrievanceState(grievanceId: number) {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.put(
      `/api/manager/grievance/${grievanceId}`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
        "An error occurred while updating grievance status",
    );
    throw error;
  }
}
