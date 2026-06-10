import api from "@/api";
import { getToken } from "../auth/authUtil";

export async function getStudentDetails(rollNo: string) {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.get(
      `/api/executive_warden/student/details/${rollNo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Fetch Student Details Error:", error);
    throw error;
  }
}
