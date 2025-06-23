// pages/Addmission.tsx
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormFieldWrapper } from "../formComponent/formField";
import { Button } from "@/components/ui/button";

const AdmissionFormSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().nonempty("Name should not be null"),
  country: z.string().nonempty("Country must be specified"),
  nationality: z.string().nonempty("Specify your nationality"),
  course: z.string().nonempty("Specify degree"),
  alternativeEmail: z.string().email("Invalid alternative email"),
  whNumber: z
    .string()
    .regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid international phone number"),
  remarks: z.string(),
});

type AdmissionFormType = z.infer<typeof AdmissionFormSchema>;

const Addmission = () => {
  const form = useForm<AdmissionFormType>({
    resolver: zodResolver(AdmissionFormSchema),
  });

  const onSubmit = (data: AdmissionFormType) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Admission Form</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormFieldWrapper
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="example@domain.com"
          />

          <FormFieldWrapper
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
          />

          <FormFieldWrapper
            control={form.control}
            name="country"
            label="Country"
            placeholder="India"
          />

          <FormFieldWrapper
            control={form.control}
            name="nationality"
            label="Nationality"
            placeholder="Indian"
          />

          <FormFieldWrapper
            control={form.control}
            name="course"
            label="Course / Degree"
            placeholder="B.Tech IT"
          />

          <FormFieldWrapper
            control={form.control}
            name="alternativeEmail"
            label="Alternative Email"
            type="email"
            placeholder="alt@domain.com"
          />

          <FormFieldWrapper
            control={form.control}
            name="whNumber"
            label="WhatsApp Number"
            type="tel"
            placeholder="+91XXXXXXXXXX"
          />

          <FormFieldWrapper
            control={form.control}
            name="remarks"
            label="Remarks"
            isTextArea
            placeholder="Any comments or questions..."
          />

         <Button type="submit">
            Submit
         </Button>
        </form>
      </Form>
    </div>
  );
};

export default Addmission;
