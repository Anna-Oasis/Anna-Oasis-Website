import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bloodGroups } from "@/constants/details";
import { createRCDetails, getRCDetails, updateRCDetails, type RCDetails } from "@/utils/RC/rcDetailsApi";

const initialValues = {
  name: "",
  dept: "",
  registerNo: "",
  dob: "",
  mobile: "",
  email: "",
  guardianName: "",
  residentialAddress: "",
  bloodGroup: "",
  medicalHistory: "",
  passportPhoto: null as File | null,
  rcSignature: null as File | null,
};

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  dept: Yup.string().required("Department is required"),
  registerNo: Yup.string().required("Register number is required"),
  dob: Yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD").required("Date of birth is required"),
  mobile: Yup.string().required("Mobile number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  guardianName: Yup.string().required("Guardian name is required"),
  residentialAddress: Yup.string().required("Address is required"),
  bloodGroup: Yup.string().required("Blood group is required"),
  medicalHistory: Yup.string(),
});

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-sm text-red-600">{message}</p> : null;
}

export default function RCDetailsEditPage() {
  const navigate = useNavigate();
  const [details, setDetails] = useState<RCDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRCDetails()
      .then(setDetails)
      .catch(() => toast.error("Failed to load existing RC details"))
      .finally(() => setLoading(false));
  }, []);

  const formInitialValues = useMemo(() => ({
    ...initialValues,
    name: details?.name ?? "",
    dept: details?.dept ?? "",
    registerNo: details?.registerNo ?? "",
    dob: details?.dob ?? "",
    mobile: details?.mobile ?? "",
    email: details?.email ?? "",
    guardianName: details?.guardianName ?? "",
    residentialAddress: details?.residentialAddress ?? "",
    bloodGroup: details?.bloodGroup ?? "",
    medicalHistory: details?.medicalHistory ?? "",
  }), [details]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-600">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading details form...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-3xl rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{details ? "Edit RC Details" : "Fill RC Details"}</h1>
        <p className="mt-2 text-slate-600">Complete the profile fields used by the RC workflow.</p>

        <Formik
          enableReinitialize
          initialValues={formInitialValues}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("dept", values.dept);
            formData.append("registerNo", values.registerNo);
            formData.append("dob", values.dob);
            formData.append("mobile", values.mobile);
            formData.append("email", values.email);
            formData.append("guardianName", values.guardianName);
            formData.append("residentialAddress", values.residentialAddress);
            formData.append("bloodGroup", values.bloodGroup);
            formData.append("medicalHistory", values.medicalHistory || "NIL");
            if (values.passportPhoto) formData.append("passportPhoto", values.passportPhoto);
            if (values.rcSignature) formData.append("rcSignature", values.rcSignature);

            try {
              if (details) {
                await updateRCDetails(formData);
                toast.success("RC details updated successfully");
              } else {
                await createRCDetails(formData);
                toast.success("RC details saved successfully");
              }
              navigate("/RC/Details");
            } catch (error: any) {
              toast.error(error.response?.data?.message || "Failed to save RC details");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
            <Form className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                <FieldError message={touched.name ? errors.name : undefined} />
              </div>
              <div>
                <Label htmlFor="dept">Department</Label>
                <Input id="dept" name="dept" value={values.dept} onChange={handleChange} onBlur={handleBlur} />
                <FieldError message={touched.dept ? errors.dept : undefined} />
              </div>
              <div>
                <Label htmlFor="registerNo">Register Number</Label>
                <Input id="registerNo" name="registerNo" value={values.registerNo} onChange={handleChange} onBlur={handleBlur} />
                <FieldError message={touched.registerNo ? errors.registerNo : undefined} />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" name="dob" type="date" value={values.dob} onChange={handleChange} onBlur={handleBlur} />
                <FieldError message={touched.dob ? errors.dob : undefined} />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <Input id="mobile" name="mobile" value={values.mobile} onChange={handleChange} onBlur={handleBlur} />
                <FieldError message={touched.mobile ? errors.mobile : undefined} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                <FieldError message={touched.email ? errors.email : undefined} />
              </div>
              <div>
                <Label htmlFor="guardianName">Guardian Name</Label>
                <Input id="guardianName" name="guardianName" value={values.guardianName} onChange={handleChange} onBlur={handleBlur} />
                <FieldError message={touched.guardianName ? errors.guardianName : undefined} />
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={values.bloodGroup}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map((group) => <option key={group.value} value={group.value}>{group.label}</option>)}
                </select>
                <FieldError message={touched.bloodGroup ? errors.bloodGroup : undefined} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="residentialAddress">Residential Address</Label>
                <Textarea id="residentialAddress" name="residentialAddress" value={values.residentialAddress} onChange={handleChange} onBlur={handleBlur} />
                <FieldError message={touched.residentialAddress ? errors.residentialAddress : undefined} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea id="medicalHistory" name="medicalHistory" value={values.medicalHistory} onChange={handleChange} onBlur={handleBlur} placeholder="Type NIL if none" />
              </div>
              <div>
                <Label htmlFor="passportPhoto">Passport Photo</Label>
                <Input id="passportPhoto" type="file" accept="image/*" onChange={(event) => setFieldValue("passportPhoto", event.currentTarget.files?.[0] ?? null)} />
              </div>
              <div>
                <Label htmlFor="rcSignature">Signature</Label>
                <Input id="rcSignature" type="file" accept="image/*" onChange={(event) => setFieldValue("rcSignature", event.currentTarget.files?.[0] ?? null)} />
              </div>
              <div className="flex gap-3 pt-2 md:col-span-2">
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : details ? "Update Details" : "Submit Details"}</Button>
                <Button type="button" variant="outline" onClick={() => navigate("/RC/Details")}>Cancel</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
