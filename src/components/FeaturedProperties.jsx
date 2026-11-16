import { X } from "lucide-react";
import { useProperties } from "../context/PropertyContext";
import { budgetLabelFor, typeLabelFor } from "../data/properties";
import { outlineButton, solidButton } from "../lib/styles";
import Container from "./Container";
import PropertyCard from "./PropertyCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function FeaturedProperties() {
  const { results, filters, applyFilters, resetFilters } = useProperties();
  const chips = [];

  if (filters.location !== "all") {
    chips.push({ key: "location", label: filters.location });
  }
  if (filters.type !== "all") {
    chips.push({ key: "type", label: typeLabelFor(filters.type) });
  }
  if (filters.budget !== "all") {
    chips.push({ key: "budget", label: budgetLabelFor(filters.budget) });
  }

  const noun = results.length === 1 ? "property" : "properties";
  const detail = chips.map((chip) => chip.label).join(" · ");
  const summary = detail
    ? `Showing ${results.length} ${noun} · ${detail}`
    : `Showing ${results.length} ${noun}`;

  return (
    <section id="properties" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The Collection"
            title="Discover a place to call home."
            text="Villas, apartments, independent houses and plots, chosen for light, land and the life around them."
          />
        </Reveal>

        <p aria-live="polite" className="mt-8 text-center text-sm tracking-wide text-ink/60">
          {summary}
        </p>

        {chips.length ? (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => applyFilters({ [chip.key]: "all" }, { scroll: false })}
                className="inline-flex items-center gap-2 border border-line bg-white px-3 py-1.5 text-xs tracking-wide text-ink"
              >
                {chip.label}
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">Remove {chip.label} filter</span>
              </button>
            ))}
            <button
              type="button"
              onClick={resetFilters}
              className="px-2 text-sm text-primary underline-offset-4 hover:underline"
            >
              Clear all
            </button>
          </div>
        ) : null}

        {results.length ? (
          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {results.map((property, index) => (
              <Reveal key={property.id} className="h-full" delay={Math.min(index * 0.05, 0.2)}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-line bg-white px-6 py-16 text-center">
            <h3 className="font-serif text-3xl text-primary">No properties match this search.</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/70">
              Try another location, property type or budget, or tell us what you are hoping to find.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button type="button" onClick={resetFilters} className={solidButton}>
                View all properties
              </button>
              <a href="#contact" className={outlineButton}>
                Tell us your budget
              </a>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
