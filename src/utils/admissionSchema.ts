import {z} from 'zod'

export const AdmissionFormSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().nonempty("Name should not be null"),
  country: z.string().nonempty("Country must be specified"),
  nationality: z.string().nonempty("Specify your nationality"),
  interestedCourse: z.string().nonempty("Specify degree"),
  interestedBranch: z.string().nonempty("Specify branch"),
  alternateMail: z.string().email("Invalid alternative email"),
  whatsappNumber: z
    .string()
    .regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid international phone number"),
  remarks: z.string(),
});

export type AdmissionFormType = z.infer<typeof AdmissionFormSchema>;
