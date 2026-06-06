import { axios_api as api } from "@/utils/api";
import { getToken } from "@/utils/auth/authUtil";
import type { RCStudent } from "@/utils/RC/rcStudentsApi";

export type AttendancePayload = {
  date: string;
  hostel: string;
  floor: number;
  no_present: number;
  no_absent: number;
  absentee: string[];
};

export type AttendanceRecord = AttendancePayload & {
  id: number;
  rc_id: number;
  created_at?: string;
  updated_at?: string;
};

const authHeaders = async () => {
  const token = await getToken();
  if (!token) throw new Error("User is not authenticated");
  return { Authorization: `Bearer ${token}` };
};

export async function submitRCAttendance(payload: AttendancePayload) {
  const response = await api.post("/api/resident_counsellor/attendance", payload, {
    headers: await authHeaders(),
  });
  return response.data;
}

export async function getAllRCStudentsForAttendance(): Promise<RCStudent[]> {
  const response = await api.get("/api/resident_counsellor/students", {
    headers: await authHeaders(),
  });
  return response.data?.data ?? [];
}

export async function getAttendanceHistory(): Promise<AttendanceRecord[]> {
  const response = await api.get("/api/resident_counsellor/attendance", {
    headers: await authHeaders(),
  });
  return response.data?.data ?? [];
}
