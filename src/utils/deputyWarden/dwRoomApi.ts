import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";

export async function getRoomsByAcademicYear(
  academicYear: string
) {
  const token = await getToken();

  const response = await api.get(
    `/api/deputy_warden/rooms/${academicYear}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}