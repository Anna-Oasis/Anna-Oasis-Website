import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { initialValues } from "@/constants/details";
import validationSchemas from "@/constants/detailsValidations";
import StudentDetails from "@/components/details/StudentDetails";
import ParentDetails from "@/components/details/ParentDetails";
import LocalGuardian from "@/components/details/LocalGuardian";
import FileUploads from "@/components/details/FileUploads";
import useLoadingStore from "@/stores/loadingStore";
import useUserStore from "@/stores/userStore";
import {
  submitStudentDetails,
  updateStudentDetails,
  getStudentDetails,
} from "@/utils/student/studentDetailsApi";
import { Button } from "@/components/ui/button";

export default function DetailsEditPage() {
  const [page, setPage] = useState(0);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const details = useUserStore((state) => state.details);
  const setDetails = useUserStore((state) => state.setDetails);
  const navigate = useNavigate();
  const scrollViewRef = useRef<HTMLDivElement>(null);

  const next = () => {
    setPage((p) => p + 1);
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const prev = () => setPage((p) => p - 1);

  const renderPage = () => {
    switch (page) {
      case 0:
        return <StudentDetails />;
      case 1:
        return <ParentDetails />;
      case 2:
        return <LocalGuardian />;
      case 3:
        return <FileUploads />;
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={details ? { ...initialValues, ...details } : initialValues}
      validationSchema={validationSchemas[page]}
      onSubmit={async (values) => {
        if (page < 3) {
          next();
        } else {
          setLoading(true);
          const formData = new FormData();
          formData.append("user_id", details?.userId || "");
          formData.append("name", values.name);
          formData.append("rollNo", values.rollNo);
          formData.append("course", values.course);
          formData.append("branch", values.branch);
          formData.append("semester", values.semester);
          formData.append("admissionCategory", values.admissionCategory);
          if (
            values.admissionCategory === "Other" &&
            values.admissionCategoryReason
          ) {
            formData.append(
              "admissionCategoryReason",
              values.admissionCategoryReason
            );
          }
          formData.append("mobile", values.mobile);
          formData.append("email", values.email);
          formData.append("emergencyContact", values.emergencyContact);
          formData.append("dateOfBirth", values.dateOfBirth);
          formData.append("gender", values.gender);
          formData.append("nationality", values.nationality);
          formData.append("bloodGroup", values.bloodGroup);
          formData.append("medicalHistory", values.medicalHistory);
          formData.append("fatherName", values.fatherName);
          formData.append("fatherOccupation", values.fatherOccupation);
          formData.append("fatherMobile", values.fatherMobile);
          formData.append("fatherEmail", values.fatherEmail);
          formData.append("fatherCountry", values.fatherCountry);
          formData.append("motherName", values.motherName);
          formData.append("motherOccupation", values.motherOccupation);
          formData.append("motherMobile", values.motherMobile);
          formData.append("motherEmail", values.motherEmail);
          formData.append("motherCountry", values.motherCountry);
          formData.append("resIndiaHouseNo", values.resIndiaHouseNo);
          formData.append("resIndiaStreet", values.resIndiaStreet);
          formData.append("resIndiaCity", values.resIndiaCity);
          formData.append("resIndiaState", values.resIndiaState);
          formData.append("resIndiaCountry", "India");
          formData.append("resIndiaPostalCode", values.resIndiaPostalCode);
          formData.append("resForeignHouseNo", values.resForeignHouseNo);
          formData.append("resForeignStreet", values.resForeignStreet);
          formData.append("resForeignCity", values.resForeignCity);
          formData.append("resForeignState", values.resForeignState);
          formData.append("resForeignCountry", values.resForeignCountry);
          formData.append("resForeignPostalCode", values.resForeignPostalCode);
          formData.append("localGuardianName", values.localGuardianName);
          formData.append(
            "localGuardianRelationship",
            values.localGuardianRelationship
          );
          formData.append("localGuardianMobile", values.localGuardianMobile);
          formData.append("localGuardianEmail", values.localGuardianEmail);
          formData.append("guardianHouseNo", values.guardianHouseNo);
          formData.append("guardianStreet", values.guardianStreet);
          formData.append("guardianCity", values.guardianCity);
          formData.append("guardianState", values.guardianState);
          formData.append("guardianCountry", values.guardianCountry);
          formData.append("guardianPostalCode", values.guardianPostalCode);
          formData.append("govtIdType", values.govtIdType);
          formData.append("govtId", values.govtId);
          const imageFields = [
            { key: "passportPhotoUrl", name: "passportPhotoUrl" },
            { key: "studentSignatureUrl", name: "studentSignatureUrl" },
            {
              key: "parentGuardianSignatureUrl",
              name: "parentGuardianSignatureUrl",
            },
            { key: "categoryProofUrl", name: "categoryProofUrl" },
            { key: "admissionSlipUrl", name: "admissionSlipUrl" },
          ] as const;
          type ImageFieldKey = (typeof imageFields)[number]["key"];
          async function urlToFile(
            url: string,
            filename: string,
            mimeType: string
          ) {
            const res = await fetch(url);
            const blob = await res.blob();
            return new File([blob], filename, { type: mimeType });
          }

          // In your loop:
          for (const field of imageFields) {
            const uri = values[field.key as ImageFieldKey];
            if (uri) {
              const filename = uri.split("/").pop() || "image.jpg";
              const match = /\.(\w+)$/.exec(filename);
              const type = match ? `image/${match[1]}` : "image/jpeg";
              const file = await urlToFile(uri, filename, type);
              formData.append(field.name, file);
            }
          }

          if (!details || details.length === 0) {
            console.log("Submitting new student details:", formData);
            await submitStudentDetails(formData, navigate);
          } else {
            await updateStudentDetails(details.rollNo, formData, navigate);
          }

          try {
            const fresh = await getStudentDetails();
            if (fresh && fresh.success) {
              setDetails(fresh.data);
            }
          } catch (e) {
            console.error("Failed to fetch updated details:", e);
          }

          // For now, just log all values and FormData keys for debugging
          console.log("Submitted values:", values);
          for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }

          // setLoading(false);
          // navigate("/User/Student/admission", { replace: true });
        }
      }}
    >
      {({ handleSubmit, validateForm }) => (
        <div
          ref={scrollViewRef}
          className="max-w-3/5 mx-auto bg-white rounded-xl shadow-md p-8 mt-8 flex flex-col min-h-[80vh] transition-all duration-300"
        >
          <div className="mb-6">
            <div className="text-2xl font-bold text-blue-700 mb-2">
              Edit Student Details
            </div>
            <div className="text-gray-500 text-sm">
              Please fill in all required fields and navigate through the steps.
            </div>
          </div>
          {renderPage()}
          <div className="flex justify-between mt-8">
            {page > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={prev}
                className="transition-all duration-200"
              >
                Back
              </Button>
            )}
            <Button
              type="button"
              className="transition-all duration-200"
              onClick={async () => {
                const formErrors = await validateForm();
                if (Object.keys(formErrors).length > 0) {
                  console.log("Formik validation errors:", formErrors);
                }
                handleSubmit();
              }}
            >
              {page < 3 ? "Next" : "Update Details"}
            </Button>
          </div>
        </div>
      )}
    </Formik>
  );
}
