import api from "@/api";
// import { getToken } from "../authUtils";

export async function getAllManagerAdmissions() {
  try {
    // const token = await getToken();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE3NTA5NDA2NzAsImV4cCI6MTc1MzUzMjY3MH0.9C48hTtv94Ip9gn-fJJhsRE5gPBNlufZGm7CvMT6DAs'
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.get("/api/manager/admissions", {
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

export async function managerApprove(admissionId: string) {
  try {
    // const token = await getToken();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE3NTA5NDA2NzAsImV4cCI6MTc1MzUzMjY3MH0.9C48hTtv94Ip9gn-fJJhsRE5gPBNlufZGm7CvMT6DAs'
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.put(
      `/api/manager/admissions/${admissionId}`,
      {
        approve: true,
        comment: "Approved",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.alert("Admission approved successfully");
    return response.data;
  } catch (error: any) {
    window.alert(
      error.response?.data?.message ||
        "An error occurred while approving the admission"
    );
    throw error;
  }
}

export async function managerDecline(admissionId: string, comment: string) {
  try {
    // const token = await getToken();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE3NTA5NDA2NzAsImV4cCI6MTc1MzUzMjY3MH0.9C48hTtv94Ip9gn-fJJhsRE5gPBNlufZGm7CvMT6DAs'
    if (!token) {
      throw new Error("User is not authenticated");
    }
    const response = await api.put(
      `/api/manager/admissions/${admissionId}`,
      {
        approve: false,
        comment: comment || "Declined",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.alert("Admission declined successfully");
    return response.data;
  } catch (error: any) {
    window.alert(
      error.response?.data?.message ||
        "An error occurred while declining the admission"
    );
    throw error;
  }
}
