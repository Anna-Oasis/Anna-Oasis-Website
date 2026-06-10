/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";

export async function fetchAllRCs() {
  const token = await getToken();

  const res = await api.get("/api/deputy_warden/rc", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
}

export async function addRC(formData: FormData) {
  const token = await getToken();

  const data: Record<string, any> = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  const res = await api.post(
    "/api/deputy_warden/rc",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
}

export async function removeRC(rcId: string) {
  const token = await getToken();

  const res = await api.delete(
    `/api/deputy_warden/rc/${rcId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function assignFloors(
  rcId: string,
  payload: {
    name: string;
    hostel: string;
    floor: number[];
  }
) {
  const token = await getToken();

  const res = await api.put(
    `/api/deputy_warden/rc/${rcId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
}