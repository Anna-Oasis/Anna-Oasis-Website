import { z } from "zod";

export const studentLeaveSchema = z.object({
  leave_type: z.string().min(1, "Leave type is required"),
  from_date: z.string().min(1, "From date is required"),
  to_date: z.string().min(1, "To date is required"),
  reason: z.string().min(1, "Reason is required"),
  address_of_stay: z.string().min(1, "Address is required"),
  mobile: z
  .string()
  .regex(/^\+[1-9]\d{5,14}$/, "Include country code (e.g., +91...)"),
  email: z.string().email("Invalid email"),
});

export type StudentLeaveFormData =
  z.infer<typeof studentLeaveSchema>;