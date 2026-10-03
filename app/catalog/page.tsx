import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Catalog",
  description: "Browse our 3D custom premium decorative interior catalog."
};

const page = () => {
  return (
    <div
      //   ref={overlayRef}
      className="relative flex w-full h-screen   z-40 "
      style={{ willChange: "opacity" }}
    >
      <div className="w-2/5 h-full p-6 hidden bg-gray-900 lg:flex flex-col justify-between items-start"></div>
      <div className="w-full lg:w-3/5 h-full bg-[#EFEBDC] p-4 lg:px-16 overflow-y-auto lg:py-8">
        <div className="  text-black    py-16">
          <h5 className="mt-8  lg:mt-20">CATALOG</h5>
          <h3 className="font-sansClean w-full lg:w-1/2 text-2xl lg:text-4xl mt-4">
            Настоящий уют — это больше, чем просто ремонт.
          </h3>
          <p className="w-full text-sm lg:text-base lg:w-1/2 my-6 lg:my-10">
            Отделка ощущается по-настоящему, когда за ней стоит качество. Мы
            вкладываем столько же внимания в материалы и монтаж, сколько в сам
            дизайн, и с радостью отвечаем за всё — от первого эскиза до
            финального штриха.
          </p>
          <div className="">
            <h3 className="font-sansClean text-2xl mt-8 lg:mt-18 font-semibold">
              Гипсовая лепка
            </h3>
            <div className="w-full aspect-video relative mt-6 lg:mt-12">
              <Image src="/untitled.webp" alt="Image 1" fill />
            </div>
            <div className="text-sm lg:text-lg mt-12">
              <p>
                Наш каталог объединяет полный спектр элементов из натурального
                скульптурного гипса для создания архитектурного объема в
                интерьере.
              </p>
              <p className="my-4">
                Мы производим тяговые карнизы с идеальной линейной геометрией
                для стыков стен и потолка, а также заливные карнизы с глубоким
                классическим орнаментом. Для зонирования поверхностей и
                моделирования стен коллекция включает строгие тяговые и
                детализированные формовые молдинги.
              </p>
              <p className="my-4">
                Масштабный рельеф плоскостей формируют бесшовные 3D панели с
                геометрическим или волнообразным рисунком. Световые и
                композиционные узлы потолков оформляются потолочными розетками
                различной сложности — от минималистичных дисков до пышной
                лепнины. Монументальную логику пространства завершают
                классические капители, пилястры и дополнительные декоративные
                элементы.
              </p>
              <p>
                Все изделия отливаются из чистого экологичного сырья, обладают
                абсолютной пожаробезопасностью, четким профилем и готовы к
                финишному окрашиванию.
              </p>
            </div>
            <h3 className="font-sansClean text-2xl mt-16 lg:mt-28 font-semibold">
              Гибкий мрамор
            </h3>
            <div className="w-full aspect-video relative mt-6 lg:mt-10">
              <Image src="/untitled-2.webp" alt="Image 1" fill />
            </div>
            <p className="text-base lg:text-lg mt-12">
              Гибкий мрамор — это современный отделочный материал, имитирующий
              натуральный камень. Производитель «Граммз» является официальным
              представителем и предлагает продукцию оптом и в розницу с
              доставкой по России и странам СНГ.
            </p>
            <p className="mt-8">
              Применение: материал подходит для отделки ванных комнат, ТВ-зон,
              кухонь и коммерческих помещений.
            </p>
            <p className="mt-4">
              Дополнительные товары: в наличии имеются сопутствующие материалы —
              клей, луверы (вентиляционные решётки), реечные панели, уголки и
              переходы.
            </p>

            <h3 className="font-sansClean text-2xl mt-16 lg:mt-28 font-bold">
              Реечные панели — стиль и практичность в каждой детали
            </h3>
            <div className="w-full aspect-video relative mt-10">
              <Image src="/untitled-3.webp" alt="Image 1" fill />
            </div>
            <p className="text-base lg:text-lg mt-12">
              Реечные панели — это идеальное дополнение к гибкому мрамору,
              которое придаёт интерьеру завершённый и современный вид. Они
              позволяют создать акцентные зоны, скрыть неровности стен и
              добавить помещению фактурную глубину.
            </p>

            <p className="text-xl lg:text-xl mt-8 font-medium">
              Почему стоит выбрать реечные панели?
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <span className="font-medium">Быстрый монтаж</span> —
                устанавливаются легко, как и гибкий мрамор, справится даже
                новичок
              </li>
              <li>
                <span className="font-medium">Универсальность</span> — подходят
                для ванных комнат, кухонь, ТВ-зон, коридоров и коммерческих
                помещений
              </li>
              <li>
                <span className="font-medium">Совместимость</span> — идеально
                сочетаются с гибким мрамором, создавая единую стильную
                композицию
              </li>
              <li>
                <span className="font-medium">Долговечность</span> — прочные
                материалы, устойчивые к влаге и перепадам температур
              </li>
              <li>
                <span className="font-medium">Доступная цена</span> — от
                производителя, без лишних наценок
              </li>
            </ul>
            <p className="text-base lg:text-lg mt-12">
              Закажите реечные панели вместе с гибким мрамором и получите всё
              необходимое для отделки: клей, уголки, переходы и другие
              комплектующие. А для архитектурного объёма в интерьере добавьте
              лепной декор из натурального скульптурного гипса — карнизы,
              молдинги, 3D панели и потолочные розетки. Доставка по всей России
              и СНГ с гарантией сохранности.
            </p>
          </div>
        </div>
        <div className="text-xs font-medium">
          © GRAMMZ 2026-2027 All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default page;
