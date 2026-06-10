import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";

export async function getDeputyWardenGrievances() {
  const token = await getToken();

  const response = await api.get("/api/deputy_warden/grievance", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data;
}

export async function updateDeputyWardenGrievanceStatus(
  grievanceId: number,
  approve: boolean,
  comment?: string
) {
  const token = await getToken();

  const payload: Record<string, unknown> = { approve };
  if (comment?.trim()) payload.comment = comment.trim();

  const response = await api.put(
    `/api/deputy_warden/grievance/${grievanceId}`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
}
