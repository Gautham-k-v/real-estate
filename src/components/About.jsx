import { imageUrl } from "../lib/images";
import { outlineButton, solidButton } from "../lib/styles";
import Container from "./Container";
import Photo from "./Photo";
import Reveal from "./Reveal";

const aboutImage = imageUrl("photo-1600607687939-ce8a6c25118c", 1600);

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative min-h-[420px] lg:min-h-[560px]">
            <Photo
              src={aboutImage}
              alt="A contemporary Kerala residence framed by tropical planting"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-5 left-5 bg-primary px-6 py-5 text-white md:bottom-8 md:left-8">
              <p className="font-serif text-5xl leading-none">6</p>
              <p className="mt-2 max-w-[12rem] text-sm leading-relaxed text-white/80">
                Cities across Kerala, visited before they are offered.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-[11px] font-medium tracking-[0.32em] text-gold uppercase">
              About Malabar Estates
            </p>
            <span className="mt-4 block h-px w-10 bg-gold" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-[2.6rem] leading-[1.08] tracking-[-0.02em] text-primary md:text-5xl">
              Building Dreams, Creating Legacies.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/75">
              <p>
                Malabar Estates is a property house rooted in Kerala. We work with families looking for a villa by the water, an apartment in town, an independent home with a garden, or a plot on which to build.
              </p>
              <p>
                From Kochi and Kottayam to Pala, Thrissur, Trivandrum and Kozhikode, every listing is walked, measured and explained in plain language by people who live here.
              </p>
              <p>
                The aim is a home you can picture clearly, and a transaction you can follow without surprise.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#properties" className={solidButton}>
                Explore Properties
              </a>
              <a href="#contact" className={outlineButton}>
                Enquire Now
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
