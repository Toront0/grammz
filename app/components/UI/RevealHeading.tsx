import React from "react";

// Reusable Masked Heading Component
export const RevealHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({
  children,
  className = "text-2xl lg:text-5xl text-gray-200 leading-tight"
}) => (
  <div className="block overflow-hidden w-full">
    <h2
      className={`${className} reveal-heading-inner text-gray-200 opacity-0 will-change-transform`}
    >
      {children}
    </h2>
  </div>
);
