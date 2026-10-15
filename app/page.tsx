"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { cameraWaypoints } from "./constants/cameraPath";
import { useAudioStore } from "./store/useAudioStore";

import { useHomeScrollManager } from "./hooks/useHomeScrollManager";
import DebugScene from "./components/debug/DebugScene";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import CustomLinkWithTransition from "./components/UI/CustomLinkWithTransition";
import HomeNavigation from "./components/UI/HomeNavigation";

gsap.registerPlugin(Observer);

const Scene3D = dynamic(() => import("./components/Scene3D"), { ssr: false });

export default function Home() {
  const blackoutVeilRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const isOverlayOpen = useAudioStore((state) => state.isOverlayOpen);
  const resetActiveSection = useAudioStore((state) => state.resetActiveSection);
  const appState = useAudioStore((state) => state.appState);

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

  useEffect(() => {
    gsap.fromTo(
      blackoutVeilRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Clean up the history state so a page refresh won't re-trigger it
          window.history.replaceState(
            { ...window.history.state, fromTransition: false },
            ""
          );
        }
      }
    );
  }, []);

  useHomeScrollManager({
    totalSections: cameraWaypoints.length,
    isOverlayOpen: isOverlayOpen
  });
  // return (
  //   <main className="w-screen h-screen overflow-hidden select-none m-0 p-0">
  //     <DebugScene activeSection={0} />
  //   </main>
  // );

  // const handleNavigation = (e: any) => {
  //   e.preventDefault();
  //   gsap.to(blackoutVeilRef.current, {
  //     opacity: 1,
  //     duration: 1,
  //     ease: "power2.inOut",
  //     onComplete: () => {
  //       router.push("/panels", { scroll: false });

  //       window.history.replaceState(
  //         { ...window.history.state, fromTransition: true },
  //         ""
  //       );
  //     }
  //   });
  // };

  return (
    <main className="fixed inset-0 w-screen h-screen  text-white overflow-hidden m-0 p-0 border-0">
      {/* <div className="w-full h-1/5 bg-linear-to-t from-black/50 via-transparent to-transparent flex justify-center fixed bottom-0 z-50 "></div> */}
      <div
        ref={blackoutVeilRef}
        className="fixed inset-0 bg-black w-full h-full  z-50 pointer-events-none"
        style={{ willChange: "opacity", opacity: 1 }}
      />
      {/* <HomeNavigation /> */}

      {/* FOREGROUND TEXT CONTENT LAYER */}
      {/* <div className="absolute inset-0 w-full h-full z-10 bg-linear-to-r from-black via-black/25 to-transparent pointer-events-none"> */}
      <div ref={containerRef} className="absolute inset-0 w-full  h-full z-10">
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
              className="hero-title text-4xl select-none lg:text-7xl font-sansClean font-light mb-4 tracking-tight drop-shadow-lg will-change-[clip-path,filter]"
            >
              Погрузитесь в мир вдохновляющего декора.
            </h1>
            <p
              style={{ opacity: 0 }}
              className="hero-paragraph select-none text-slate-400 w-full lg:w-4/5 text-sm lg:text-xl"
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
            <h2 className="text-2xl lg:text-4xl select-none font-sansClean font-light mb-4 tracking-tight drop-shadow-lg">
              Декоративные реечные панели
            </h2>
            <p className="text-slate-300 select-none text-xs lg:text-base">
              Трендовые рейки для акцентных стен. Скрывают неровности, визуально
              увеличивают высоту потолков и добавляют интерьеру фактурную
              глубину.
            </p>
            <CustomLinkWithTransition
              href="/panels"
              // onClick={resetActiveSection}
              veilRef={blackoutVeilRef}
              className="mt-4 px-4 py-2 text-sm cursor-pointer rounded bg-black/50 w-fit"
            >
              Узнать больше
            </CustomLinkWithTransition>
            {/* <a
              href="/panels"
              onClick={handleNavigation}
              className="mt-4 px-4 py-2 text-sm cursor-pointer rounded bg-black/50 w-fit"
            >
              Узнать больше
            </a> */}
          </div>
        </section>

        <section
          data-section="2"
          className="absolute inset-0 w-full h-full flex flex-col justify-center px-4 lg:px-24 bg-transparent"
        >
          <div className="animate-box max-w-xl will-change-transform h-3/4 flex flex-col justify-end lg:text-left">
            <h2 className="text-2xl lg:text-5xl select-none font-sansClean font-light mb-4 tracking-tight drop-shadow-lg">
              Гибкий мрамор
            </h2>
            <p className="text-slate-400 select-none text-xs lg:text-lg">
              Гибкий мрамор — тонкие листы из натурального мрамора и кварцевого
              песка. Повторяют текстуру камня, но без веса и сложного монтажа.
              Легко режутся и гнутся под любые формы.
            </p>
            <CustomLinkWithTransition
              href="/marble"
              // onClick={resetActiveSection}
              veilRef={blackoutVeilRef}
              className="mt-4 px-4 py-2 text-sm cursor-pointer rounded bg-black/50 w-fit"
            >
              Узнать больше
            </CustomLinkWithTransition>
          </div>
        </section>

        <section
          data-section="3"
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-start text-left px-4 lg:px-24 bg-transparent"
        >
          <div className="animate-box max-w-xl will-change-transform h-3/4 flex flex-col justify-end ">
            <h2 className="text-2xl lg:text-5xl select-none font-sansClean font-light mb-4 tracking-tight drop-shadow-lg">
              Лепной декор
            </h2>
            <p className="text-slate-400 select-none text-xs lg:text-lg">
              Лёгкий способ придать интерьеру завершённость и премиальный
              статус. Влагостойкие карнизы, молдинги, потолочные розетки и
              3D-панели. Не трескаются, легко монтируются и красятся в любой
              цвет.
            </p>
            <CustomLinkWithTransition
              href="/gypsum"
              // onClick={resetActiveSection}
              veilRef={blackoutVeilRef}
              className="mt-4 px-4 py-2 text-sm cursor-pointer rounded bg-black/50 w-fit"
            >
              Узнать больше
            </CustomLinkWithTransition>
          </div>
        </section>

        <section
          data-section="4"
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-start text-left px-4 lg:px-24 bg-transparent"
        >
          <div className="animate-box max-w-xl will-change-transform h-3/4 flex flex-col justify-end">
            <h2 className="text-2xl lg:text-5xl select-none font-sansClean font-light mb-4 tracking-tight drop-shadow-lg">
              ☕️ Пятница — день кофе в GRAMMZ!
            </h2>
            <p className="text-slate-400 select-none text-xs lg:text-lg">
              Каждую пятницу — бесплатный премиальный кофе для всех гостей
              шоурума, а для семей с детьми действуют особые скидки. Заходите,
              чтобы вживую оценить материалы и спокойно спланировать будущий
              ремонт.
            </p>
            <CustomLinkWithTransition
              href="/promotion"
              // onClick={resetActiveSection}
              veilRef={blackoutVeilRef}
              className="mt-4 px-4 py-2 text-sm cursor-pointer rounded bg-black/50 w-fit"
            >
              Узнать больше
            </CustomLinkWithTransition>
          </div>
        </section>
      </div>
    </main>

    // <main className="w-screen h-screen overflow-hidden select-none m-0 p-0">
    //   <DebugScene />
    // </main>
  );
}
