import React from "react";

interface TabSwitchProps<T extends string> {
  tabs: { label: string; value: T }[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
  icons?: { [key in T]?: React.ElementType };
}

function TabSwitch<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  icons = {},
}: TabSwitchProps<T>) {
  return (
    <div
      className={`flex w-full justify-around border-b border-gray-200 ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        const IconComponent = icons[tab.value];

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            className={`flex-1 py-3 flex flex-col items-center justify-center border-b-2 transition-all duration-150 ${
              isActive
                ? "border-[#022B60]/80 text-[#022B60]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {IconComponent && (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <IconComponent
                {...({
                  className: `w-5 h-5 mb-1 transition-colors ${
                    isActive ? "text-[#022B60]" : "text-gray-400"
                  }`,
                } as any)}
              />
            )}
            <span className="text-lg font-semibold tracking-wide">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default TabSwitch;
