'use client'; // У випадку використання Next.js для підтримки Client Components

import React, { useState } from "react";

const Contacts = () => {
  const [status, setStatus] = useState<"" | "success" | "error" | null>(""); // статуси: "success", "error" або null

  const onSubmit = async (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Додавання ключа доступу до форми
    formData.append("access_key", "b189e830-1b7e-49c5-a328-3aef7d97cdeb");

    // Конвертація даних форми до JSON
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const res = await response.json();

      if (res.success) {
        setStatus("success");
        form.reset(); // очищення форми після успішного надсилання
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }

    // Автоматичне скидання статусу через 5 секунд
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section className="w-[500px] mt-[50px] mx-auto pt-10 px-3.5 pb-5 bg-teal-50 rounded-2xl text-[#333] transition-all duration-300">
      <form onSubmit={onSubmit}>
        <h2 className="text-center text-[30px] mb-4">Контактна форма</h2>

        {/* Поле для введення імені */}
        <div className="flex flex-col mb-3">
          <label htmlFor="name" className="font-bold">
            Ім'я
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="border border-gray-300 p-1 rounded"
            placeholder="Введіть ім'я"
            required
          />
        </div>

        {/* Поле для введення email */}
        <div className="flex flex-col mb-3">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="border border-gray-300 p-1 rounded"
            placeholder="Введіть email"
            required
          />
        </div>

        {/* Поле для введення повідомлення */}
        <div className="flex flex-col mb-5">
          <label htmlFor="message" className="font-bold">
            Повідомлення
          </label>
          <textarea
            id="message"
            name="message"
            className="border border-gray-300 p-1 resize-none rounded"
            placeholder="Введіть повідомлення"
          ></textarea>
        </div>

        {/* Кнопка для надсилання форми */}
        <button
          type="submit"
          className="bg-teal-600 text-white hover:bg-teal-700 transition px-4 py-2 rounded mx-auto block outline-none"
        >
          Відправити повідомлення
        </button>

        {/* Відображення статусу повідомлення */}
        {status === "success" && (
          <p className="text-green-600 mt-4 text-center animate-fade-in">
            ✅ Повідомлення надіслано успішно!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-4 text-center animate-fade-in">
            ❌ Помилка при надсиланні. Спробуйте пізніше.
          </p>
        )}
      </form>
    </section>
  );
};

export default Contacts;