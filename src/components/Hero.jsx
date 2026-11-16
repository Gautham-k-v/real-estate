import { motion, useReducedMotion } from "framer-motion";
import { imageUrl } from "../lib/images";
import Photo from "./Photo";
import PropertySearch from "./PropertySearch";

const heroImage = imageUrl("photo-1613490493576-7fde63acd811", 2000);

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-end bg-primary">
      <Photo
        src={heroImage}
        alt="A luxury villa with a pool, set in a tropical Kerala garden"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/30 to-primary/75" />

      <div className="relative z-10 w-full pt-32 pb-24 md:pt-36 md:pb-20 lg:pb-16">
        <motion.div
          className="mx-auto max-w-[880px] px-5 text-center"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 flex items-center justify-center gap-4 text-[11px] font-medium tracking-[0.38em] text-gold uppercase">
            <span className="h-px w-8 bg-gold/80" aria-hidden="true" />
            Kerala
            <span className="h-px w-8 bg-gold/80" aria-hidden="true" />
          </p>
          <h1 className="font-serif text-[2.55rem] leading-[1.05] tracking-[-0.03em] text-balance text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-[5.15rem]">
            Find Your Dream Home
            <span className="mt-1 block font-medium italic">in God's Own Country.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Discover exceptional properties, thoughtfully designed for the way you want to live.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-[1040px] px-5 md:mt-12">
          <PropertySearch />
        </div>
      </div>
    </section>
  );
}
