// import React, {
//   useLayoutEffect,
//   useRef,
//   useEffect,
//   useState,
//   RefObject
// } from "react";
// import gsap from "gsap";
// import GlintText from "./GlintText";

// interface IBrandLogo {
//   status: string;
//   counterRef: RefObject<HTMLSpanElement | null>;
//   progress: number;
// }

// const BrandLogo = ({ status, counterRef, progress }: IBrandLogo) => {
//   const line1Ref = useRef<SVGPolygonElement>(null);
//   const line2Ref = useRef<SVGPolygonElement>(null);
//   const line3Ref = useRef<SVGPolygonElement>(null);
//   const line4Ref = useRef<SVGPolygonElement>(null);
//   const leftBarRef = useRef<SVGGElement>(null);
//   const gradientRef = useRef<SVGGElement>(null);
//   const h2Ref = useRef<HTMLHeadingElement>(null);
//   const h3Ref = useRef<HTMLHeadingElement>(null);
//   const timelineRef = useRef<gsap.core.Timeline | null>(null);

//   useLayoutEffect(() => {
//     const lines = [
//       line1Ref.current,
//       line2Ref.current,
//       line3Ref.current,
//       line4Ref.current
//     ];
//     if (
//       lines.some((l) => !l) ||
//       !leftBarRef.current ||
//       !gradientRef.current ||
//       !h2Ref.current ||
//       !h3Ref.current
//     )
//       return;

//     const tl = gsap.timeline({ repeat: -1 });
//     timelineRef.current = tl;

//     tl.to(lines, {
//       opacity: 0.15,
//       duration: 0.4,
//       stagger: {
//         each: 0.15,
//         yoyo: true,
//         repeat: 1
//       },
//       ease: "power1.inOut"
//     });

//     if (status === "loading") {
//       gsap.set(leftBarRef.current, { opacity: 0, x: 60 });
//       gsap.set(gradientRef.current, { opacity: 0, x: 60 });
//       gsap.set(h3Ref.current, { opacity: 0, y: 15 });
//     } else {
//       tl.pause();
//       gsap.set(lines, { opacity: 1 });
//       gsap.set(leftBarRef.current, { opacity: 1, x: 30 });
//       gsap.set(gradientRef.current, { opacity: 1, x: 88.56 });
//       gsap.set(".letter-node", { opacity: 1, filter: "blur(0px)" });
//       gsap.set(h3Ref.current, { opacity: 1, y: 0 });
//     }

//     return () => {
//       tl.kill();
//     };
//   }, []);

//   useEffect(() => {
//     const tl = timelineRef.current;
//     if (!tl) return;

//     if (status === "ready") {
//       tl.kill();
//       gsap.killTweensOf([
//         line1Ref.current,
//         line2Ref.current,
//         line3Ref.current,
//         line4Ref.current
//       ]);

//       const transitionTl = gsap.timeline();

//       transitionTl.to(
//         [
//           line1Ref.current,
//           line2Ref.current,
//           line3Ref.current,
//           line4Ref.current
//         ],
//         {
//           opacity: 1,
//           duration: 0.2
//         }
//       );

//       transitionTl.to(
//         leftBarRef.current,
//         { x: 30, opacity: 1, duration: 0.8, ease: "power3.out" },
//         "<"
//       );
//       transitionTl.to(
//         gradientRef.current,
//         { x: 88.56, opacity: 1, duration: 0.8, ease: "power3.out" },
//         "<"
//       );

//       transitionTl.to(
//         ".letter-node",
//         {
//           opacity: 1,
//           filter: "blur(0px)",
//           duration: 0.6,
//           stagger: 0.08,
//           ease: "power2.out"
//         },
//         "-=0.4"
//       );

//       transitionTl.to(
//         h3Ref.current,
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           ease: "power2.out"
//         },
//         "-=0.3"
//       );
//     }
//   }, [status]);

//   return (
//     <div className="flex items-center ">
//       <svg
//         xmlns="http://w3.org"
//         viewBox="0 0 160 220"
//         width={213}
//         height={293}
//         shapeRendering="geometricPrecision"
//         aria-label="Logo Icon"
//       >
//         <defs>
//           <filter id="shadow" x="-20%" y="-20%" width="150%" height="140%">
//             <feDropShadow
//               dx={0}
//               dy={10}
//               stdDeviation={6}
//               floodColor="#0f172a"
//               floodOpacity={0.2}
//             />
//           </filter>

