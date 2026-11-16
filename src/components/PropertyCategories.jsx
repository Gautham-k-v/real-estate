import { ArrowRight } from "lucide-react";
import { useProperties } from "../context/PropertyContext";
import categories from "../data/categories";
import Container from "./Container";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function PropertyCategories() {
  const { filters, applyFilters } = useProperties();

  return (
    <section id="categories" className="bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Residences"
            title="Different dreams. One trusted address."
            text="Four ways to live in Kerala. Choose a direction, and the collection above narrows with you."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const active = filters.type === category.id;
            return (
              <Reveal key={category.id} delay={Math.min(index * 0.05, 0.2)} className="h-full">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    applyFilters({ type: active ? "all" : category.id })
                  }
                  className={`group relative block aspect-[16/10] w-full overflow-hidden text-left sm:aspect-[4/5] ${
                    active ? "ring-2 ring-gold ring-offset-2 ring-offset-white" : ""
                  }`}
                >
                  <Photo
                    src={category.image}
                    alt={category.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-primary/10" />
                  <span className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <span className="text-[11px] tracking-[0.22em] text-gold">0{index + 1}</span>
                    <span className="mt-2 block font-serif text-3xl leading-tight text-white">
                      {category.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-white/80">
                      {category.description}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-gold uppercase">
                      {active ? "Showing these homes" : "View properties"}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
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
