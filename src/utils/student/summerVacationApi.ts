import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";
import { toast } from "sonner";

export interface SummerVacationForm {
  id: number;
  roll_number: string;
  vacation_from: string;
  address_of_stay: string;
  returned_items: string[];
  status: "0" | "1" | "2" | "-1";
  created_at: string;
  updated_at: string;
}

export const VacationStatusMap = {
  "0": "Pending",
  "1": "Pending (Approved by RC)",
  "2": "Approved",
  "-1": "Rejected",
};

export async function submitSummerVacationRequest(payload: {
  roll_number: string;
  email: string;
  mobile: string;
  vacation_from: string;
  address_of_stay: string;
  returned_items: string[];
}) {
  try {
    const token = await getToken();

    const response = await api.post(
      "/api/student/summer_vacation",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
      "Failed to submit vacation request"
    );
    throw error;
  }
}

export async function fetchSummerVacationForms(
  rollNumber: string
) {
  try {
    const token = await getToken();

    const response = await api.get(
      `/api/student/summer_vacation/${rollNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
      "Failed to fetch vacation history"
    );
    throw error;
  }
}