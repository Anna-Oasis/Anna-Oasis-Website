import { axios_api as api } from "@/utils/api";
import { getToken } from "@/utils/auth/authUtil";

export type RCInfo = {
  id: number;
  userId: number;
  name: string;
  hostel: string;
  onLeave: boolean;
  floor: number[];
  alternatingToRCId: number | null;
  createdAt: string;
  updatedAt: string;
};

export type RCLeave = {
  Id?: number;
  id?: number;
  rcId?: number;
  rc_id?: number;
  leaving: string;
  arrival: string;
  reason: string;
  approved: string;
  createdAt?: string;
  created_at?: string;
  dwApprovedAt?: string;
  ewUpdatedAt?: string;
};

export type RCLeaveFormPayload = {
  arrival: string;
  leaving: string;
  reason: string;
  alternate: number;
};

const authHeaders = async () => {
  const token = await getToken();
  if (!token) throw new Error("User is not authenticated");
  return { Authorization: `Bearer ${token}` };
};

export async function getRCList(): Promise<RCInfo[]> {
  const response = await api.get("/api/resident_counsellor/list", {
    headers: await authHeaders(),
  });
  return response.data?.data ?? [];
}

export async function submitRCLeaveForm(payload: RCLeaveFormPayload) {
  const response = await api.post("/api/resident_counsellor/leave", payload, {
    headers: await authHeaders(),
  });
  return response.data;
}

export async function getRCLeaves(): Promise<RCLeave[]> {
  const response = await api.get("/api/resident_counsellor/leave", {
    headers: await authHeaders(),
  });
  return response.data?.data ?? [];
}

export async function completeRCLeave() {
  const response = await api.post("/api/resident_counsellor/leave/complete", {}, {
    headers: await authHeaders(),
  });
  return response.data;
}
