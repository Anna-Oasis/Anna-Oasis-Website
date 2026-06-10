/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";

export async function fetchDeputyWardenLeaveForms() {
  const token = await getToken();

  const res = await api.get(
    "/api/deputy_warden/student_leave",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
}

export async function updateDeputyWardenLeaveFormStatus(
  leaveFormId: number,
  approve: boolean,
  comment?: string
) {
  const token = await getToken();

  const payload: any = { approve };

  if (!approve && comment) {
    payload.comment = comment;
  }

  const res = await api.put(
    `/api/deputy_warden/student_leave/${leaveFormId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
}