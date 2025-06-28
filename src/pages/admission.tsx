import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import  useUserStore  from "@/stores/userStore";
import AdmissionDetails from "@/components/admission/AdmissionDetails";
import HostelMessDeclaration from "@/components/admission/HostelMessDeclaration";
import PreviewPage from "@/components/admission/PreviewPage";
import { Formik } from "formik";
import { initialValues } from "@/constants/admission";
import validationSchemas from "@/constants/admissionValidation";
import { Button } from "@/components/ui/button";
const AdmissionForm = () => {
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState<"form" | "history">("form");
  const scrollRef = useRef<HTMLDivElement>(null);
  const details = useUserStore((state) => state.details);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!details) {
  //     navigate("/details");
  //   }
  // }, [details, navigate]);
 

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
    <div className="min-h-screen bg-white">
      <div className="flex justify-around mt-4 mb-2">
        <button
          className={`flex-1 py-3 border-b-2 ${activeTab === "form" ? "border-black" : "border-gray-200"}`}
          onClick={() => setActiveTab("form")}
        >
          Admission Form
        </button>
      </div>
      {activeTab === "form" ? (
        <Formik
          initialValues={initialValues}
          validationSchema={null}
          onSubmit={async (values) => {
            if (page < 2) {
              next();
            } else {
              // Submit logic here
              setActiveTab("history");
            }
          }}
        >
          {({ handleSubmit, values }) => (
            <div ref={scrollRef} className="p-4">
              {renderPage(handleSubmit, values)}
              <div className="flex justify-between mt-4">
                {page > 0 && (
                  <Button onClick={prev}>Back</Button>
                )}
                {page < 2 && (
                  <Button type="button" onClick={() => handleSubmit()}>Next</Button>
                )}
              </div>
            </div>
          )}
        </Formik>
      ) : null}
    </div>
  );
};

export default AdmissionForm;