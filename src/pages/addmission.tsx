// pages/Addmission.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormFieldWrapper } from "../components/formField";
import { Button } from "@/components/ui/button";
import AlertBox from "@/components/AlertBox";
import { useEffect, useState } from "react";
import { AdmissionFormSchema } from "@/utils/admissionSchema";
import { admissionFields, defaultValues } from "@/utils/formFields";
import type { AlertMessage } from "@/utils/HandlePreAdmission";
import type { AdmissionFormType } from "@/utils/admissionSchema";
import { handlePreAdmissionForm } from "@/utils/HandlePreAdmission";



const Addmission = () => {

  const[alertMessage, setAlertMessage] = useState<AlertMessage | null>(null)

  const form = useForm<AdmissionFormType>({
    resolver: zodResolver(AdmissionFormSchema),
    defaultValues : defaultValues
  });

    const handlePreAdmission = async(data : AdmissionFormType) => {
         const alert = await handlePreAdmissionForm(data, () => form.reset());
        setAlertMessage(alert);
    }

    useEffect(() => {
        if(alertMessage){
          const timeout = setTimeout(() => setAlertMessage(null), 5000);
          return () => clearTimeout(timeout);
        }
    }, [alertMessage])

  return (
    <div className="max-w-xl mx-auto p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4">Admission Form</h2>
      <div className="m-4">
        {alertMessage && <AlertBox alertTitle={alertMessage.title} alertDescription={alertMessage.message} error={alertMessage.error}/>}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePreAdmission)} className="space-y-4">
          {admissionFields.map((field, index) => (
              <FormFieldWrapper
                control={form.control}
                key={index}
                {...field}
              />
          ))}
         <Button type="submit">
            Submit
         </Button>
        </form>
      </Form>
    </div>
  );
};

export default Addmission;
