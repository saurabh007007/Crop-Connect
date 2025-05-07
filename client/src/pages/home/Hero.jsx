import React from "react";
import useProgressiveImg from "../../hooks/image/useProgressiveImg";

function Hero() {
  const [src, { blur }] = useProgressiveImg(
    "/images/home-banner/home-compressed.webp",
    "/images/home-banner/home.webp"
  );

  return (
    <section className="relative overflow-hidden lg:flex h-[30vh] sm:h-[40vh] lg:h-screen items-center font-serif">
      {/* Text Section */}
      <div className="z-10 absolute mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-24 top-1/2 -translate-y-1/2">
        <div className="max-w-2xl text-center sm:text-left bg-white/70 p-6 rounded-xl shadow-lg backdrop-blur-sm">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight drop-shadow">
            Crop{" "}
            <strong className="text-orange-600 font-extrabold">Connect</strong>
          </h1>
          <p className="mt-4 max-w-lg text-base sm:text-xl leading-relaxed text-gray-800">
            किसानों और ग्राहकों के बीच सीधा संपर्क – अब ताज़ा उत्पाद सीधे आपके
            दरवाज़े पर!
          </p>

          {/* Call to Action */}
          <div className="mt-6">
            <a
              href="/products"
              className="inline-block px-6 py-3 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-orange-600 to-green-600 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
            >
              🛒 अभी खरीदें (Shop Now)
            </a>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div
        className="relative w-full h-full"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 248, 225, 0.85), rgba(255, 255, 255, 0.2)), url(${src})`,
          filter: blur ? "blur(20px)" : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </section>
  );
}

export default Hero;
