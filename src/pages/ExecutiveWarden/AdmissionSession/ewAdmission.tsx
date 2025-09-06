import { useState } from "react";
import AdmissionSessionForm from "@/components/executiveWarden/AdmissionSessionForm";
import AdmissionSessionHistory from "@/components/executiveWarden/AdmissionSessionHistory";
import { FilePlus2, History } from "lucide-react";

const AdmissionSession = () => {
  const [activeTab, setActiveTab] = useState<"form" | "history">("history");

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex space-x-4 border-b mb-4">
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition ${
            activeTab === "history"
              ? "border-blue-600 text-blue-600 font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <History className="w-5 h-5" />
          History
        </button>
        <button
          onClick={() => setActiveTab("form")}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition ${
            activeTab === "form"
              ? "border-blue-600 text-blue-600 font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <FilePlus2 className="w-5 h-5" />
          Start Session
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "form" ? (
          <AdmissionSessionForm />
        ) : (
          <AdmissionSessionHistory />
        )}
      </div>
    </div>
  );
};

export default AdmissionSession;
