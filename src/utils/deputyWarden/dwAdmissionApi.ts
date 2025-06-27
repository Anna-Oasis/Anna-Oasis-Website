import api from "@/api";
// import { getToken } from "../authUtils";

export async function getAllDWAdmissions() {
  try {
    // const token = await getToken();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwIiwicm9sZSI6ImRlcHV0eVdhcmRlbiIsImlhdCI6MTc1MDk0ODg5MCwiZXhwIjoxNzUzNTQwODkwfQ.58LMVxeI7F6NDLR_IMjvQMvx4O1MkuhcooJkX5nW69I'
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.get(`/api/deputy_warden/admissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    window.alert(
      error.response?.data?.message ||
        "An error occurred while fetching admissions"
    );
    throw error;
  }
}

export async function handleUpdateAdmission(
  admissionId: string,
  { comment, approve }: { comment: string; approve: boolean }
) {
  try {
    // const token = await getToken();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwIiwicm9sZSI6ImRlcHV0eVdhcmRlbiIsImlhdCI6MTc1MDk0ODg5MCwiZXhwIjoxNzUzNTQwODkwfQ.58LMVxeI7F6NDLR_IMjvQMvx4O1MkuhcooJkX5nW69I'
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.put(
      `/api/deputy_warden/admissions/${admissionId}`,
      { comment, approve },
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
        "An error occurred while updating the admission"
    );
    throw error;
  }
}