import { ArrowRight } from "lucide-react";
import { useProperties } from "../context/PropertyContext";
import locations from "../data/locations";
import Container from "./Container";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Locations() {
  const { filters, applyFilters } = useProperties();

  return (
    <section id="locations" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Locations"
            title="Your Kerala. Your corner of it."
            text="Six places we practise in, from the coast and the backwaters to town and high range."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => {
            const active = filters.location === location.name;
            return (
              <Reveal key={location.id} delay={Math.min(index * 0.04, 0.2)} className="h-full">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    applyFilters({ location: active ? "all" : location.name })
                  }
                  className={`group relative block aspect-[16/10] w-full overflow-hidden text-left ${
                    active ? "ring-2 ring-gold ring-offset-2 ring-offset-cream" : ""
                  }`}
                >
                  <Photo
                    src={location.image}
                    alt={`${location.name}, Kerala`}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/15 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-5">
                    <span className="block font-serif text-3xl text-white">{location.name}</span>
                    <span className="mt-1 block text-sm text-white/80">{location.blurb}</span>
                    <span className="mt-3 inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-gold uppercase">
                      {active ? "Showing homes here" : "See homes"}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
