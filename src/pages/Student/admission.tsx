import  { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import AdmissionDetails from "@/components/admission/AdmissionDetails";
import HostelMessDeclaration from "@/components/admission/HostelMessDeclaration";
import PreviewPage from "@/components/admission/PreviewPage";
import { initialValues } from "@/constants/admission";
import validationSchemas from "@/constants/admissionValidation";
import useUserStore from "@/stores/userStore";
import { submitStudentAdmission } from "@/utils/student/studentAdmissionApi";
import { getStudentDetails } from "@/utils/student/studentDetailsApi";
import useLoadingStore from "@/stores/loadingStore";
import { Button } from "@/components/ui/button";

const AdmissionForm = () => {
  const [page, setPage] = useState(0);
  const details = useUserStore((state) => state.details);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const setDetails = useUserStore((state) => state.setDetails);
  const currentYear = new Date().getFullYear();
  const gender = details?.gender;
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await getStudentDetails();
  
        if (response && response.data) {
          setDetails(response.data);
        } else {
          navigate("/User/Student/details/edit", { replace: true });
        }
      } catch (e) {
        navigate("/User/Student/details/edit", { replace: true });
      }
    }
    fetchDetails();
  }, [setDetails, navigate]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  const next = () => setPage((p) => p + 1);
  const prev = () => setPage((p) => p - 1);

  const renderPage = (handleSubmit: () => void, values: any) => {
    switch (page) {
      case 0:
        return <AdmissionDetails />;
      case 1:
        return <HostelMessDeclaration />;
      case 2:
        return <PreviewPage onEdit={prev} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen max-w-full from-blue-50 to-white">
      <div className="flex justify-center mt-10 mb-6">
        <div className="text-3xl font-bold text-blue-700">Admission Form</div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[page]}
        onSubmit={async (values) => {
          if (page < 2) {
            next();
          } else {
            const declaration = values.declaration || [];
            const details = useUserStore.getState().details;
            const academicYear = `${currentYear}-${currentYear + 1}`;
            const requestBody = {
              roll_number: details?.rollNo || "",
              academicYear,
              studentAgreed: declaration.includes("studentAgreed"),
              parentAgreed: declaration.includes("parentAgreed"),
              admissionCategory: values.admissionCategory || "",
              previousResident: values.previousResident === "Yes",
              hostelBlock: values.hostelBlock || "",
              messPreference: values.messPreference || "",
              transaction_id: values.transactionId,
            };
            setLoading(true);
            await submitStudentAdmission(requestBody);
            setLoading(false);
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => {
          useEffect(() => {
            if (gender === "male" && values.hostelBlock !== "Flora") {
              setFieldValue("hostelBlock", "Flora");
            } else if (
              gender === "female" &&
              values.hostelBlock !== "Lavendar"
            ) {
              setFieldValue("hostelBlock", "Lavendar");
            }
          }, [gender, setFieldValue, values.hostelBlock]);

          const hostelBlock = values.hostelBlock;

          return (
            <div ref={scrollRef} className="max-w-3/5 mx-auto bg-white rounded-xl shadow-md p-8 mt-4 transition-all duration-300">
              {hostelBlock && (
                <div className="mb-2 font-semibold text-blue-600">
                  Admission for hostel block {hostelBlock} for the year {currentYear}
                </div>
              )}
              {renderPage(handleSubmit, values)}
              <div className="flex justify-between mt-8">
                {page > 0 && page < 2 && (
                  <Button variant="outline" onClick={prev} className="transition-all duration-200">
                    Back
                  </Button>
                )}
                {page < 2 && (
                  <Button onClick={() => handleSubmit()} className="transition-all duration-200">
                    Next
                  </Button>
                )}
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default AdmissionForm;