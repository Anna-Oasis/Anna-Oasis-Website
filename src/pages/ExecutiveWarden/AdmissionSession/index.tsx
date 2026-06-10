import { useState } from "react";
import { FilePlus2, History } from "lucide-react"; // Swapped lucide-react-native for the web version
import TabSwitch from "@/components/TabSwitch";

// Temporary placeholder imports until you share their native code
import AdmissionSessionForm from "@/components/executiveWarden/AdmissionSessionForm.tsx";
import AdmissionSessionHistory from "@/components/executiveWarden/AdmissionSessionHistory.tsx";

const AdmissionSession = () => {
  const [activeTab, setActiveTab] = useState<"form" | "history">("history");

  return (
    <div className="flex-1 min-h-screen bg-white p-6">
      {/* Tab Selector Section */}
      <TabSwitch
        tabs={[
          { label: "History", value: "history" },
          { label: "Start Session", value: "form" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        icons={{
          form: FilePlus2,
          history: History,
        }}
        className="mt-2"
      />

      {/* Conditional View Rendering */}
      <div className="flex-1 mt-4">
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
