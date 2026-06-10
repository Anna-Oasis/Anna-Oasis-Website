import { axios_api as api } from "@/utils/api";
import { getToken } from "@/utils/auth/authUtil";

export type RCStudent = {
  rollNo: string;
  name: string;
  roomNumber: number | null;
  course: string;
  branch: string;
  semester: string;
  mobile: string;
  email: string;
  emergencycontact?: string;
  emergencyContact?: string;
  floor: number | null;
  hostelBlock: string | null;
};

export async function getRCStudents(): Promise<RCStudent[]> {
  const token = await getToken();
  if (!token) throw new Error("User is not authenticated");

  const response = await api.get("/api/resident_counsellor/students", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data?.data ?? [];
}
