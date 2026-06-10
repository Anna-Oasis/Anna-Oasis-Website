import { axios_api as api } from "@/utils/api";
import { getToken } from "@/utils/auth/authUtil";

export type RCGrievanceItem = {
  grievances: {
    id: number;
    roll_number: string;
    grievance_type: string;
    subject: string;
    description: string;
    status: string;
    rc_decision_at?: string | null;
    resolved_at?: string | null;
    created_at?: string;
  };
  student: Record<string, any>;
};

const authHeaders = async () => {
  const token = await getToken();
  if (!token) throw new Error("User is not authenticated");
  return { Authorization: `Bearer ${token}` };
};

export async function getAllRCGrievances(): Promise<RCGrievanceItem[]> {
  const response = await api.get("/api/resident_counsellor/grievance", {
    headers: await authHeaders(),
  });
  return response.data?.data ?? [];
}

export async function updateGrievanceStatus(grievanceId: number, approve: boolean) {
  const response = await api.put(`/api/resident_counsellor/grievance/${grievanceId}`, { approve }, {
    headers: await authHeaders(),
  });
  return response.data;
}
