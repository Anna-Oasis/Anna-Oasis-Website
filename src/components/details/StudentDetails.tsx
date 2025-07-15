import TextField from "@/components/formComponents/TextField";
import SelectField from "@/components/formComponents/SelectField";
import DateAndTimePicker from "@/components/formComponents/DatePicker";
import RadioField from "@/components/formComponents/RadioField";
import PhoneInputField from "@/components/formComponents/PhoneInputField";
import {
  Departments,
  semesters,
  bloodGroups,
  ugCourses,
  pgCourses,
  ugBranches,
  pgBranches,
} from "@/constants/details";
import { admissionCategories } from "@/constants/admission";
import nationalities from "@/constants/nationalities";
import HelperText from "@/components/HelperText";
import useUserStore from "@/stores/userStore";
import { useFormikContext } from "formik";
interface StudentFormValues {
  name: string;
  rollNo?: string;
  courseType: string;
  course: string;
  branch: string;
  semester: string;
  mobile: string;
  email: string;
  emergencyContact: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  admissionCategory: string;
  admissionCategoryReason?: string;
  bloodGroup: string;
  medicalHistory?: string;
}
const StudentDetails = () => {
  const details = useUserStore((state) => state.details);
  console.log("StudentDetails component rendered with details:", details);
  const { values } = useFormikContext<StudentFormValues>();

  // Get available courses based on courseType
  const getAvailableCourses = () => {
    if (values.courseType === "UG") return ugCourses;
    if (values.courseType === "PG") return pgCourses;
    return [];
  };

  // Get available branches based on courseType and course
  const getAvailableBranches = () => {
    if (values.courseType === "UG" && values.course) {
      return ugBranches[values.course as keyof typeof ugBranches] || [];
    }
    if (values.courseType === "PG" && values.course) {
      return pgBranches[values.course as keyof typeof pgBranches] || [];
    }
    return [];
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-10 max-w-3xl mx-auto mt-8 transition-all duration-300">
      <HelperText>
        <span className="font-semibold text-blue-700">Note:</span> You cannot
        change your roll number once submitted. It will be linked with your
        account.
      </HelperText>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TextField label="Name" value="name" placeholder="Enter name" />
        {!details || details.length === 0 ? (
          <TextField label="Roll No" value="rollNo" placeholder="Roll number" />
        ) : null}
         <RadioField
          label="Course Type"
          value="courseType"
          options={[
            { label: "Undergraduate (UG)", value: "UG" },
            { label: "Postgraduate (PG)", value: "PG" },
          ]}
        />
        {values.courseType && (
          <SelectField
            label="Course"
            value="course"
            options={getAvailableCourses()}
          />
        )}
        {values.course && (
          <SelectField
            label="Branch"
            value="branch"
            options={getAvailableBranches()}
          />
        )}
        <SelectField label="Semester" value="semester" options={semesters} />
        <SelectField
          label="Admission Category"
          value="admissionCategory"
          options={admissionCategories}
        />
        {values?.admissionCategory === "Other" && (
          <TextField
            label="Reason to join the hostel"
            value="admissionCategoryReason"
            placeholder="Please specify your reason"
          />
        )}
        <PhoneInputField
          label="Mobile"
          value="mobile"
          placeholder="Phone number"
        />
        <TextField label="Email" value="email" placeholder="Email" />
        <PhoneInputField
          label="Emergency Contact Number"
          value="emergencyContact"
          placeholder="Emergency contact"
        />
        <DateAndTimePicker
          label="Date of Birth"
          value="dateOfBirth"
          placeholder="YYYY-MM-DD"
        />
        <RadioField
          label="Gender"
          value="gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />
        <SelectField
          label="Nationality"
          value="nationality"
          options={nationalities}
        />
        <SelectField
          label="Blood Group"
          value="bloodGroup"
          options={bloodGroups}
        />
        <TextField
          label="Medical History (Type NIL if none)"
          value="medicalHistory"
          placeholder="Optional"
        />
      </div>
    </div>
  );
};

export default StudentDetails;
