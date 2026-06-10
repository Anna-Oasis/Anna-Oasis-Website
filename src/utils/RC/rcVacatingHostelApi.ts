import { axios_api as api } from "@/utils/api";
import { getToken } from "@/utils/auth/authUtil";

export type RCVacatingApplication = {
  student: Record<string, any>;
  vacating: {
    id: number;
    roll_number: string;
    vacating_date: string;
    vacating_time: string;
    future_address: string;
    returned_items?: string[] | null;
    status: string;
    endeavour?: string;
    endeavourDescription?: string;
    feedback?: string;
    created_at?: string;
    updated_at?: string;
  };
};

const authHeaders = async () => {
  const token = await getToken();
  if (!token) throw new Error("User is not authenticated");
  return { Authorization: `Bearer ${token}` };
};

export async function fetchRCVacatingApplications(): Promise<RCVacatingApplication[]> {
  const response = await api.get("/api/resident_counsellor/vacating_hostel", {
    headers: await authHeaders(),
  });
  return response.data?.data ?? [];
}

export async function approveRCVacatingApplication(vacating_hostel_id: number) {
  const response = await api.put("/api/resident_counsellor/vacating_hostel", {
    vacating_hostel_id,
    approve: true,
  }, {
    headers: await authHeaders(),
  });
  return response.data;
}

export async function rejectRCVacatingApplication(vacating_hostel_id: number, comment: string) {
  const response = await api.put("/api/resident_counsellor/vacating_hostel", {
    vacating_hostel_id,
    approve: false,
    comment,
  }, {
    headers: await authHeaders(),
  });
  return response.data;
}
