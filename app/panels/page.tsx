// 🚫 NO "use client" directive here anymore!
import React from "react";
import Image, { getImageProps } from "next/image";
import { ScrollTransitionShell } from "../components/UI/ScrollTransitionShell";
import { ParallaxImageWrapper } from "../components/UI/ParallaxImageWrapper";
import { RevealHeading } from "../components/UI/RevealHeading";
import { RevealGlide } from "../components/UI/RevealGlide";
import Footer from "../components/UI/Footer";

export default function Page() {
  // 1. Compute dynamic image sets on the server safely
  const {
    props: { srcSet: mobileSrcSet }
  } = getImageProps({
    alt: "Panels presentation",
    src: "/panels/panels_head-mobile.webp",
    width: 600,
    height: 800
  });

  const {
    props: { srcSet: desktopSrcSet }
  } = getImageProps({
    alt: "Panels presentation",
    src: "/untitled-3.webp",
    width: 1920,
    height: 1080
  });

  return (
    <ScrollTransitionShell>
      {/* CHILD 1: Hero Header section (Static Node structure) */}
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
            Реечные панели: Графика линий и новый ритм вашего интерьера
          </h3>
        </div>
      </div>

      {/* CHILD 2+: Body layout content arrays (Sits within the containerRef section wrapper safely) */}
      <>
        <div className="gap-[calc(10vw*1.5)] flex flex-col lg:flex-row">
          <div className="w-full lg:w-[calc(45%-2.5vw)]">
            <ParallaxImageWrapper className="relative w-full aspect-9/9 self-start">
              <Image
                src="/panels/panels_3.jpg"
                alt="Marble Image"
                fill
                className="object-cover"
              />
            </ParallaxImageWrapper>
            <ParallaxImageWrapper className="relative w-full aspect-9/10 mt-12 lg:mt-32">
              <Image
                src="/panels/panels_1.jpg"
                alt="Marble Image"
                fill
                className="object-cover"
              />
            </ParallaxImageWrapper>
          </div>

          <div className="w-full lg:w-[calc(50%-2.5vw)] text-gray-200">
            <RevealHeading className="text-2xl lg:text-5xl mt-10 lg:mt-28">
              Реечные панели — графика линий и безупречный ритм интерьера
            </RevealHeading>
            <RevealGlide className="text-sm lg:text-xl text-gray-300 my-8">
              Пространство обретает характер, когда в нём появляется
              выразительная динамика и объём. Мы создаем декоративные реечные
              панели, которые задают правильную геометрию комнат и гармонично
              зонируют площадь, уделяя максимум внимания чистоте стыков и
              безупречному качеству каждой детали — от концепта до идеальной
              финишной отделки.
            </RevealGlide>
            <ParallaxImageWrapper className="relative w-full lg:w-4/5 mt-10 lg:mt-40 bg-white ml-auto aspect-9/10">
              <Image
                src="/panels/panels_2.jpg"
                alt="Marble Image"
                fill
                className="object-cover"
              />
            </ParallaxImageWrapper>
          </div>
        </div>

        {/* Feature List Panel Section */}
        <div className="py-6 lg:py-24">
          <RevealHeading className="text-xl lg:text-4xl w-full lg:w-3/4 mt-10 lg:mt-28 text-gray-200">
            Реечные панели — идеальное дополнение к гибкому мрамору. Они создают
            стильные акцентные зоны, скрывают неровности стен и добавляют
            интерьеру фактурную глубину.
          </RevealHeading>

          <div className="flex w-full flex-col lg:flex-row gap-4 mt-10 lg:mt-40">
            <div className="relative w-full lg:w-[calc(60%-2.5vw)] bg-white aspect-video">
              <Image
                src="/panels/panels_4.jpg"
                alt="Marble Image"
                fill
                className="object-cover"
              />
            </div>

            <ul className="mt-4 w-full lg:w-[calc(40%-2.5vw)] space-y-3 text-gray-200 text-lg lg:text-xl">
              <li className="text-gray-400 text-xs lg:text-sm">
                <div className="font-medium text-gray-100 text-sm lg:text-base">
                  Быстрый монтаж
                </div>
                Устанавливаются легко, как и гибкий мрамор, справится даже
                новичок
              </li>
              <li className="text-gray-400 text-xs lg:text-sm">
                <div className="font-medium text-gray-100 text-sm lg:text-base">
                  Универсальность
                </div>
                Подходят для ванных комнат, кухонь, ТВ-зон, коридоров и
                коммерческих помещений
              </li>
              <li className="text-gray-400 text-xs lg:text-sm">
                <div className="font-medium text-gray-100 text-sm lg:text-base">
                  Совместимость
                </div>
                Идеально сочетаются с гибким мрамором, создавая единую стильную
                композицию
              </li>
              <li className="text-gray-400 text-xs lg:text-sm">
                <div className="font-medium text-gray-100 text-sm lg:text-base">
                  Долговечность
                </div>
                Прочные материалы, устойчивые к влаге и перепадам температур
              </li>
              <li className="text-gray-400 text-xs lg:text-sm">
                <div className="font-medium text-gray-100 text-sm lg:text-base">
                  Доступная цена
                </div>
                От производителя, без лишних наценок
              </li>
            </ul>
          </div>
        </div>

        <Footer />
      </>
    </ScrollTransitionShell>
  );
}
