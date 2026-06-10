import api from "@/api";
import { getToken } from "@/utils/auth/authUtil";

export const submitStudentVacatingForm = async (
  rollNumber: string,
  vacatingData: any,
  cautionData: any,
) => {
  try {
    const token = await getToken();

    const requestBody = {
      vacatingForm: {
        roll_number: rollNumber,
        ...vacatingData,
      },

      cautionDeposit: {
        ...cautionData,
      },
    };

    

    const response = await api.post(
      "/api/student/vacating_hostel",
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.log(
      "BACKEND ERROR:",
      JSON.stringify(error?.response?.data, null, 2),
    );

    throw error;
  }
};

export const getVacatingHistory = async () => {
  try {
    const token = await getToken();

    const response = await api.get("/api/student/vacating_hostel", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data || [];
  } catch (error: any) {
    console.log(
      "FETCH HISTORY ERROR:",
      JSON.stringify(error?.response?.data, null, 2),
    );

    return [];
  }
};
