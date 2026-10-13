import React from "react";

// 🌌 New High-Performance Parallax Image Wrapper
export const ParallaxImageWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "relative w-full aspect-video" }) => (
  /* The parent container provides the strict crop limits */
  <div className={`${className} overflow-hidden`}>
    {/* The child inside is scaled up to provide extra texture room to move without gaps */}
    <div className="w-full h-[120%] absolute -top-[10%] left-0 bg-black reveal-parallax-img will-change-transform">
      {children}
    </div>
  </div>
);
