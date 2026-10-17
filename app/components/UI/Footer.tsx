import React from "react";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className="flex gap-12 items-center justify-between flex-wrap">
        <div className="flex flex-col  lg:flex-row items-center mx-auto lg:mx-0 whitespace-nowrap gap-5 text-xs lg:text-sm  text-gray-200">
          <div className="flex items-start lg:items-center gap-2 flex-row">
            <h6> Город Каспийск, </h6>
            <h5>ул. Каспийское шоссе, 28, </h5>
          </div>
          <div className="flex items-start  gap-2">
            <h5>+7 (988) 222-90-00 -</h5> <h6>Пн-Сб: 8:30 до 19:00</h6>
          </div>
        </div>
        <div className="flex  items-center justify-center  lg:justify-end gap-4">
          <h5 className="text-[8px] lg:text-[10px] w-1/2 text-gray-500">
            *Meta Platforms Inc. признана экстремистской организацией в РФ
          </h5>
          <div className="text-xl lg:text-4xl text-gray-300">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"></path>
            </svg>
          </div>

          <div className="text-xl lg:text-4xl text-gray-300">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 576 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="text-[8px] lg:text-xs mt-12 text-gray-500">
        © GRAMMZ 2026-2027 All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
