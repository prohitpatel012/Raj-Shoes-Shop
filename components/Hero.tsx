"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
    {
        id: 1,
        image: "https://g.sdlcdn.com/imgs/a/b/c/feedConfig/Kitchenware_11sep26Banner.jpg?q=40",
        alt: "Home storage offers",
    },
    {
        id: 2,
        image: "https://g.sdlcdn.com/imgs/a/b/c/feedConfig/OrganizersStorage_11sep26Banner.jpg?q=40",
        alt: "Fashion sale",
    },
    {
        id: 3,
        image: "https://g.sdlcdn.com/imgs/a/b/c/feedConfig/FaceMakeup_11sep26Banner.jpg?q=40",
        alt: "Electronics offers",
    },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % banners.length);
    };

    const previousSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? banners.length - 1 : prev - 1
        );
    };

    return (
        <section className="relative mx-auto w-full max-w-[1800px] overflow-hidden rounded-xl mt-4">

            {/* Slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className="relative min-w-full aspect-[4/1]"
                    >
                        <div className="relative h-[200px] w-full sm:h-[350px] md:h-[320px] lg:h-[360px] xl:h-[400px]">
                            <Image
                                src={banner.image}
                                alt={banner.alt}
                                fill
                                priority={banner.id === 1}
                                className="object-cover"
                                sizes="100vw"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Previous */}
            <button
                onClick={previousSlide}
                aria-label="Previous slide"
                className="
          absolute left-5 top-1/2
          flex h-10 w-10
          -translate-y-1/2
          items-center justify-center
          rounded-full
          bg-white/90
          text-xl text-black
          shadow-md
          transition
          hover:scale-110
        "
            >
                ‹
            </button>

            {/* Next */}
            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="
          absolute right-5 top-1/2
          flex h-10 w-10
          -translate-y-1/2
          items-center justify-center
          rounded-full
          bg-white/90
          text-xl text-black
          shadow-md
          transition
          hover:scale-110
        "
            >
                ›
            </button>

            {/* Indicators */}
            <div
                className="
          absolute bottom-4 left-1/2
          flex -translate-x-1/2
          items-center gap-1
          rounded-full
          bg-white/90
          px-2 py-1
        "
            >
                {banners.map((banner, index) => (
                    <button
                        key={banner.id}
                        onClick={() => setCurrent(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`
              h-2 rounded-full
              transition-all duration-300
              ${current === index
                                ? "w-6 bg-black"
                                : "w-2 bg-gray-400"
                            }
            `}
                    />
                ))}
            </div>
        </section>
    );
}