//           <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#3b82f6" />
//             <stop offset="100%" stopColor="#8b5cf6" />
//           </linearGradient>
//         </defs>

//         <g
//           ref={leftBarRef}
//           transform="translate(0, 50)"
//           filter="url(#shadow)"
//           style={{ opacity: 0 }}
//         >
//           <path
//             d="M 50,18 L 50,10 L 0,35 L 0,125 L 22,114 L 22,106 L 7.14,113.43 L 7.14,39.43 L 50,18 Z"
//             fill="#ffffff"
//           />
//         </g>

//         <g transform="translate(60, 50)" filter="url(#shadow)">
//           <polygon
//             ref={line1Ref}
//             points="0,35 7.14,31.43 7.14,121.43 0,125"
//             fill="#ffffff"
//           />
//           <polygon
//             ref={line2Ref}
//             points="14.28,27.86 21.42,24.29 21.42,114.29 14.28,117.86"
//             fill="#ffffff"
//           />
//           <polygon
//             ref={line3Ref}
//             points="28.56,20.71 35.7,17.14 35.7,107.14 28.56,110.71"
//             fill="#ffffff"
//           />
//           <polygon
//             ref={line4Ref}
//             points="42.84,13.57 50,10 50,100 42.84,103.57"
//             fill="#ffffff"
//           />
//         </g>

//         <g
//           ref={gradientRef}
//           transform="translate(0, 50)"
//           filter="url(#shadow)"
//           style={{ opacity: 0 }}
//         >
//           <polygon points="0,35 50,10 50,100 0,125" fill="white" />
//         </g>
//       </svg>
//       <div className="text-center flex flex-col relative justify-center ">

//         <h2
//           className="font-sans font-light text-[52px] leading-14 text-white select-none"
//           ref={h2Ref}
//         >

//           {"GRAMMZ".split("").map((letter, index) => (
//             <span
//               key={index}
//               className="letter-node"
//               style={{
//                 opacity: 0,
//                 filter: "blur(12px)",
//                 display: "inline-block"
//               }}
//             >
//               {letter}
//             </span>
//           ))}
//         </h2>

//         <h3
//           ref={h3Ref}
//           style={{
//             letterSpacing: "45px",
//             textIndent: "45px",
//             margin: 0,
//             display: "inline-block",
//             userSelect: "none",
//             opacity: 0
//           }}
//           className="font-sans text-center"
//         >
//           DECOR
//         </h3>
//       </div>
//     </div>
//   );
// };

// export default BrandLogo;

import React, { useLayoutEffect, useRef, useEffect, RefObject } from "react";
import gsap from "gsap";

interface IBrandLogo {
  status: string;
  counterRef: RefObject<HTMLSpanElement | null>;
  progress: number;
}

