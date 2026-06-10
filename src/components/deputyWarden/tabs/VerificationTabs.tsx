interface VerificationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  "Leave Form",
  "Summer Vacation",
  "Vacating Hostel",
];

const VerificationTabs = ({
  activeTab,
  setActiveTab,
}: VerificationTabsProps) => {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`rounded-xl px-5 py-3 whitespace-nowrap font-medium transition ${
            activeTab === tab
              ? "bg-[#022B60] text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default VerificationTabs;