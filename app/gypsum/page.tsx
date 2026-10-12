import React from "react";
import Image, { getImageProps } from "next/image";
import { ScrollTransitionShell } from "../components/UI/ScrollTransitionShell";
import { ParallaxImageWrapper } from "../components/UI/ParallaxImageWrapper";
import { RevealHeading } from "../components/UI/RevealHeading";
import { RevealGlide } from "../components/UI/RevealGlide";
import Footer from "../components/UI/Footer";

export default function Page() {
  // 1. Compute image optimization parameters directly on the server safely
  const {
    props: { srcSet: mobileSrcSet }
  } = getImageProps({
    alt: "Panels presentation",
    src: "/gypsum/gypsum_head-mobile.webp",
    width: 600,
    height: 800
  });

  const {
    props: { srcSet: desktopSrcSet }
  } = getImageProps({
    alt: "Panels presentation",
    src: "/gypsum/gypsum_head.webp",
    width: 1920,
    height: 1080
  });

  return (
    <ScrollTransitionShell>
      {/* CHILD 1: Hero Header section (Static Node - perfectly serializable) */}
      <div className="w-full h-full relative">
        <picture className="absolute inset-0 w-full h-full">
          <source media="(min-width: 768px)" srcSet={desktopSrcSet || ""} />
          <img
            srcSet={mobileSrcSet || ""}
            className="w-full h-full object-cover"
            alt="Panels presentation"
            loading="eager"
          />
        </picture>
        <div className="absolute bottom-0 flex items-end w-full h-1/2 bg-linear-to-t from-black/90 via-transparent to-transparent z-30"></div>
        <div className="flex z-40 absolute bottom-0 inset-x-0 p-4 lg:p-8 items-end box-border">
          <h3 className="text-3xl lg:text-6xl w-full lg:w-1/2 text-gray-100 tracking-tight leading-tight">
            Все виды лепного декора
          </h3>
        </div>
      </div>

      {/* CHILD 2+: Body elements (Sits within containerRef section wrapper smoothly) */}
      <div className="gap-[calc(10vw*1.5)] flex flex-col lg:flex-row">
        <div className="w-full lg:w-[calc(45%-2.5vw)]">
          <ParallaxImageWrapper className="relative w-full aspect-video self-start">
            <Image
              src="/gypsum/gypsum_3.webp"
              alt="Marble Image"
              fill
              className="object-cover"
            />
          </ParallaxImageWrapper>
          <ParallaxImageWrapper className="relative w-full lg:w-4/5 aspect-9/10 mt-12 lg:mt-32">
            <Image
              src="/gypsum/gypsum_7.png"
              alt="Marble Image"
              fill
              className="object-cover"
            />
          </ParallaxImageWrapper>
        </div>

        <div className="w-full lg:w-[calc(50%-2.5vw)] text-gray-200">
          <RevealHeading className="text-2xl lg:text-5xl mt-10 lg:mt-28">
            Декоративный гипс — изящество рельефа и идеальная геометрия
          </RevealHeading>
          <RevealGlide className="text-sm lg:text-xl text-gray-300 my-8">
            Интерьер оживает, когда в нём появляется глубина и игра света. Мы
            создаём декоративные элементы из гипса, которые подчёркивают
            характер пространства, уделяя максимум внимания точности форм и
            бесшовному монтажу — от идеи до безупречного воплощения.
          </RevealGlide>

          <ParallaxImageWrapper className="relative w-full lg:w-4/5 mt-10 lg:mt-40 bg-white ml-auto self-start aspect-9/9">
            <Image
              src="/gypsum/gypsum_2.jpg"
              alt="Marble Image"
              fill
              className="object-cover"
            />
          </ParallaxImageWrapper>
        </div>
      </div>

      {/* Process Steps */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 py-12 lg:py-48">
        <div className="w-full lg:w-1/3">
          <div className="flex gap-4 text-white">
            <span className="text-4xl lg:text-7xl font-bold">1</span>
            <div>
              <RevealHeading className="text-xl lg:text-4xl">
                Эскиз и проектирование
              </RevealHeading>
              <RevealGlide className="mt-4 text-sm lg:text-base">
                Если нужной модели нет в каталоге — мы создадим её с нуля.
                Разработаем уникальный эскиз по вашему описанию, фото или
                готовому дизайн-проекту.
              </RevealGlide>
            </div>
          </div>
          <div className="relative w-full aspect-9/12 mt-8 lg:mt-12">
            <Image src="/gypsum/gypsum_4.png" alt="Process 1" fill />
          </div>
        </div>

        <div className="w-full lg:w-1/3 mt-0 lg:mt-20">
          <div className="flex gap-4 text-white">
            <span className="text-4xl lg:text-5xl font-bold">2</span>
            <div>
              <RevealHeading className="text-xl lg:text-3xl">
                Собственное производство
              </RevealHeading>
              <RevealGlide className="mt-4 text-sm lg:text-base">
                Изготавливаем гипсовый декор в строгом соответствии с
                согласованным эскизом, гарантируя идеальную геометрию и
                ювелирную точность деталей.
              </RevealGlide>
            </div>
          </div>
          <div className="relative w-full aspect-9/12 mt-8 lg:mt-12">
            <Image src="/gypsum/gypsum_5.webp" alt="Process 2" fill />
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="flex gap-4 text-white">
            <span className="text-4xl lg:text-5xl font-bold">3</span>
            <div>
              <RevealHeading className="text-xl lg:text-3xl">
                Профессиональный монтаж
              </RevealHeading>
              <RevealGlide className="mt-4 text-sm lg:text-base">
                Наша штатная команда мастеров аккуратно доставит декор и
                выполнит установку «под ключ» с абсолютно бесшовной стыковкой
                элементов.
              </RevealGlide>
            </div>
          </div>
          <div className="relative w-full aspect-9/12 mt-8 lg:mt-12">
            <Image src="/gypsum/gypsum_1.jpg" alt="Process 3" fill />
          </div>
        </div>
      </div>

      <Footer />
    </ScrollTransitionShell>
  );
}

// "use client";

// import Image, { getImageProps } from "next/image";
// import React, { useEffect, useRef } from "react";
// import Footer from "../components/UI/Footer";

// import gsap from "gsap";
// import { useScrollAnimation } from "../hooks/useScrollAnimation";
// import { ParallaxImageWrapper } from "../components/UI/ParallaxImageWrapper";
// import { RevealHeading } from "../components/UI/RevealHeading";
// import { RevealGlide } from "../components/UI/RevealGlide";

// const page = () => {
//   const destinationVeilRef = useRef<HTMLDivElement>(null);

//   const scrollerRef = useRef<HTMLDivElement>(null); // The overflow div
//   const containerRef = useRef<HTMLDivElement>(null); // The overflow div

//   useEffect(() => {
//     gsap.fromTo(
//       destinationVeilRef.current,
//       { opacity: 1 },
//       {
//         opacity: 0,
//         duration: 1,
//         ease: "power2.inOut",
//         onComplete: () => {
//           // Clean up the history state so a page refresh won't re-trigger it
//           window.history.replaceState(
//             { ...window.history.state, fromTransition: false },
//             ""
//           );
//         }
//       }
//     );
//   }, []);

//   const commonMobile = {
//     alt: "Panels presentation",
//     src: "/gypsum/gypsum_head-mobile.webp",
//     width: 600,
//     height: 800
//   };
//   const {
//     props: { srcSet: mobileSrcSet, ...rest }
//   } = getImageProps(commonMobile);

//   // 2. Define the optimization properties for your PC/Desktop asset
//   const commonDesktop = {
//     alt: "Panels presentation",
//     src: "/gypsum/gypsum_head.webp",
//     width: 1920,
//     height: 1080
//   };
//   const {
//     props: { srcSet: desktopSrcSet }
//   } = getImageProps(commonDesktop);

//   useScrollAnimation({ scrollerRef, containerRef });

//   return (
//     <div
//       ref={scrollerRef}
//       className="w-full h-screen z-40 bg-black overflow-y-auto overscroll-none"
//       style={{ willChange: "transform" }}
//     >
//       <div
//         ref={destinationVeilRef}
//         className="fixed inset-0 bg-black w-full h-full z-50 pointer-events-none"
//         style={{ opacity: 1 }}
//       />

//       <div className="w-full h-full relative">
//         <picture className="absolute inset-0 w-full h-full">
//           {/* If screen is 768px or wider, use the PC image */}
//           <source media="(min-width: 768px)" srcSet={desktopSrcSet} />

//           {/* Fallback image (Default for Mobile) */}
//           <img
//             srcSet={mobileSrcSet}
//             className="w-full h-full object-cover"
//             loading="eager" // Use eager if it's the main header image
//           />
//         </picture>
//         <div className="absolute bottom-0 flex items-end w-full h-1/2 bg-linear-to-t from-black/90 via-transparent to-transparent z-30"></div>
//         <div className="flex z-40 absolute bottom-0 inset-x-0 p-4 lg:p-8 items-end box-border">
//           <h3 className="text-3xl lg:text-6xl w-full lg:w-1/2 text-gray-100 tracking-tight leading-tight">
//             Все виды лепнего декора
//           </h3>
//         </div>
//       </div>

//       <div ref={containerRef} className="px-[calc(5vw*1.5)] py-10 lg:py-32">
//         <div className="gap-[calc(10vw*1.5)] flex flex-col lg:flex-row">
//           <div className="w-full lg:w-[calc(45%-2.5vw)]">
//             <ParallaxImageWrapper className="relative w-full aspect-video self-start">
//               <Image
//                 src="/gypsum/gypsum_3.webp"
//                 alt="Marble Image"
//                 fill
//                 className="object-cover"
//               />
//             </ParallaxImageWrapper>
//             <ParallaxImageWrapper className="relative w-full lg:w-4/5 aspect-9/10 mt-12 lg:mt-32">
//               <Image
//                 src="/gypsum/gypsum_7.png"
//                 alt="Marble Image"
//                 fill
//                 className="object-cover"
//               />
//             </ParallaxImageWrapper>
//           </div>

//           <div className="w-full lg:w-[calc(50%-2.5vw)] text-gray-200">
//             <RevealHeading className="text-2xl lg:text-5xl mt-10 lg:mt-28">
//               Декоративный гипс — изящество рельефа и идеальная геометрия
//             </RevealHeading>
//             <RevealGlide className="text-sm lg:text-xl text-gray-300 my-8">
//               Интерьер оживает, когда в нём появляется глубина и игра света. Мы
//               создаём декоративные элементы из гипса, которые подчёркивают
//               характер пространства, уделяя максимум внимания точности форм и
//               бесшовному монтажу — от идеи до безупречного воплощения.
//             </RevealGlide>

//             <ParallaxImageWrapper className="relative w-full lg:w-4/5 mt-10 lg:mt-40 bg-white ml-auto self-start aspect-9/9">
//               <Image
//                 src="/gypsum/gypsum_2.jpg"
//                 alt="Marble Image"
//                 fill
//                 className="object-cover"
//               />
//             </ParallaxImageWrapper>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 py-12 lg:py-48">
//           <div className="w-full lg:w-1/3">
//             <div className="flex gap-4 text-white">
//               <span className="text-4xl lg:text-7xl font-bold">1</span>
//               <div>
//                 <RevealHeading className="text-xl lg:text-4xl">
//                   Эскиз и проектирование
//                 </RevealHeading>

//                 <RevealGlide className="mt-4 text-sm lg:text-base">
//                   Если нужной модели нет в каталоге — мы создадим её с нуля.
//                   Разработаем уникальный эскиз по вашему описанию, фото или
//                   готовому дизайн-проекту.
//                 </RevealGlide>
//               </div>
//             </div>
//             <div className="relative w-full aspect-9/12 mt-8 lg:mt-12">
//               <Image src="/gypsum/gypsum_4.png" alt="12232" fill />
//             </div>
//           </div>

//           <div className="w-full lg:w-1/3 mt-0 lg:mt-20">
//             <div className="flex gap-4 text-white">
//               <span className="text-4xl lg:text-5xl font-bold">2</span>
//               <div>
//                 <RevealHeading className="text-xl lg:text-3xl">
//                   Собственное производство
//                 </RevealHeading>
//                 <RevealGlide className="mt-4 text-sm lg:text-base">
//                   Изготавливаем гипсовый декор в строгом соответствии с
//                   согласованным эскизом, гарантируя идеальную геометрию и
//                   ювелирную точность деталей.
//                 </RevealGlide>
//               </div>
//             </div>
//             <div className="relative w-full aspect-9/12 mt-8 lg:mt-12">
//               <Image src="/gypsum/gypsum_5.webp" alt="12232" fill />
//             </div>
//           </div>

//           <div className="w-full lg:w-1/3">
//             <div className="flex gap-4 text-white">
//               <span className="text-4xl lg:text-5xl font-bold">3</span>
//               <div>
//                 <RevealHeading className="text-xl lg:text-3xl">
//                   Профессиональный монтаж
//                 </RevealHeading>

//                 <RevealGlide className="mt-4 text-sm lg:text-base">
//                   Наша штатная команда мастеров аккуратно доставит декор и
//                   выполнит установку «под ключ» с абсолютно бесшовной стыковкой
//                   элементов.
//                 </RevealGlide>
//               </div>
//             </div>
//             <div className="relative w-full aspect-9/12 mt-8 lg:mt-12">
//               <Image src="/gypsum/gypsum_1.jpg" alt="12232" fill />
//             </div>
//           </div>
//         </div>

//         <Footer />
//       </div>
//     </div>
