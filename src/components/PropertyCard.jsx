import { Bath, BedDouble, LandPlot, MapPin, Ruler } from "lucide-react";
import { useProperties } from "../context/PropertyContext";
import { outlineButton } from "../lib/styles";
import Photo from "./Photo";

export function PropertySpecs({ property, className = "" }) {
  const items = [];

  if (property.bedrooms) {
    items.push({
      icon: BedDouble,
      label: `${property.bedrooms} Beds`,
      sr: `${property.bedrooms} bedrooms`,
    });
  }

  if (property.bathrooms) {
    items.push({
      icon: Bath,
      label: `${property.bathrooms} Baths`,
      sr: `${property.bathrooms} bathrooms`,
    });
  }

  items.push({
    icon: property.type === "plot" ? LandPlot : Ruler,
    label: property.area,
    sr: `Area ${property.area}`,
  });

  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink/70 ${className}`}>
      {items.map((item) => (
        <li key={item.sr} className="inline-flex items-center gap-1.5">
          <item.icon className="h-4 w-4 text-secondary" strokeWidth={1.5} aria-hidden="true" />
          <span aria-label={item.sr}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PropertyCard({ property }) {
  const { openProperty } = useProperties();

  return (
    <article className="group flex h-full flex-col border border-line bg-white shadow-[0_12px_30px_rgba(18,60,47,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(18,60,47,0.08)]">
      <button
        type="button"
        onClick={() => openProperty(property.id)}
        className="relative block aspect-[4/3] w-full overflow-hidden text-left"
        aria-label={`View details of ${property.name}`}
      >
        <Photo
          src={property.image}
          alt={`${property.name} in ${property.location}`}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-cream/95 px-3 py-1 text-[10px] tracking-[0.16em] text-primary uppercase">
          {property.typeLabel}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-serif text-[1.7rem] leading-tight text-primary">{property.name}</h3>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink/70">
          <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
          {property.location}
        </p>
        <p className="mt-4 font-serif text-[1.7rem] text-ink">{property.price}</p>
        <PropertySpecs property={property} className="mt-4 border-t border-line pt-4" />
        <button
          type="button"
          onClick={() => openProperty(property.id)}
          className={`${outlineButton} mt-6 w-full`}
        >
          View Details
        </button>
      </div>
    </article>
  );
}
