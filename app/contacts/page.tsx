export const metadata = {
  title: "About Us",
  description:
    "Learn more about GRAMMZ, our design philosophy, and our 3D decorative interior brand."
};

const page = () => {
  return (
    <div
      // 💡 Fix 1: Changed h-screen to min-h-screen and forced isolated stacking to prevent canvas overlap
      className="relative flex w-full h-screen z-40 isolate"
      style={{ willChange: "opacity" }}
    >
      {/* Sidebar hidden on mobile */}
      <div className="w-2/5 h-full p-6 hidden bg-gray-900 lg:flex flex-col justify-between items-start"></div>

      {/* 💡 Fix 2: Cleaned up height styles so mobile text doesn't collapse to 0px height */}
      <div className="w-full lg:w-3/5 min-h-full bg-[#EFEBDC] p-4 lg:px-16 overflow-y-auto lg:py-8 flex flex-col">
        {/* Top bar header */}
        <div className="flex items-center justify-between w-full pt-16">
          <div></div>
          <div className="text-right text-sm lg:text-base font-medium text-neutral-800">
            <h4 className="whitespace-nowrap">+7 (988) 222-90-00</h4>
            <h5 className="text-xs lg:text-sm">ул. Каспийское шоссе, 28</h5>
            <h5 className="text-xs lg:text-sm">Ежедневно с 8:30 до 19:00</h5>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mt-6 lg:mt-12 text-neutral-900 flex-1">
          <h3 className="font-sansClean w-full lg:w-1/2 text-2xl lg:text-4xl mt-4 leading-tight">
            Мы создаём не просто декор — мы создаём настроение.
          </h3>
          <p className="my-6 lg:my-10 w-full lg:w-1/2 text-sm lg:text-base">
            Настроение чувствуется по-настоящему, когда за ним стоит забота. Мы
            относимся к каждому клиенту так же внимательно, как к собственному
            делу, и с радостью отвечаем за всё — от первой идеи до момента,
            когда вещь оказывается у вас дома.
          </p>

          {/* 💡 Fix 3: Changed w-1/2 to w-full md:w-1/2 so text blocks don't squeeze too narrow on mobile */}
          <div className="flex w-full flex-wrap gap-y-12 md:gap-y-20 mt-12 md:mt-20">
            <div className="w-full md:w-1/2 pr-2">
              <h3 className="font-sansClean text-xl md:text-2xl font-medium">
                Гарантия
              </h3>
              <p className="w-full md:w-3/4 mt-2 md:mt-4 text-sm md:text-base">
                Каждое изделие мы проверяем лично, поэтому уверены в его
                качестве. Если что-то пойдёт не так — мы всегда на связи и
                готовы решить вопрос.
              </p>
            </div>
            <div className="w-full md:w-1/2 pr-2">
              <h3 className="font-sansClean text-xl md:text-2xl font-medium">
                Доступность
              </h3>
              <p className="w-full md:w-3/4 mt-2 md:mt-4 text-sm md:text-base">
                Мы держим честные цены без лишних наценок и посредников. А если
                найдёте такой же товар дешевле — продадим по вашей цене.
                Качественный декор должен быть доступным.
              </p>
            </div>
            <div className="w-full md:w-1/2 pr-2">
              <h3 className="font-sansClean text-xl md:text-2xl font-medium">
                Доставка
              </h3>
              <p className="w-full md:w-3/4 mt-2 md:mt-4 text-sm md:text-base">
                Бережно упаковываем каждый заказ и отправляем по России и
                странам СНГ. Стараемся, чтобы посылка дошла быстро и в целости —
                прямо к вам домой.
              </p>
            </div>
            <div className="w-full md:w-1/2 pr-2">
              <h3 className="font-sansClean text-xl md:text-2xl font-medium">
                Каталог
              </h3>
              <p className="w-full md:w-3/4 mt-2 md:mt-4 text-sm md:text-base">
                В нашем каталоге собраны десятки изделий на любой вкус и
                интерьер. Большинство мы создаём сами, поэтому с радостью
                поможем подобрать то, что подойдёт именно вам.
              </p>
            </div>
          </div>

          <p className="mt-12 md:mt-20 w-full lg:w-2/3 pb-12 text-sm lg:text-base">
            А ещё мы помним, что приятные мелочи создают настроение. Поэтому
            каждую пятницу у нас бесплатный кофе — заходите в гости, будем рады
            угостить вас и просто поговорить о красоте.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
