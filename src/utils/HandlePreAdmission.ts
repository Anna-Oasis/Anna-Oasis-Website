import axios from "axios";
import { api } from "./api";
import type { AdmissionFormType } from "./admissionSchema";

export type AlertMessage = {
  title: string;
  message: string;
  error : boolean
};


export const handlePreAdmissionForm = async (
  data: AdmissionFormType,
  resetForm: () => void
): Promise<AlertMessage> => {
  try {
    const res = await axios.post(`${api}/api/preadmission`, data);
    const alertMsg: AlertMessage = {
      title: res.data.success ? "Submitted" : "OOPS",
      message: res.data.message,
      error: !res.data.success,
    };

    if (res.data.success) {
      resetForm();
    }

    return alertMsg;
  } catch (error: any) {
    return {
      title: "OOPS",
      message: error.response?.data?.message || error.message,
      error: true,
    };
  }
};
