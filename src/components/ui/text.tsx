import React from "react";

interface TextProps {
  children: React.ReactNode;
  bold?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const sizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const Text = ({ children, bold, size = "md", className = "" }: TextProps) => (
  <span
    className={`${sizeMap[size]} ${bold ? "font-bold" : ""} ${className}`}
  >
    {children}
  </span>
);

export default Text;