interface AdmissionTabsProps {
  activeTab: "allocation" | "approval";
  setActiveTab: (tab: "allocation" | "approval") => void;
}

const AdmissionTabs = ({
  activeTab,
  setActiveTab,
}: AdmissionTabsProps) => {
  return (
    <div className="mb-6 flex rounded-2xl bg-slate-100 p-1">
      <button
        onClick={() => setActiveTab("allocation")}
        className={`flex-1 rounded-xl py-3 font-semibold transition ${
          activeTab === "allocation"
            ? "bg-[#022B60] text-white"
            : "text-slate-600"
        }`}
      >
        Room Allocation
      </button>

      <button
        onClick={() => setActiveTab("approval")}
        className={`flex-1 rounded-xl py-3 font-semibold transition ${
          activeTab === "approval"
            ? "bg-[#022B60] text-white"
            : "text-slate-600"
        }`}
      >
        Final Approval
      </button>
    </div>
  );
};

export default AdmissionTabs;