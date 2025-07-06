import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import AdmissionDetails from "@/components/admission/AdmissionDetails";
import HostelMessDeclaration from "@/components/admission/HostelMessDeclaration";
import PreviewPage from "@/components/admission/PreviewPage";
import { initialValues } from "@/constants/admission";
import validationSchemas from "@/constants/admissionValidation";
import useUserStore from "@/stores/userStore";
import { getAdmissionSession, submitStudentAdmission } from "@/utils/student/studentAdmissionApi";
import { getStudentDetails } from "@/utils/student/studentDetailsApi";
import useLoadingStore from "@/stores/loadingStore";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import { toast } from "sonner";

const AdmissionForm = () => {
  const [page, setPage] = useState(0);
  const [academic_year, setAcademicYear] = useState<any>(null);
  const details = useUserStore((state) => state.details);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const setDetails = useUserStore((state) => state.setDetails);
  const gender = details?.gender;
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [sessionOpen, setSessionOpen] = useState<boolean | null>(null);
  const [admissionapproved, setAdmissionApproved] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await getStudentDetails();
        if (response && response.count > 0) {
          setDetails(response.data);
          if (response.data.approve) {
            const semesterNumber = response.data.semester
            if (semesterNumber !== undefined) {
              const admissionsession = await getAdmissionSession(semesterNumber);
              console.log("Admission session data:", admissionsession);
              if (admissionsession.isOpen) {
                setSessionOpen(true);
                setAcademicYear(admissionsession.data.academic_year);
              } else {
                setSessionOpen(false);
                toast.error("Admission session is closed for this semester.");
              }
            } else {
              toast.error("Semester information is missing or invalid.");
              setSessionOpen(false);
            }
          } else {
            toast.error("You are not approved for admission yet. Please contact the administration.");
            setAdmissionApproved(false);
          }
        } else {
          navigate("/User/Student/details/edit", { replace: true });
        }
      } catch (e) {
        navigate("/User/Student/details/edit", { replace: true });
        console.error("Error fetching student details:", e);
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

  if(admissionapproved === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Ban className="w-20 h-20 text-red-400 mb-6" />
        <div className="text-2xl font-bold text-red-500 mb-2">Admission Not Approved</div>
        <div className="text-gray-500 text-lg">You are not approved for admission yet. Please contact the administration.</div>
      </div>
    );
  }

  // Show empty page with icon and message if session is closed
  if (sessionOpen === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Ban className="w-20 h-20 text-red-400 mb-6" />
        <div className="text-2xl font-bold text-red-500 mb-2">Admission Session Closed</div>
        <div className="text-gray-500 text-lg">Admission session is closed for this semester. Please check back later.</div>
      </div>
    );
  }

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
            console.log("admission year", academic_year);
            const requestBody = {
              roll_number: details?.rollNo || "",
              academicYear: academic_year || "",
              studentAgreed: declaration.includes("studentAgreed"),
              parentAgreed: declaration.includes("parentAgreed"),
              previousResident: values.previousResident === "Yes",
              hostelBlock: values.hostelBlock || "",
              messPreference: values.messPreference || "",
              transaction_id: values.transactionId,
              transactionPhotoUrl: values.transactionPhotoUrl,
            };
            setLoading(true);
            await submitStudentAdmission(requestBody);
            setLoading(false);
            toast.success("Admission details submitted successfully.");
            setTimeout(() => {
              navigate("/User/Student/details", { replace: true });
            }, 1500);
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => {
          useEffect(() => {
            if (gender === "male" && values.hostelBlock !== "Flora") {
              setFieldValue("hostelBlock", "Flora");
            } else if (
              gender === "female" &&
              values.hostelBlock !== "Lavender"
            ) {
              setFieldValue("hostelBlock", "Lavender");
            }
          }, [gender, setFieldValue, values.hostelBlock]);

          const hostelBlock = values.hostelBlock;

          return (
            <div ref={scrollRef} className="max-w-3/5 mx-auto bg-white rounded-xl shadow-md p-8 mt-4 transition-all duration-300">
              {hostelBlock && (
                <div className="mb-2 font-semibold text-blue-600">
                  Admission for hostel block {hostelBlock} for the year {academic_year}
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