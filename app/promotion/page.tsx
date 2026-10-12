// 🚫 NO "use client" directive here anymore!
import React from "react";
import Image from "next/image";
import { ScrollTransitionShell } from "../components/UI/ScrollTransitionShell";
import { ParallaxImageWrapper } from "../components/UI/ParallaxImageWrapper";
import { RevealHeading } from "../components/UI/RevealHeading";
import { RevealGlide } from "../components/UI/RevealGlide";
import Footer from "../components/UI/Footer";

export default function Page() {
  return (
    <ScrollTransitionShell>
      {/* CHILD 1: Hero Layer (Automatically positioned at the top by the shell) */}
      <div className="w-full h-full relative px-[calc(2.5vw*1.5)] text-gray-200 flex overflow-hidden min-h-[500px] justify-center flex-col">
        <h1 className="font-sansClean text-2xl lg:text-5xl w-full lg:w-1/2">
          Меняем привычный ритм жизни. <br />К лучшему. Каждый день.
        </h1>
        <p className="w-full lg:w-1/2 mt-8 text-sm lg:text-lg">
          Мы создаем не просто решения, а новые стандарты заботы о людях. Наша
          цель — убрать рутину и добавить ценность в каждый момент вашего дня.
          Будь то чашка кофе для вдохновляющей беседы или поддержка важных
          семейных инициатив, мы стремимся быть рядом, делая сложные процессы
          легкими, а повседневную жизнь — комфортной и осознанной.
        </p>
      </div>

      {/* CHILD 2: Body Layer (Automatically bound to containerRef inside the shell) */}
      <>
        {/* Perk 1: Family Discount */}
        <div className="flex w-full h-full flex-col lg:flex-row gap-8 lg:gap-[calc(5vw*1.5)] items-center mt-10 lg:mt-20">
          <ParallaxImageWrapper className="relative w-full lg:w-[calc(50%-2.5vw)] aspect-16/10">
            <Image
              src="/family_discount.png"
              alt="Family Promotion Asset"
              fill
              className="object-cover"
            />
          </ParallaxImageWrapper>
          <div className="w-full lg:w-[calc(50%-2.5vw)]">
            <RevealHeading className="text-2xl lg:text-4xl text-gray-200">
              Глазами ребенка: Уютный дом с семейной скидкой от 3% до 50%
            </RevealHeading>

            <RevealGlide className="text-sm lg:text-lg text-gray-300 my-8">
              В рамках наших семейных инициатив мы хотим, чтобы качественные
              решения были доступны каждому дому. Поэтому мы рады поддержать вас
              простым решением: за каждого ребенка мы дарим скидку в 3% на все
              материалы. Чем больше ваша семья, тем ощутимее становится эта
              помощь — общая скидка может расти и составить до половины
              стоимости всего заказа. Пусть обустройство дома приносит только
              радость.
            </RevealGlide>
          </div>
        </div>

        {/* Perk 2: Free Coffee Fridays */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[calc(5vw*1.5)] mt-10 lg:mt-40 items-center justify-between">
          <div className="w-full lg:w-[calc(50%-2.5vw)] order-2 lg:order-1">
            <RevealHeading className="text-2xl lg:text-4xl text-gray-200">
              Свободная пятница: Искренние беседы за чашкой бесплатного кофе
            </RevealHeading>
            <RevealGlide className="text-sm lg:text-lg text-gray-300 my-8">
              В рамках наших инициатив заботы о людях мы хотим добавить ценность
              в каждый момент вашего дня. Каждую пятницу мы рады убрать
              повседневную рутину и угостить вас чашкой свежего кофе. Это
              отличный повод сделать паузу, настроиться на weekend и в спокойной
              обстановке обсудить любые важные вопросы. Мы стремимся быть рядом,
              превращая обычные встречи в теплые и вдохновляющие диалоги.
            </RevealGlide>
          </div>
          <ParallaxImageWrapper className="relative w-full lg:w-[calc(50%-2.5vw)] aspect-16/9 order-1 lg:order-2">
            <Image
              src="/promotion_coffee.webp"
              alt="Premium Coffee Promotion Asset"
              fill
              className="object-cover"
            />
          </ParallaxImageWrapper>
        </div>

        {/* Footnotes block */}
        <div className="mt-16 lg:mt-32">
          <Footer />
        </div>
      </>
    </ScrollTransitionShell>
  );
}
