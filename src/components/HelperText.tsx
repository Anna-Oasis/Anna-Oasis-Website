import React from "react";

interface HelperTextProps {
  children: React.ReactNode;
  className?: string;
}

const HelperText = ({ children, className = "" }: HelperTextProps) => (
  <span className={`text-xs text-yellow-700 bg-yellow-100 rounded px-2 py-1 my-2 ${className}`}>
    {children}
  </span>
);

export default HelperText;