"use client";

import { useRouter } from "next/navigation";
import gsap from "gsap";
import React from "react";

// Define strict TypeScript types for your custom props
interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  veilRef: React.RefObject<HTMLDivElement | null>; // Pass your local page's veil ref down
  onClick?: () => void;
}

const CustomLinkWithTransition: React.FC<CustomLinkProps> = ({
  href,
  children,
  className = "mt-4 px-4 py-2 text-sm cursor-pointer rounded bg-black/50 w-fit",
  veilRef,
  onClick
}) => {
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (veilRef.current) {
      gsap.to(veilRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // 🚩 Set the temporary transition token
          sessionStorage.setItem("routeTransitionActive", "true");
          router.push(href, { scroll: false });
          if (onClick) onClick();
        }
      });
    }
  };

  return (
    <a href={href} onClick={handleNavigation} className={className}>
      {children}
    </a>
  );
};

export default CustomLinkWithTransition;
