import { axios_api as api } from "@/utils/api";
import { getToken } from "@/utils/auth/authUtil";

export type RCAdmission = {
  admission: Record<string, any>;
  student: Record<string, any>;
};

export type Room = {
  roomNumber: number;
  hostelBlock: string;
  academicYear: string;
  floor: number;
  rollNo?: string[] | null;
};

export type AdmissionSession = {
  id: number;
  from: string;
  to: string;
  semesters: number[];
  academic_year: string;
};

export type AllocateRoomPayload = {
  approve: boolean;
  comment?: string;
  room: number;
  floor: number;
  hostel_block: string;
};

const authHeaders = async () => {
  const token = await getToken();
  if (!token) throw new Error("User is not authenticated");
  return { Authorization: `Bearer ${token}` };
};

export async function getAllRCAdmissions(): Promise<RCAdmission[]> {
  const response = await api.get("/api/resident_counsellor/admissions/", {
    headers: await authHeaders(),
  });
  return response.data?.data ?? [];
}

export async function getAdmissionSessions(): Promise<AdmissionSession[]> {
  const response = await api.get("/api/resident_counsellor/admissions/session", {
    headers: await authHeaders(),
  });
  return response.data?.data ?? [];
}

export async function getAllRooms(academicYear: string): Promise<Room[]> {
  const response = await api.get(`/api/resident_counsellor/rooms/${academicYear}`, {
    headers: await authHeaders(),
  });
  return response.data?.data ?? [];
}

export async function allocateRoomAdmission(admissionId: string, updateData: AllocateRoomPayload) {
  const response = await api.put(`/api/resident_counsellor/admissions/room/${admissionId}`, updateData, {
    headers: await authHeaders(),
  });
  return response.data;
}
