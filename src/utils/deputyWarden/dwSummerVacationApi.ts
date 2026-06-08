import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";

export async function getStudentVacationsByDw() {
  const token = await getToken();

  const response = await api.get(
    "/api/deputy_warden/summer_vacation",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}

export async function updateVacationStatusByDw(
  id: number,
  approve: boolean,
  comment?: string
) {
  const token = await getToken();

  const response = await api.put(
    `/api/deputy_warden/summer_vacation/${id}`,
    {
      approve,
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