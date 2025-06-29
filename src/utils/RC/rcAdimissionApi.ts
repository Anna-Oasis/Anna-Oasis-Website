import api from "@/api";
// import { getToken } from "../authUtils";

// Define types for Admission and Room if you know the structure
// Here's a generic fallback:
export type RCAdmission = Record<string, any>;
export type Room = Record<string, any>;

export async function getAllRCAdmissions(): Promise<RCAdmission[]> {
  try {
    // const token = await getToken();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4Iiwicm9sZSI6InJjIiwiaWF0IjoxNzUwOTM4MzUwLCJleHAiOjE3NTM1MzAzNTB9.Ll5tZY2oKkt4-CPlqXJQ8GFbNZl-rgls8XJyScby7SA';
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await api.get<{ data: RCAdmission[] }>("/api/resident_counsellor/admissions/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data)
    return response.data.data;
  } catch (error: any) {
    window.alert(
      error.response?.data?.message ||
        "An error occurred while fetching admissions"
    );
    throw error;
  }
}

export async function getAllRooms(): Promise<Room[]> {
  const academicYear = "2025-2026";
  try {
    // const token = await getToken();
    const token = '';
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await api.get<{ data: Room[] }>(
      `/api/resident_counsellor/rooms/${academicYear}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    window.alert(
      error.response?.data?.message ||
        "An error occurred while fetching rooms"
    );
    throw error;
  }
}

export type AllocateRoomPayload = {
  approve: boolean;
  comment?: string;
  room: number;
  floor: number;
  hostel_block: string;
};

export async function allocateRoomAdmission(
  admissionId: string,
  updateData: AllocateRoomPayload
): Promise<RCAdmission> {
//   const token = await getToken();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4Iiwicm9sZSI6InJjIiwiaWF0IjoxNzUwOTM4MzUwLCJleHAiOjE3NTM1MzAzNTB9.Ll5tZY2oKkt4-CPlqXJQ8GFbNZl-rgls8XJyScby7SA';
  if (!token) {
    throw new Error("User is not authenticated");
  }

  console.log("Allocating room for admission:", admissionId, updateData);

  const response = await api.put<{ data: RCAdmission }>(
    `/api/resident_counsellor/admissions/${admissionId}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}
