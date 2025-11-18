import { useState, useEffect } from "react";
import a from '../images/a.webp';
import b from '../images/b.webp';
import c from '../images/15s.webp';
import d from '../images/touch.webp';
import e from '../images/banner.webp';

export default function HeroWithMembership() {
  const slides = [
    {
      img: a,
      title: "Join the Tuskers Rugby Family",
      subtitle: "Senior Men • Senior Women • Touch Rugby",
      cta: "Become a Member",
    },
    {
      img: b,
      title: "Pushing Limits Every Season",
      subtitle: "Training, Community, Excellence",
      cta: "Learn More",
    },
    {
      img: e,
    },
  ];

  const mem = [
    {
      id: 1,
      title: "Senior Men's Rugby",
      img: c,
    },
    {
      id: 2,
      title: "Social Touch Rugby",
      img: d,
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="w-full overflow-hidden bg-[#1a1f4e]">
      <div className="relative">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[40vh] sm:h-[70vh] md:h-[100vh] object-cover object-center"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1f4e]" />
        <div className="relative z-10 flex flex-col justify-end min-h-[35vh] sm:min-h-[70vh] md:min-h-[85vh] pb-12 md:pb-24 px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl">
              {slides[index].title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-3 font-medium drop-shadow">
              {slides[index].subtitle}
            </p>
            {slides[index].cta && (
              <button className="relative px-4 sm:px-6 py-2 my-4 bg-gradient-to-r from-[#f5a623] via-[#ffb938] to-[#f5a623] text-black font-semibold text-lg tracking-wide overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ffcd62] to-[#f5a623] translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                {slides[index].cta}
              </button>
            )}
          </div>
        </div>

        <div className="relative z-20 py-6 md:py-8 flex flex-col items-center -mt-12">
          <div className="flex gap-4 overflow-x-auto pb-4 px-4">
            {mem.map((card, idx) => (
              <div
                key={idx}
                className="bg-black/80 backdrop-blur-sm overflow-hidden shadow-lg"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-48 sm:h-60 md:h-72 lg:h-80 object-cover"
                />
                <div className="p-3 sm:p-4">
                  <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold mb-2">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}





