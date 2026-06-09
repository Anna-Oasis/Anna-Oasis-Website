import React from "react";

// Define strict prop types matching standard HTML SVG elements
export interface SpinnerProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: "small" | "medium" | "large";
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(function Spinner(
  { className = "", size = "medium", ...props },
  ref,
) {
  // Standardize sizing using Tailwind classes
  const sizeClasses = {
    small: "h-4 w-4 stroke-[3]",
    medium: "h-8 w-8 stroke-[2.5]",
    large: "h-12 w-12 stroke-[2]",
  };

  return (
    <svg
      ref={ref}
      role="img"
      aria-label={props["aria-label"] || "loading"}
      className={`animate-spin text-blue-600 ${sizeClasses[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Background track circle */}
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
      />
      {/* Animated active spinning arc */}
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
});

Spinner.displayName = "Spinner";

export { Spinner };
