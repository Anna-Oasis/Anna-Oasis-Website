import { axios_api as api } from "@/utils/api";
import { getToken } from "@/utils/auth/authUtil";

export type VacationForm = {
  summer_vacation: {
    id: number;
    roll_number: string;
    vacation_from: string;
    address_of_stay: string;
    returned_items?: string[];
    mobile: string;
    email: string;
    status: string;
    created_at?: string;
    updated_at?: string;
  };
  student: Record<string, any>;
};

export type VacationFormResponse = {
  success: boolean;
  message: string;
  data: VacationForm[];
};

const authHeaders = async () => {
  const token = await getToken();
  if (!token) throw new Error("User is not authenticated");
  return { Authorization: `Bearer ${token}` };
};

export async function getStudentVacations(): Promise<VacationFormResponse> {
  const response = await api.get("/api/resident_counsellor/summer_vacation", {
    headers: await authHeaders(),
  });
  return response.data;
}

export async function updateVacationStatus(id: number, approve: boolean, comment?: string) {
  const response = await api.put(`/api/resident_counsellor/summer_vacation/${id}`, {
    approve,
    comment: comment || "",
  }, {
    headers: await authHeaders(),
  });
  return response.data;
}
