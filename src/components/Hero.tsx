import { useState, useEffect } from "react";
import a from '../images/b1.webp';
// import b from '../images/b2.webp';
import c from '../images/DT_15s.webp';
import f from '../images/DT_10s.webp';
import g from '../images/DT_7s.webp';
import d from '../images/DT_touch.webp';
import h from '../images/b4.webp';
import { Link } from "react-router-dom";

export default function HeroWithMembership() {
  const slides = [
    {
      img: h,
      title: "Join the Tuskers Rugby Family",
      subtitle: "Senior Men • Senior Women • Touch Rugby",
      cta: "Become a Member",
      link: "/membership",
    },
    {
      img: a,
      title: "Gulf Mens Social Plate Champions",
      subtitle: "2024 Dubai 7s Tournament",
      cta: "Learn More",
      link: "/about",
    },
    {
      img: "https://qasvqrglwupcdqosogac.supabase.co/storage/v1/object/public/posts/2025-banner.png",
      title: "Gulf Mens Open Bowl Runner Up",
      subtitle: "2025 Dubai 7s Tournament",
      cta: "Learn More",
      link: "/about",
    },
  ];

  const mem = [
    {
      id: 1,
      title: "15S Rugby",
      link: "/teams/15s",
      img: c,
    },
    {
      id: 2,
      title: "10S Rugby",
      link: "/teams/10s",
      img: f,
    },
    {
      id: 3,
      title: "7s Rugby",
      link: "/teams/7s",
      img: g,
    },
    {
      id: 4,
      title: "Touch Rugby",
      link: "/teams/touch",
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
              className="w-full h-[50vh] sm:h-[70vh] md:h-[100vh] object-cover object-center"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1f4e]" />
        <div className="relative z-10 flex flex-col justify-end min-h-[50vh] sm:min-h-[70vh] md:min-h-[85vh] pb-12 md:pb-24 px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl">
              {slides[index].title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-3 font-medium drop-shadow">
              {slides[index].subtitle}
            </p>
            {slides[index].cta && (
              <Link to={slides[index].link}>
                <button className="relative px-4 sm:px-6 py-2 my-4 bg-gradient-to-r from-[#f5a623] via-[#ffb938] to-[#f5a623] text-black font-semibold text-lg tracking-wide overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ffcd62] to-[#f5a623] translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  {slides[index].cta}
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="relative z-20 py-6 md:py-8 flex flex-col items-center -mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 px-4 md:px-20">
            {mem.map((card, idx) => (
              <Link
                to={card.link}
                key={idx}
                className="bg-black/80 backdrop-blur-sm overflow-hidden shadow-lg"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-40 sm:h-52 md:h-80 object-cover"
                />
                <div className="p-3 sm:p-4">
                  <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold mb-2">
                    {card.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}





