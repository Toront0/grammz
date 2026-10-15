// 🚫 NO "use client" directive here anymore!
import React from "react";
import Image, { getImageProps } from "next/image";
import { ScrollTransitionShell } from "../components/UI/ScrollTransitionShell";
import { ParallaxImageWrapper } from "../components/UI/ParallaxImageWrapper";
import { RevealHeading } from "../components/UI/RevealHeading";
import { RevealGlide } from "../components/UI/RevealGlide";
import Footer from "../components/UI/Footer";

export default function Page() {
  // 1. Compute dynamic responsive media criteria entirely on the server
  const {
    props: { srcSet: mobileSrcSet }
  } = getImageProps({
    alt: "Panels presentation",
    src: "/marble/marble_head-mobile.webp",
    width: 600,
    height: 800
  });

  const {
    props: { srcSet: desktopSrcSet }
  } = getImageProps({
    alt: "Panels presentation",
    src: "/marble/marble_head.webp",
    width: 1920,
    height: 1080
  });

  return (
    <ScrollTransitionShell>
      {/* CHILD 1: Hero Header section (Purely static node structure) */}
      <div className="w-full h-screen relative overflow-hidden min-h-[500px] ">
        <picture className="absolute inset-0 w-full h-full">
          <source media="(min-width: 768px)" srcSet={desktopSrcSet || ""} />
          <img
            srcSet={mobileSrcSet || ""}
            className="w-full h-full object-cover"
            alt="Panels presentation"
            loading="eager"
          />
        </picture>
        <div className="absolute bottom-0 flex items-end w-full h-1/2 bg-linear-to-t from-[#050505] via-transparent to-transparent z-30"></div>
        <div className="flex z-40 absolute bottom-0 inset-x-0 p-4 lg:p-8 items-end box-border">
          <h3 className="text-3xl lg:text-6xl w-full lg:w-1/2 text-gray-100 tracking-tight leading-tight">
            Граммз — Официальный представитель гибкого мрамора
          </h3>
        </div>
      </div>

      {/* CHILD 2+: Body layout (Sits within the containerRef section wrapper safely) */}
      <>
        <div className="gap-[calc(10vw*1.5)] flex flex-col lg:flex-row ">
          <ParallaxImageWrapper className="relative w-full lg:w-[calc(45%-2.5vw)] aspect-9/10 self-start">
            <Image
              src="/marble/marble_1.webp"
              alt="Marble Image"
              fill
              className="object-cover"
            />
          </ParallaxImageWrapper>
          <div className="w-full lg:w-[calc(50%-2.5vw)] text-gray-200">
            <RevealHeading>
              Гибкий мрамор для дома и бизнеса - красота камня легкость монтажа
            </RevealHeading>

            <RevealGlide className="text-sm lg:text-xl  my-8 lg:my-24 will-change-transform">
              Отделка ощущается по-настоящему, когда за ней стоит качество. Мы
              вкладываем столько же внимания в материалы и монтаж, сколько в сам
              дизайн, и с радостью отвечаем за всё — от первого эскиза до
              финального штриха.
            </RevealGlide>
            <ParallaxImageWrapper className="relative w-full lg:w-4/5 ml-auto aspect-9/10 self-start">
              <Image
                src="/marble/marble_kitchen.webp"
                alt="Marble Image"
                fill
                className="object-cover"
              />
            </ParallaxImageWrapper>
          </div>
        </div>

        {/* Commercial Grid Panel Section */}
        <div className="py-6 lg:py-24 w-full">
          <RevealHeading>
            Вы можете быть уверены в качестве нашего мрамора
          </RevealHeading>

          <div className="w-full mt-8">
            {/* Subsection Block 1 */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-[calc(5vw*1.5)] items-center mt-10 lg:mt-20">
              <ParallaxImageWrapper className="relative w-full lg:w-[calc(50%-2.5vw)] aspect-video">
                <Image
                  src="/marble/marble_commercial.png"
                  alt="Marble Image"
                  fill
                  className="object-cover"
                />
              </ParallaxImageWrapper>

              <div className="w-full lg:w-[calc(50%-2.5vw)]">
                <RevealHeading className="text-2xl lg:text-4xl ">
                  Коммерция и ресепшен: Премиальный статус за разумный бюджет
                </RevealHeading>

                <RevealGlide className="text-sm lg:text-lg my-8">
                  Для отелей, офисов и ресторанов это лучший способ быстро
                  создать интерьер класса Ultra-Luxury. Высокая износостойкость
                  выдержит любой поток клиентов, а быстрая скорость монтажа
                  позволит запустить бизнес без долгих и убыточных простоев на
                  ремонт.
                </RevealGlide>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-[calc(5vw*1.5)] mt-10 lg:mt-20 items-center justify-between">
              <div className="w-full lg:w-[calc(50%-2.5vw)] order-2 lg:order-1">
                <RevealHeading className="text-2xl lg:text-4xl ">
                  Ванная комната: 100% влагостойкость без темных швов
                </RevealHeading>
                <RevealGlide className="text-sm lg:text-lg my-8">
                  В зоне душа жидкий мрамор гораздо практичнее кафеля. Он
                  создает абсолютно герметичное бесшовное покрытие, где
                  физически не могут появиться грибок или плесень. Материал не
                  боится прямого контакта с водой и сохраняет идеальный глянец
                  десятилетиями.
                </RevealGlide>
              </div>
              <ParallaxImageWrapper className="relative w-full lg:w-[calc(40%-2.5vw)] aspect-9/10 order-1 lg:order-2">
                <Image
                  src="/marble/marble_2.webp"
                  alt="Marble Image"
                  fill
                  className="object-cover"
                />
              </ParallaxImageWrapper>
            </div>
          </div>
          <div className="mt-12 lg:mt-40">
            <h3 className="font-sansClean text-center text-2xl lg:text-4xl text-gray-200">
              Почему гибкий мрамор ?
            </h3>
            <h4 className="text-base lg:text-xl w-full lg:w-1/3 mx-auto mt-8 text-gray-300 text-center px-4 lg:px-0">
              Элегантность элитного мрамора без лишнего веса, сложной логистики
              и строительной пыли.
            </h4>
            <div className="w-full flex flex-wrap lg:flex-nowrap gap-y-10 lg:gap-[calc(2.5vw*1.5)] my-12 lg:my-24">
              <div className="flex flex-col w-1/2 lg:w-1/4 items-center justify-center">
                <div className="text-3xl lg:text-7xl text-gray-200">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.53 9.78a.75.75 0 0 0-1.06-1.06L11 13.19l-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5Z"></path>
                    <path d="m12.54.637 8.25 2.675A1.75 1.75 0 0 1 22 4.976V10c0 6.19-3.771 10.704-9.401 12.83a1.704 1.704 0 0 1-1.198 0C5.77 20.705 2 16.19 2 10V4.976c0-.758.489-1.43 1.21-1.664L11.46.637a1.748 1.748 0 0 1 1.08 0Zm-.617 1.426-8.25 2.676a.249.249 0 0 0-.173.237V10c0 5.46 3.28 9.483 8.43 11.426a.199.199 0 0 0 .14 0C17.22 19.483 20.5 15.461 20.5 10V4.976a.25.25 0 0 0-.173-.237l-8.25-2.676a.253.253 0 0 0-.154 0Z"></path>
                  </svg>
                </div>
                <h3 className="text-base lg:text-2xl text-gray-200 text-center mt-2">
                  Производительность
                </h3>
                <h4 className="text-xs lg:text-lg text-gray-300 text-center px-2 lg:px-0">
                  Средний срок службы
                </h4>
              </div>
              <div className="flex flex-col w-1/2 lg:w-1/4 items-center justify-center">
                <div className="text-3xl lg:text-6xl text-gray-200">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    version="1.2"
                    baseProfile="tiny"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <circle cx="8" cy="16" r="1"></circle>
                      <path d="M20.733 4.657c-.392-.378-1.013-.377-1.399.009.387-.386.388-1.008.01-1.4-1.078-.792-2.405-1.266-3.844-1.266-3.59 0-6.5 2.91-6.5 6.5l.031.379c-.337.239-2.893 2.147-4.258 3.301-1.135.99-1.773 2.375-1.773 3.82 0 2.757 2.243 5 5 5 1.465 0 2.854-.65 3.811-1.784 1.173-1.375 3.08-3.923 3.317-4.229l.372.013c3.59 0 6.5-2.91 6.5-6.5 0-1.44-.474-2.766-1.267-3.843zm-12.733 14.343c-1.656 0-3-1.343-3-3 0-.92.423-1.732 1.064-2.292 2.368-2.002 3.617-2.748 5.115-4.015-.105-.382-.179-.777-.179-1.193 0-2.485 2.015-4.5 4.5-4.5.47 0 .914.092 1.339.226l-2.839 2.774.5 2.5 2.5.5 2.805-2.741c.115.396.195.807.195 1.241 0 2.485-2.015 4.5-4.5 4.5-.416 0-.811-.074-1.193-.18-1.267 1.498-2.013 2.748-4.024 5.105-.551.652-1.363 1.075-2.283 1.075zm11.384-12.729l-2.705 2.645-1.329-.266-.263-1.314 2.726-2.663c.651.393 1.19.939 1.571 1.598z"></path>
                    </g>
                  </svg>
                </div>
                <h3 className="text-base lg:text-2xl text-gray-200 text-center mt-2">
                  Лёгкий монтаж
                </h3>
                <h4 className="text-xs lg:text-lg text-gray-300 text-center px-2 lg:px-0">
                  Установить можно своими руками
                </h4>
              </div>
              <div className="flex flex-col w-1/2 lg:w-1/4 items-center justify-center">
                <div className="text-3xl lg:text-7xl text-gray-200">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
                    <path d="M3 9l4 0"></path>
                  </svg>
                </div>
                <h3 className="text-base lg:text-2xl text-gray-200 text-center mt-2">
                  Доставка
                </h3>
                <h4 className="text-xs lg:text-lg text-gray-300 text-center px-2 lg:px-0">
                  По России и странам СНГ
                </h4>
              </div>
              <div className="flex flex-col w-1/2 lg:w-1/4 items-center justify-center">
                <div className="text-3xl lg:text-7xl text-gray-200">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Discount_1">
                      <path d="M21.953,12c0,0.591 -0.346,1.124 -0.839,1.61c-0.295,0.29 -0.639,0.568 -0.942,0.85c-0.242,0.225 -0.46,0.446 -0.562,0.692c-0.107,0.257 -0.114,0.576 -0.105,0.913c0.011,0.416 0.056,0.855 0.059,1.265c0.006,0.691 -0.123,1.304 -0.526,1.708c-0.404,0.403 -1.017,0.532 -1.708,0.526c-0.41,-0.004 -0.849,-0.048 -1.264,-0.059c-0.337,-0.009 -0.657,-0.002 -0.914,0.105c-0.246,0.102 -0.467,0.32 -0.692,0.562c-0.282,0.303 -0.56,0.647 -0.85,0.941c-0.486,0.494 -1.019,0.84 -1.61,0.84c-0.591,-0 -1.124,-0.346 -1.61,-0.84c-0.29,-0.294 -0.568,-0.638 -0.85,-0.941c-0.225,-0.242 -0.447,-0.46 -0.692,-0.562c-0.257,-0.107 -0.577,-0.114 -0.913,-0.105c-0.416,0.011 -0.855,0.055 -1.265,0.059c-0.691,0.006 -1.305,-0.123 -1.708,-0.526c-0.404,-0.404 -0.532,-1.017 -0.526,-1.708c0.003,-0.41 0.048,-0.849 0.059,-1.265c0.009,-0.337 0.002,-0.656 -0.105,-0.914c-0.102,-0.245 -0.32,-0.466 -0.562,-0.691c-0.302,-0.282 -0.646,-0.56 -0.941,-0.85c-0.493,-0.486 -0.84,-1.019 -0.84,-1.61c0,-0.591 0.347,-1.124 0.84,-1.61c0.295,-0.29 0.639,-0.568 0.941,-0.85c0.242,-0.225 0.46,-0.446 0.562,-0.691c0.107,-0.258 0.114,-0.577 0.105,-0.914c-0.011,-0.416 -0.056,-0.855 -0.059,-1.265c-0.006,-0.691 0.122,-1.304 0.526,-1.708c0.403,-0.403 1.017,-0.532 1.708,-0.526c0.41,0.004 0.849,0.048 1.265,0.059c0.336,0.009 0.656,0.002 0.913,-0.105c0.245,-0.102 0.467,-0.32 0.692,-0.562c0.282,-0.303 0.56,-0.647 0.85,-0.941c0.486,-0.494 1.019,-0.84 1.61,-0.84c0.591,0 1.124,0.346 1.61,0.84c0.29,0.294 0.568,0.638 0.85,0.941c0.225,0.242 0.446,0.46 0.692,0.562c0.257,0.107 0.577,0.114 0.914,0.105c0.415,-0.011 0.854,-0.055 1.264,-0.059c0.691,-0.006 1.304,0.123 1.708,0.526c0.403,0.404 0.532,1.017 0.526,1.708c-0.003,0.41 -0.048,0.849 -0.059,1.265c-0.009,0.337 -0.002,0.656 0.105,0.913c0.102,0.246 0.32,0.467 0.562,0.692c0.303,0.282 0.647,0.56 0.942,0.85c0.493,0.486 0.839,1.019 0.839,1.61Zm-1,0c0,-0.188 -0.088,-0.355 -0.206,-0.518c-0.164,-0.226 -0.388,-0.437 -0.622,-0.646c-0.583,-0.521 -1.205,-1.04 -1.439,-1.604c-0.242,-0.585 -0.177,-1.399 -0.136,-2.178c0.017,-0.315 0.027,-0.622 -0.015,-0.895c-0.029,-0.191 -0.08,-0.365 -0.204,-0.489c-0.125,-0.125 -0.299,-0.176 -0.49,-0.205c-0.273,-0.042 -0.58,-0.032 -0.895,-0.015c-0.779,0.041 -1.593,0.106 -2.177,-0.136c-0.565,-0.234 -1.084,-0.855 -1.605,-1.439c-0.209,-0.234 -0.42,-0.458 -0.646,-0.622c-0.163,-0.118 -0.33,-0.206 -0.518,-0.206c-0.187,0 -0.355,0.088 -0.518,0.206c-0.226,0.164 -0.437,0.388 -0.646,0.622c-0.521,0.584 -1.04,1.205 -1.605,1.439c-0.584,0.242 -1.398,0.177 -2.177,0.136c-0.315,-0.017 -0.622,-0.027 -0.895,0.015c-0.192,0.029 -0.365,0.08 -0.49,0.205c-0.125,0.124 -0.175,0.298 -0.204,0.489c-0.042,0.273 -0.032,0.58 -0.016,0.895c0.042,0.779 0.107,1.593 -0.135,2.177c-0.234,0.565 -0.855,1.084 -1.439,1.605c-0.234,0.209 -0.458,0.42 -0.622,0.646c-0.118,0.163 -0.206,0.33 -0.206,0.518c0,0.188 0.088,0.355 0.206,0.518c0.164,0.226 0.388,0.437 0.622,0.646c0.584,0.521 1.205,1.04 1.439,1.605c0.242,0.584 0.177,1.398 0.135,2.177c-0.016,0.315 -0.026,0.622 0.016,0.895c0.029,0.191 0.079,0.365 0.204,0.489c0.125,0.125 0.298,0.176 0.49,0.205c0.273,0.042 0.58,0.032 0.895,0.015c0.779,-0.041 1.593,-0.106 2.177,0.136c0.565,0.234 1.084,0.855 1.605,1.439c0.209,0.234 0.42,0.458 0.646,0.622c0.163,0.118 0.331,0.206 0.518,0.206c0.188,-0 0.355,-0.088 0.518,-0.206c0.226,-0.164 0.437,-0.388 0.646,-0.622c0.521,-0.584 1.04,-1.205 1.605,-1.439c0.584,-0.242 1.398,-0.177 2.177,-0.136c0.315,0.017 0.622,0.027 0.895,-0.015c0.191,-0.029 0.365,-0.08 0.49,-0.205c0.124,-0.124 0.175,-0.298 0.204,-0.489c0.042,-0.273 0.032,-0.58 0.015,-0.895c-0.041,-0.779 -0.106,-1.593 0.136,-2.178c0.234,-0.564 0.856,-1.083 1.439,-1.604c0.234,-0.209 0.458,-0.42 0.622,-0.646c0.118,-0.163 0.206,-0.33 0.206,-0.518Zm-10.531,-1.762c-0.396,0.396 -1.039,0.396 -1.435,-0c-0.396,-0.396 -0.396,-1.04 -0,-1.436c0.396,-0.396 1.039,-0.396 1.435,0c0.396,0.396 0.396,1.04 0,1.436Zm4.471,-1.838c0.195,-0.195 0.512,-0.195 0.707,0c0.195,0.195 0.195,0.512 -0,0.707l-6.493,6.493c-0.195,0.195 -0.512,0.195 -0.707,0c-0.195,-0.195 -0.195,-0.512 -0,-0.707l6.493,-6.493Zm-1.315,5.363c0.396,-0.396 1.039,-0.396 1.435,0c0.396,0.396 0.396,1.04 0,1.436c-0.396,0.396 -1.039,0.396 -1.435,-0c-0.397,-0.396 -0.397,-1.04 -0,-1.436Z"></path>
                    </g>
                  </svg>
                </div>
                <h3 className="text-base lg:text-2xl text-gray-200 text-center mt-2">
                  Доступность
                </h3>
                <h4 className="text-xs lg:text-lg text-gray-300 text-center px-2 lg:px-0">
                  Цены от производителя
                </h4>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    </ScrollTransitionShell>
  );
}
