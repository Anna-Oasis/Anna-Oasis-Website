import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";

export async function getAttendanceReports() {
  const token = await getToken();

  const res = await api.get(
    "/api/deputy_warden/attendance",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
}