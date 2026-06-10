import { axios_api as api } from "@/utils/api";
import { getToken } from "@/utils/auth/authUtil";

export type RCDetails = {
  userId?: number;
  name: string;
  dept: string;
  registerNo: string;
  dob: string;
  mobile: string;
  email: string;
  guardianName: string;
  residentialAddress: string;
  bloodGroup: string;
  medicalHistory: string;
  passportPhotoUrl?: string;
  rcSignatureUrl?: string;
  floor?: number[];
};

const authHeaders = async () => {
  const token = await getToken();
  if (!token) throw new Error("User is not authenticated");
  return { Authorization: `Bearer ${token}` };
};

export async function getRCDetails(): Promise<RCDetails | null> {
  const response = await api.get("/api/resident_counsellor/details", {
    headers: await authHeaders(),
  });
  const details = response.data?.data;
  return Array.isArray(details) ? details[0] ?? null : details ?? null;
}

export async function createRCDetails(formData: FormData) {
  const response = await api.post("/api/resident_counsellor/details", formData, {
    headers: {
      ...(await authHeaders()),
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function updateRCDetails(formData: FormData) {
  const response = await api.put("/api/resident_counsellor/details", formData, {
    headers: {
      ...(await authHeaders()),
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

