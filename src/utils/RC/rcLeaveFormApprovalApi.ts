import { axios_api as api } from "@/utils/api";
import { getToken } from "@/utils/auth/authUtil";

export type RCLeaveFormItem = {
  leave_form: {
    id: number;
    roll_number: string;
    leave_type: string;
    from_date: string;
    to_date: string;
    reason: string;
    address_of_stay: string;
    mobile: string;
    email: string;
    status: string;
    created_at?: string;
    updated_at?: string;
  };
  student: Record<string, any>;
};

const authHeaders = async () => {
  const token = await getToken();
  if (!token) throw new Error("User is not authenticated");
  return { Authorization: `Bearer ${token}` };
};

export async function fetchRCLeaveForms(): Promise<RCLeaveFormItem[]> {
  const response = await api.get("/api/resident_counsellor/student_leave", {
    headers: await authHeaders(),
  });
  return response.data?.data ?? [];
}

export async function updateRCLeaveFormStatus(leaveFormId: number, approve: boolean, comment?: string) {
  const payload: { approve: boolean; comment?: string } = { approve };
  if (!approve && comment) payload.comment = comment;

  const response = await api.put(`/api/resident_counsellor/student_leave/${leaveFormId}`, payload, {
    headers: await authHeaders(),
  });
  return response.data;
}
