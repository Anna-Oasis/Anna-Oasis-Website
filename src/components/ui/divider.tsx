import React from "react";

interface DividerProps {
  label?: string;
  className?: string;
  labelClassName?: string;
}

export const Divider: React.FC<DividerProps> = ({ label, className = "", labelClassName = "" }) => (
  <div className={`flex items-center w-full my-4 ${className}`}>
    <hr className="flex-grow border-t border-gray-300" />
    {label && (
      <span className={`mx-4 text-gray-500 text-sm select-none ${labelClassName}`}>
        {label}
      </span>
    )}
    <hr className="flex-grow border-t border-gray-300" />
  </div>
);