import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";

export async function getDeputyWardenGrievances() {
  const token = await getToken();

  const response = await api.get(
    "/api/deputy_warden/grievance",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}