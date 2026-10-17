"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { div } from "three/tsl";

export default function ContactForm(): React.JSX.Element {
  const [countdown, setCountdown] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Track if user has interacted with inputs to prevent showing errors prematurely
  const [nameTouched, setNameTouched] = useState<boolean>(false);
  const [phoneTouched, setPhoneTouched] = useState<boolean>(false);

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const formatRussianPhoneNumber = (value: string): string => {
    let digits = value.replace(/\D/g, "");
    if (!digits) return "";

    if (digits.startsWith("7") || digits.startsWith("8")) {
      digits = digits.slice(1);
    }

    digits = digits.slice(0, 10);
    let formatted = "+7";

    if (digits.length > 0 || value.includes("(")) {
      formatted += ` (${digits.slice(0, 3)}`;
    }
    if (digits.length > 3) {
      formatted += `) ${digits.slice(3, 6)}`;
    }
    if (digits.length > 6) {
      formatted += `-${digits.slice(6, 8)}`;
    }
    if (digits.length > 8) {
      formatted += `-${digits.slice(8, 10)}`;
    }

    return formatted;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhoneTouched(true);
    const rawValue = e.target.value;
    if (rawValue === "+7" || rawValue === "+7 " || rawValue === "+7 (") {
      setPhone("");
      return;
    }
    setPhone(formatRussianPhoneNumber(rawValue));
  };

  const handlePhoneFocus = (): void => {
    if (!phone) setPhone("+7 (");
  };

  const handlePhoneBlur = (): void => {
    setPhoneTouched(true);
    if (phone === "+7 (" || phone === "+7") setPhone("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setCountdown(5);
    setName("");
    setPhone("");
    setNameTouched(false);
    setPhoneTouched(false);
  };

  // Validation Rules
  const isNameValid = name.trim().length >= 2;
  const isPhoneValid = phone.length === 18;

  // Error visibility criteria
  const showNameError = nameTouched && !isNameValid;
  const showPhoneError = phoneTouched && !isPhoneValid;

  const isButtonDisabled = countdown > 0 || !isNameValid || !isPhoneValid;

  return (
    <div className="w-full lg:w-[calc(40%-2.5vw)] border border-gray-600 text-gray-200 p-4 lg:p-8 rounded bg-black/10 backdrop-blur-sm">
      <h3 className="text-base lg:text-lg">Свяжитесь с нами</h3>
      <p className="text-xs lg:text-base text-gray-300 mt-2">
        Мы всегда на связи. Задайте свой вопрос или отправьте предложение, и мы
        ответим вам в ближайшее время.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 lg:mt-6">
        {/* Name Input Group */}
        <div>
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
              setNameTouched(true);
            }}
            onBlur={() => setNameTouched(true)}
            className={`text-gray-100 bg-white/25 text-sm lg:text-base rounded px-3 py-2 w-full focus:outline-none transition-colors placeholder:text-gray-400 ${
              showNameError ? "border border-red-500 bg-red-500/10" : ""
            }`}
            placeholder="Как вас зовут ?"
            required
            disabled={countdown > 0}
          />
          {showNameError && (
            <div className="text-xs text-red-400 flex items-center mt-4">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"></path>
              </svg>
              <p className="text-[10px] lg:text-xs px-1">
                Имя должно содержать хотя бы 2 буквы
              </p>
            </div>
          )}
        </div>

        {/* Phone Input Group */}
        <div className="mt-4">
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            onFocus={handlePhoneFocus}
            onBlur={handlePhoneBlur}
            className={`text-gray-100 bg-white/25 text-sm lg:text-base rounded px-3 py-2 w-full focus:outline-none transition-colors placeholder:text-gray-400 ${
              showPhoneError ? "border border-red-500 bg-red-500/10" : ""
            }`}
            placeholder="+7 (900) 222-90-00"
            required
            disabled={countdown > 0}
          />
          {showPhoneError && (
            <div className="text-[10px] lg:text-xs text-red-400 flex items-center mt-4">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"></path>
              </svg>
              <p className="  px-1">Номер телефона должен содержать 11 цифр</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`w-full py-3 rounded mt-6 lg:mt-8 text-sm font-medium transition-all duration-300 ${
            countdown > 0
              ? "bg-green-600 text-white cursor-not-allowed"
              : isButtonDisabled
              ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-gray-300 text-black hover:bg-gray-200 shadow-md cursor-pointer"
          }`}
        >
          {countdown > 0 ? `СПАСИБО! ${countdown}с` : "ОТПРАВИТЬ"}
        </button>
      </form>
    </div>
  );
}
