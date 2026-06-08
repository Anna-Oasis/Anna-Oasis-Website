import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";

export async function getRCLeavebyDw() {
  const token = await getToken();

  const response = await api.get(
    "/api/deputy_warden/rc/leave",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}

export async function updateRCLeaveStatusByDw(
  id: number,
  status: string,
  comment?: string
) {
  const token = await getToken();

  const response = await api.put(
    `/api/deputy_warden/rc/leave/${id}`,
    {
      status,
      comment: comment || "",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}