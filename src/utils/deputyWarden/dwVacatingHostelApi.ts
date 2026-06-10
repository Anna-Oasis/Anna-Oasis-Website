import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";

export async function fetchDWVacatingForms() {
  const token = await getToken();

  const res = await api.get(
    "/api/deputy_warden/vacating_hostel",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
}

export async function approveDWVacatingForm(
  vacatingHostelId: number
) {
  const token = await getToken();

  const res = await api.put(
    `/api/deputy_warden/vacating_hostel/${vacatingHostelId}`,
    {
      approve: true,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function rejectDWVacatingForm(
  vacatingHostelId: number,
  reason: string
) {
  const token = await getToken();

  const res = await api.put(
    `/api/deputy_warden/vacating_hostel/${vacatingHostelId}`,
    {
      approve: false,
      comment: reason,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}