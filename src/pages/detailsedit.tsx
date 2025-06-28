import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import  { initialValues } from "@/constants/details";
import validationSchemas from "@/constants/detailsValidations";
import StudentDetails from "@/components/details/StudentDetails";
import ParentDetails from "@/components/details/ParentDetails";
import LocalGuardian from "@/components/details/LocalGuardian";
import FileUploads from "@/components/details/FileUploads";
import useLoadingStore from "@/stores/loadingStore";
import useUserStore from "@/stores/userStore";
import api from "@/api";
// import { submitStudentDetails, updateStudentDetails, getStudentDetails } from "@/utils/student/studentDetailsApi";
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
          formData.append("user_id", "");
          formData.append("name", values.name);
          formData.append("rollNo", values.rollNo);
          formData.append("course", values.course);
          formData.append("branch", values.branch);
          formData.append("semester", values.semester);
          formData.append("mobile", values.mobile);
          formData.append("email", values.email);
          formData.append("emergencyContact", values.emergencyContact);
          formData.append("dateOfBirth", values.dateOfBirth);
          formData.append("age", values.age);
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
          formData.append("localGuardianRelationship", values.localGuardianRelationship);
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
            { key: "parentGuardianSignatureUrl", name: "parentGuardianSignatureUrl" },
            { key: "categoryProofUrl", name: "categoryProofUrl" },
            { key: "admissionSlipUrl", name: "admissionSlipUrl" },
          ] as const;
          type ImageFieldKey = (typeof imageFields)[number]["key"];
          for (const field of imageFields) {
            const uri = values[field.key as ImageFieldKey];
            if (uri) {
              const filename = uri.split("/").pop() || "image.jpg";
              const match = /\.(\w+)$/.exec(filename);
              const type = match ? `image/${match[1]}` : "image";
              formData.append(field.name, {
                uri,
                name: filename,
                type,
              } as any);
            }
          }

          // if (!details) {
          //   await submitStudentDetails(formData);
          // } else {
          //   await updateStudentDetails(details.rollNo, formData);
          // }

          // try {
          //   const fresh = await getStudentDetails();
          //   if (fresh && fresh.success) {
          //     setDetails(fresh.data);
          //   }
          // } catch (e) {
          //   console.error("Failed to fetch updated details:", e);
          // }

          // For now, just log all values and FormData keys for debugging
          console.log("Submitted values:", values);
          for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }

          // Store the form values in the user store for details page
          setDetails(values);
          console.log("Details updated in user store:", useUserStore.getState().details);

          setLoading(false);
          navigate("/admission", { replace: true });
        }
      }}
    >
      {({ handleSubmit, validateForm }) => (
        <div
          ref={scrollViewRef}
          style={{
            padding: 20,
            gap: 12,
            display: "flex",
            flexDirection: "column",
            minHeight: "80vh",
          }}
        >
          {renderPage()}
          <div className="flex justify-between mt-6">
            {page > 0 && (
              <Button type="button" variant="outline" onClick={prev}>
                Back
              </Button>
            )}
            <Button
              type="button"
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