const BrandLogo = ({ status }: IBrandLogo) => {
  const line1Ref = useRef<SVGPolygonElement>(null);
  const line2Ref = useRef<SVGPolygonElement>(null);
  const line3Ref = useRef<SVGPolygonElement>(null);
  const line4Ref = useRef<SVGPolygonElement>(null);
  const leftBarRef = useRef<SVGGElement>(null);
  const gradientRef = useRef<SVGGElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const lines = [
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      line4Ref.current
    ];
    if (
      lines.some((l) => !l) ||
      !leftBarRef.current ||
      !gradientRef.current ||
      !h2Ref.current ||
      !h3Ref.current
    )
      return;

    const tl = gsap.timeline({ repeat: -1 });
    timelineRef.current = tl;

    tl.to(lines, {
      opacity: 0.15,
      duration: 0.4,
      stagger: {
        each: 0.15,
        yoyo: true,
        repeat: 1
      },
      ease: "power1.inOut"
    });

    if (status === "loading") {
      // 💡 Optimization 1: Use native SVG transform attributes instead of layout positions
      gsap.set(leftBarRef.current, {
        opacity: 0,
        attr: { transform: "translate(60, 50)" }
      });
      gsap.set(gradientRef.current, {
        opacity: 0,
        attr: { transform: "translate(60, 50)" }
      });
      gsap.set(h3Ref.current, { opacity: 0, y: 15, force3D: true });
    } else {
      tl.pause();
      gsap.set(lines, { opacity: 1 });
      gsap.set(leftBarRef.current, {
        opacity: 1,
        attr: { transform: "translate(30, 50)" }
      });
      gsap.set(gradientRef.current, {
        opacity: 1,
        attr: { transform: "translate(88.56, 50)" }
      });
      gsap.set(".letter-node", { opacity: 1, filter: "blur(0px)", y: 0 });
      gsap.set(h3Ref.current, { opacity: 1, y: 0 });
    }

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (status === "ready") {
      tl.kill();
      gsap.killTweensOf([
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        line4Ref.current
      ]);

      const transitionTl = gsap.timeline();

      transitionTl.to(
        [
          line1Ref.current,
          line2Ref.current,
          line3Ref.current,
          line4Ref.current
        ],
        {
          opacity: 1,
          duration: 0.2
        }
      );

      // 💡 Optimization 2: Target the 'attr' object to let the GPU handle transform matrices directly
      transitionTl.to(
        leftBarRef.current,
        {
          attr: { transform: "translate(30, 50)" },
          opacity: 1,
          duration: 0.6,
          ease: "quad.out"
        },
        "<"
      );

      transitionTl.to(
        gradientRef.current,
        {
          attr: { transform: "translate(88.56, 50)" },
          opacity: 1,
          duration: 0.6,
          ease: "quad.out"
        },
        "<"
      );

      transitionTl.to(
        ".letter-node",
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "quad.out",
          force3D: true
        },
        "-=0.3"
      );

      transitionTl.to(
        h3Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "quad.out",
          force3D: true
        },
        "-=0.2"
      );
    }
  }, [status]);

  return (
    <div className="flex items-center gap-2 md:gap-4 max-w-full ">
      <div className="w-[120px] h-[165px] md:w-[213px] md:h-[293px] flex-shrink-0">
        <svg
          xmlns="http://w3.org"
          viewBox="0 0 160 220"
          className="w-full h-full"
          shapeRendering="geometricPrecision"
          aria-label="Logo Icon"
          style={{ willChange: "transform" }} // 💡 Optimization 3: Hint browser to cache the rendering viewport
        >
          {/* 💡 Optimization 4: Set hardware wrapper transforms directly into the base markup */}
          <g
            ref={leftBarRef}
            transform="translate(60, 50)"
            filter="none"
            style={{ opacity: 0 }}
          >
            <path
              d="M 50,18 L 50,10 L 0,35 L 0,125 L 22,114 L 22,106 L 7.14,113.43 L 7.14,39.43 L 50,18 Z"
              fill="#ffffff"
            />
          </g>

          <g transform="translate(60, 50)" filter="none">
            <polygon
              ref={line1Ref}
              points="0,35 7.14,31.43 7.14,121.43 0,125"
              fill="#ffffff"
            />
            <polygon
              ref={line2Ref}
              points="14.28,27.86 21.42,24.29 21.42,114.29 14.28,117.86"
              fill="#ffffff"
            />
            <polygon
              ref={line3Ref}
              points="28.56,20.71 35.7,17.14 35.7,107.14 28.56,110.71"
              fill="#ffffff"
            />
            <polygon
              ref={line4Ref}
              points="42.84,13.57 50,10 50,100 42.84,103.57"
              fill="#ffffff"
            />
          </g>

          <g
            ref={gradientRef}
            transform="translate(60, 50)"
            filter="none"
            style={{ opacity: 0 }}
          >
            <polygon points="0,35 50,10 50,100 0,125" fill="white" />
          </g>
        </svg>
      </div>

      <div className="text-center flex flex-col relative justify-center select-none">
        <h2
          className="font-sans font-light text-[32px] leading-8 md:text-[52px] md:leading-14 text-white"
          ref={h2Ref}
        >
          {"GRAMMZ".split("").map((letter, index) => (
            <span
              key={index}
              className="letter-node"
              style={{
                opacity: 0,
                filter: "blur(12px)",
                transform: "translateY(8px)",
                display: "inline-block"
              }}
            >
              {letter}
            </span>
          ))}
        </h2>

        <h3
          ref={h3Ref}
          style={{
            margin: 0,
            display: "inline-block",
            opacity: 0
          }}
          className="font-sans text-center text-[11px] md:text-[14px] tracking-[24px] indent-[24px] md:tracking-[47px] md:indent-[47px]"
        >
          DECOR
        </h3>
      </div>
    </div>
  );
};

export default BrandLogo;
