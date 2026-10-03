"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { cameraWaypoints } from "./constants/cameraPath";
import { useAudioStore } from "./store/useAudioStore";

import { useHomeScrollManager } from "./hooks/useHomeScrollManager";
import DebugScene from "./components/debug/DebugScene";

gsap.registerPlugin(Observer);

const Scene3D = dynamic(() => import("./components/Scene3D"), { ssr: false });

export default function Home() {
  const blackoutVeilRef = useRef<HTMLDivElement>(null);

  const isOverlayOpen = useAudioStore((state) => state.isOverlayOpen);
  const appState = useAudioStore((state) => state.appState);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (appState !== "entered") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } }); // Switched to snappy .out ease

      // 0ms delay: starts instantly with the loader fade
      tl.fromTo(
        "[data-section='0'] .hero-title",
        {
          filter: "blur(15px)",
          opacity: 0,
          clipPath: "polygon(0 0, 0 0, 0 0)"
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          clipPath: "polygon(0 0, 200% 0, 0 200%)",
          duration: 1.2 // Reduced from 2.0s for instant impact
        }
      );

      tl.fromTo(
        "[data-section='0'] .hero-paragraph, [data-section='0'] .hero-tag",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.9" // Aggressive overlap so description follows title instantly
      );
    }, containerRef);

    return () => ctx.revert();
  }, [appState]);

  useHomeScrollManager({
    totalSections: cameraWaypoints.length,
    isOverlayOpen: isOverlayOpen
  });

  // 🔄 3. GLOBAL SECTION SCROLL OBSERVER (Seamless text updates matched to camera)
  // useGSAP(() => {
  //   // Hide sections 1+ immediately on runtime initialization
  //   gsap.set('section:not([data-section="0"])', {
  //     visibility: "hidden",
  //     opacity: 0
  //   });
  //   gsap.set('[data-section="0"]', { visibility: "visible", opacity: 1 });

  //   const observer = Observer.create({
  //     target: window,
  //     type: "wheel,touch,pointer",
  //     wheelSpeed: 1,
  //     tolerance: 20,
  //     onUp: () => handleSectionChange(-1),
  //     onDown: () => handleSectionChange(1)
  //   });

  //   function handleSectionChange(direction: number) {
  //     if (isAnimating.current || isOverlayOpen || appState !== "entered")
  //       return;

  //     const currentIdx = currentSectionRef.current;
  //     const nextIndex = currentIdx + direction;

  //     if (nextIndex >= 0 && nextIndex < cameraWaypoints.length) {
  //       isAnimating.current = true;
  //       currentSectionRef.current = nextIndex;
  //       setActiveSection(nextIndex);

  //       const currentSectionEl = document.querySelector(
  //         `[data-section="${currentIdx}"]`
  //       );
  //       const currentTextContainer = document.querySelector(
  //         `[data-section="${currentIdx}"] .animate-box`
  //       );
  //       const nextSectionEl = document.querySelector(
  //         `[data-section="${nextIndex}"]`
  //       );
  //       const nextTextContainer = document.querySelector(
  //         `[data-section="${nextIndex}"] .animate-box`
  //       );

  //       const tl = gsap.timeline({
  //         onComplete: () => {
  //           if (currentSectionEl && currentIdx !== nextIndex) {
  //             gsap.set(currentSectionEl, { visibility: "hidden", opacity: 0 });
  //           }
  //           isAnimating.current = false;
  //         }
  //       });

  //       // Phase A: Dynamic exit fadeout (direction determines up or down text movement)
  //       if (currentTextContainer) {
  //         tl.to(currentTextContainer, {
  //           y: direction > 0 ? -40 : 40,
  //           opacity: 0,
  //           duration: 0.5,
  //           ease: "power2.inOut"
  //         });
  //       }

  //       // Phase B: Camera pan delay match
  //       tl.to({}, { duration: 0.6 });

  //       // Phase C: Dynamic arrival fadein
  //       if (nextSectionEl && nextTextContainer) {
  //         tl.fromTo(
  //           nextTextContainer,
  //           { y: direction > 0 ? 40 : -40, opacity: 0 },
  //           {
  //             y: 0,
  //             opacity: 1,
  //             duration: 0.9,
  //             ease: "power2.out",
  //             onStart: () => {
  //               gsap.set(nextSectionEl, { visibility: "visible", opacity: 1 });
  //             }
  //           }
  //         );
  //       } else {
  //         isAnimating.current = false;
  //       }
  //     }
  //   }

  //   return () => observer.kill();
  // }, [appState, isOverlayOpen]);
  // return (
  //   <main className="w-screen h-screen overflow-hidden select-none m-0 p-0">
  //     <DebugScene activeSection={0} />
  //   </main>
  // );

  return (
    <>
      <main className="fixed inset-0 w-screen h-screen  text-white overflow-hidden select-none m-0 p-0 border-0">
        {/* {appState !== "entered" && (
          <LoaderScreen
            appState={appState}
            onReady={() => setAppState("ready")}
            onEnter={() => setAppState("entered")}
          />
        )} */}

        {/* Underlying 3D viewport canvas */}
        {/* <Scene3D activeSection={activeSection} /> */}

        <div
          ref={blackoutVeilRef}
          className="absolute inset-0 bg-black invisible opacity-0 z-20 pointer-events-none"
          style={{ willChange: "opacity" }}
        />

        {/* FOREGROUND TEXT CONTENT LAYER */}
        {/* <div className="absolute inset-0 w-full h-full z-10 bg-linear-to-r from-black via-black/25 to-transparent pointer-events-none"> */}
        <div
          ref={containerRef}
          className="absolute inset-0 w-full  h-full z-10  pointer-events-none"
        >
          <div className="absolute top-0 left-0 right-0 w-fullh h-1/5 bg-linear-to-b from-black/75 via-black/50 to-transparent"></div>

          <section
            data-section="0"
            className="absolute inset-0 w-full h-full flex justify-end items-center px-4 lg:px-24 bg-transparent"
          >
            <div className="animate-box max-w-6xl  flex flex-col text-center items-center lg:items-end lg:text-end will-change-transform">
              <h1
                style={{
                  clipPath: "polygon(0 0, 0 0, 0 0)",
                  filter: "blur(20px)",
                  opacity: 0
                }}
                className="hero-title text-4xl lg:text-7xl font-sansClean font-black mb-4 tracking-tight drop-shadow-lg will-change-[clip-path,filter]"
              >
                Погрузитесь в мир вдохновляющего декора.
              </h1>
              <p
                style={{ opacity: 0 }}
                className="hero-paragraph text-slate-400 w-full lg:w-4/5 font-sansClean text-sm lg:text-xl"
              >
                Профессиональные отделочные материалы премиального качества: от
                гибкого мрамора до интерьерной лепнины. Создайте дизайн, который
                вдохновляет.
              </p>
            </div>
          </section>
          <section
            data-section="1"
            className="absolute inset-0 w-full h-full flex flex-col justify-center px-4 lg:px-24 bg-transparent"
          >
            <div className="animate-box max-w-xl will-change-transform flex flex-col justify-end lg:justify-center h-3/4 ">
              <h2 className="text-2xl lg:text-5xl font-sansClean font-black mb-4 tracking-tight drop-shadow-lg">
                Декоративные реечные панели
              </h2>
              <p className="text-slate-300 text-xs lg:text-lg">
                Реечные панели (или баффели) — это один из главных хитов
                современного дизайна интерьеров. Они представляют собой объемные
                декоративные рейки, которые создают выразительный ритм,
                визуально «вытягивают» потолки и добавляют пространству глубину.
                Материал идеально подходит для оформления акцентных стен в
                гостиной, изголовья кровати в спальне или зоны прихожей. Панели
                маскируют неровности стен, легко очищаются и годами сохраняют
                первоначальный вид.
              </p>
            </div>
          </section>

          <section
            data-section="2"
            className="absolute inset-0 w-full h-full flex flex-col justify-center px-4 lg:px-24 bg-transparent"
          >
            <div className="animate-box max-w-xl will-change-transform h-3/4 flex flex-col justify-end lg:text-center">
              <h2 className="text-2xl lg:text-5xl font-sansClean font-black mb-4 tracking-tight drop-shadow-lg">
                Гибкий мрамор
              </h2>
              <p className="text-slate-400 text-xs lg:text-lg">
                Гибкий мрамор — это прогрессивный отделочный материал, который
                на 90% состоит из измельченного натурального мрамора и
                кварцевого песка, скрепленных гибкими полимерами. Он полностью
                повторяет уникальную текстуру и благородный рисунок природного
                камня, но при этом лишен его главных недостатков — огромного
                веса и сложности в монтаже. Материал выпускается в виде тонких
                листов или плитки, легко режется обычным ножом и принимает любые
                криволинейные формы.
              </p>
            </div>
          </section>

          <section
            data-section="3"
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-start text-left px-4 lg:px-24 bg-transparent"
          >
            <div className="animate-box max-w-xl will-change-transform h-3/4 flex flex-col justify-end ">
              <h2 className="text-2xl lg:text-5xl font-sansClean font-black mb-4 tracking-tight drop-shadow-lg">
                Лепной декор
              </h2>
              <p className="text-slate-400 text-xs lg:text-lg">
                Современный лепной декор — это легкий и эффектный способ придать
                пространству завершенность и премиальный статус. В нашем
                каталоге собраны прочные и влагостойкие карнизы, изящные
                молдинги для зонирования стен, потолочные розетки и трендовые
                гипсовые 3D-панели. Материалы нового поколения не трескаются,
                легко монтируются и готовы к покраске в любой цвет. Сделайте
                интерьер объемным, стильным и выразительным.
              </p>
            </div>
          </section>

          <section
            data-section="4"
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-start text-left px-4 lg:px-24 bg-transparent"
          >
            <div className="animate-box max-w-xl will-change-transform">
              <h2 className="text-2xl lg:text-5xl font-sansClean font-black mb-4 tracking-tight drop-shadow-lg">
                ☕️ Пятница — день кофе в GRAMMZ!
              </h2>
              <p className="text-slate-400 text-xs lg:text-lg">
                Каждую пятницу мы угощаем всех гостей нашего шоурума бесплатным
                премиальным кофе. Это отличный повод отвлечься от чертежей,
                вживую посмотреть на наши новые коллекции, оценить качество
                материалов и в спокойной обстановке спланировать будущий ремонт.
                С нас — идеальный эспрессо или капучино, с вас — ваши
                грандиозные идеи.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
    // <main className="w-screen h-screen overflow-hidden select-none m-0 p-0">
    //   <DebugScene />
    // </main>
  );
}
