import React, { useLayoutEffect, useRef, useEffect, RefObject } from "react";
import gsap from "gsap";

interface IBrandLogo {
  status: string;
  progress: number;
}

const BrandLogo = ({ status, progress }: IBrandLogo) => {
  const line1Ref = useRef<SVGPolygonElement>(null);
  const line2Ref = useRef<SVGPolygonElement>(null);
  const line3Ref = useRef<SVGPolygonElement>(null);
  const line4Ref = useRef<SVGPolygonElement>(null);
  const leftBarRef = useRef<SVGGElement>(null);
  const gradientRef = useRef<SVGGElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const lines = [
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      line4Ref.current
    ];
    if (lines.some((l) => !l) || !leftBarRef.current) return;

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
      gsap.set(leftBarRef.current, {
        opacity: 0,
        attr: { transform: "translate(60, 50)" }
      });
      gsap.set(gradientRef.current, {
        opacity: 0,
        attr: { transform: "translate(60, 50)" }
      });
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
      if (h3Ref.current) gsap.set(h3Ref.current, { opacity: 1, y: 0 });
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

      // Fade out the progress bar cleanly before introducing the text
      if (progressContainerRef.current) {
        transitionTl.to(progressContainerRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "quad.inOut"
        });
      }

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
        },
        "-=0.1"
      );

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
        "-=0.2"
      );

      if (h3Ref.current) {
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
    }
  }, [status]);

  return (
    <div className="flex items-center gap-4 md:gap-6 max-w-full">
      {/* SVG Icon Viewport Container */}
      <div className="w-[120px] h-[165px] md:w-[213px] md:h-[293px] flex-shrink-0">
        <svg
          xmlns="http://w3.org"
          viewBox="0 0 160 220"
          className="w-full h-full"
          shapeRendering="geometricPrecision"
          aria-label="Logo Icon"
          style={{ willChange: "transform" }}
        >
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

      {/* Dynamic Text / Progress Content Block */}
      <div className="flex flex-col relative justify-center  select-none w-[150px] lg:w-[320px]">
        {status === "loading" ? (
          <div
            ref={progressContainerRef}
            className="flex flex-col items-start justify-center w-full gap-2 text-white/70"
          >
            <div className="flex items-baseline gap-1 font-mono text-sm tracking-wider md:text-base">
              {/* Render the prop directly here */}
              <span>{Math.round(progress)}</span>
              <span className="text-[10px] opacity-50">%</span>
            </div>
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-white transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <h2
              className="font-sans font-light text-[32px] leading-8  md:text-[52px] md:leading-14 text-white text-left"
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
              className="font-sans  text-left text-[11px] md:text-[14px] tracking-[28px] lg:tracking-[48px] text-white/50 mt-1"
            >
              DECOR
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;

// import React, { useLayoutEffect, useRef, useEffect, RefObject } from "react";
// import gsap from "gsap";

// interface IBrandLogo {
//   status: string;
//   progress: number;
// }

// const BrandLogo = ({ status, progress }: IBrandLogo) => {
//   const line1Ref = useRef<SVGPolygonElement>(null);
//   const line2Ref = useRef<SVGPolygonElement>(null);
//   const line3Ref = useRef<SVGPolygonElement>(null);
//   const line4Ref = useRef<SVGPolygonElement>(null);
//   const leftBarRef = useRef<SVGGElement>(null);
//   const gradientRef = useRef<SVGGElement>(null);
//   const h2Ref = useRef<HTMLHeadingElement>(null);
//   const h3Ref = useRef<HTMLHeadingElement>(null);
//   const progressContainerRef = useRef<HTMLDivElement>(null);
//   const timelineRef = useRef<gsap.core.Timeline | null>(null);

//   useLayoutEffect(() => {
//     const lines = [
//       line1Ref.current,
//       line2Ref.current,
//       line3Ref.current,
//       line4Ref.current
//     ];
//     if (lines.some((l) => !l) || !leftBarRef.current) return;

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
//       gsap.set(leftBarRef.current, {
//         opacity: 0,
//         attr: { transform: "translate(60, 50)" }
//       });
//       gsap.set(gradientRef.current, {
//         opacity: 0,
//         attr: { transform: "translate(60, 50)" }
//       });
//     } else {
//       tl.pause();
//       gsap.set(lines, { opacity: 1 });
//       gsap.set(leftBarRef.current, {
//         opacity: 1,
//         attr: { transform: "translate(30, 50)" }
//       });
//       gsap.set(gradientRef.current, {
//         opacity: 1,
//         attr: { transform: "translate(88.56, 50)" }
//       });
//       gsap.set(".letter-node", { opacity: 1, filter: "blur(0px)", y: 0 });
//       if (h3Ref.current) gsap.set(h3Ref.current, { opacity: 1, y: 0 });
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

//       // Fade out the progress bar cleanly before introducing the text
//       if (progressContainerRef.current) {
//         transitionTl.to(progressContainerRef.current, {
//           opacity: 0,
//           y: -10,
//           duration: 0.3,
//           ease: "quad.inOut"
//         });
//       }

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
//         },
//         "-=0.1"
//       );

//       transitionTl.to(
//         leftBarRef.current,
//         {
//           attr: { transform: "translate(30, 50)" },
//           opacity: 1,
//           duration: 0.6,
//           ease: "quad.out"
//         },
//         "<"
//       );

//       transitionTl.to(
//         gradientRef.current,
//         {
//           attr: { transform: "translate(88.56, 50)" },
//           opacity: 1,
//           duration: 0.6,
//           ease: "quad.out"
//         },
//         "<"
//       );

//       transitionTl.to(
//         ".letter-node",
//         {
//           opacity: 1,
//           filter: "blur(0px)",
//           y: 0,
//           duration: 0.5,
//           stagger: 0.04,
//           ease: "quad.out",
//           force3D: true
//         },
//         "-=0.2"
//       );

//       if (h3Ref.current) {
//         transitionTl.to(
//           h3Ref.current,
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.5,
//             ease: "quad.out",
//             force3D: true
//           },
//           "-=0.2"
//         );
//       }
//     }
//   }, [status]);

//   return (
//     <div className="flex items-center gap-4 md:gap-6 max-w-full">
//       {/* SVG Icon Viewport Container */}
//       <div className="w-[120px] h-[165px] md:w-[213px] md:h-[293px] flex-shrink-0">
//         <svg
//           xmlns="http://w3.org"
//           viewBox="0 0 160 220"
//           className="w-full h-full"
//           shapeRendering="geometricPrecision"
//           aria-label="Logo Icon"
//           style={{ willChange: "transform" }}
//         >
//           <g
//             ref={leftBarRef}
//             transform="translate(60, 50)"
//             filter="none"
//             style={{ opacity: 0 }}
//           >
//             <path
//               d="M 50,18 L 50,10 L 0,35 L 0,125 L 22,114 L 22,106 L 7.14,113.43 L 7.14,39.43 L 50,18 Z"
//               fill="#ffffff"
//             />
//           </g>

//           <g transform="translate(60, 50)" filter="none">
//             <polygon
//               ref={line1Ref}
//               points="0,35 7.14,31.43 7.14,121.43 0,125"
//               fill="#ffffff"
//             />
//             <polygon
//               ref={line2Ref}
//               points="14.28,27.86 21.42,24.29 21.42,114.29 14.28,117.86"
//               fill="#ffffff"
//             />
//             <polygon
//               ref={line3Ref}
//               points="28.56,20.71 35.7,17.14 35.7,107.14 28.56,110.71"
//               fill="#ffffff"
//             />
//             <polygon
//               ref={line4Ref}
//               points="42.84,13.57 50,10 50,100 42.84,103.57"
//               fill="#ffffff"
//             />
//           </g>

//           <g
//             ref={gradientRef}
//             transform="translate(60, 50)"
//             filter="none"
//             style={{ opacity: 0 }}
//           >
//             <polygon points="0,35 50,10 50,100 0,125" fill="white" />
//           </g>
//         </svg>
//       </div>

//       {/* Dynamic Text / Progress Content Block */}
//       <div className="flex flex-col relative justify-center select-none min-w-[150px] md:min-w-[240px]">
//         {status === "loading" ? (
//           <div
//             ref={progressContainerRef}
//             className="flex flex-col items-start justify-center w-full gap-2 text-white/70"
//           >
//             <div className="flex items-baseline gap-1 font-mono text-sm tracking-wider md:text-base">
//               {/* Render the prop directly here */}
//               <span>{Math.round(progress)}</span>
//               <span className="text-[10px] opacity-50">%</span>
//             </div>
//             <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
//               <div
//                 className="h-full bg-white transition-all duration-150 ease-out"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>
//         ) : (
//           <>
//             <h2
//               className="font-sans font-light text-[32px] leading-8 md:text-[52px] md:leading-14 text-white text-left"
//               ref={h2Ref}
//             >
//               {"GRAMMZ".split("").map((letter, index) => (
//                 <span
//                   key={index}
//                   className="letter-node"
//                   style={{
//                     opacity: 0,
//                     filter: "blur(12px)",
//                     transform: "translateY(8px)",
//                     display: "inline-block"
//                   }}
//                 >
//                   {letter}
//                 </span>
//               ))}
//             </h2>

//             <h3
//               ref={h3Ref}
//               style={{
//                 margin: 0,
//                 display: "inline-block",
//                 opacity: 0
//               }}
//               className="font-sans  text-left text-[11px] md:text-[14px] tracking-[28px] lg:tracking-[48px] text-white/50 mt-1"
//             >
//               DECOR
//             </h3>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BrandLogo;
