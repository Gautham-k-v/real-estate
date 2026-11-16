import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { useProperties } from "../context/PropertyContext";
import { outlineButton, solidButton } from "../lib/styles";
import { propertyEnquiryMessage, whatsappUrl } from "../lib/whatsapp";
import Photo from "./Photo";
import { PropertySpecs } from "./PropertyCard";

function PropertyDialog({ property, onClose, onEnquire }) {
  const reduce = useReducedMotion();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const enquiryUrl = whatsappUrl(propertyEnquiryMessage(property));

  useEffect(() => {
    const root = dialogRef.current;
    const previous = document.activeElement;
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !root) return;
      const items = [
        ...root.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-primary/75 p-0 sm:items-center sm:p-6"
      onClick={onClose}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-dialog-title"
        className="max-h-[100svh] w-full overflow-y-auto bg-cream sm:max-h-[90svh] sm:max-w-4xl"
        onClick={(event) => event.stopPropagation()}
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: 16 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-64 md:min-h-full">
            <Photo
              src={property.image}
              alt={`${property.name} in ${property.location}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative p-6 md:p-8">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 grid h-10 w-10 place-items-center bg-white text-primary"
              aria-label="Close property details"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
              {property.typeLabel}
            </p>
            <h2 id="property-dialog-title" className="mt-3 pr-12 font-serif text-4xl leading-tight text-primary">
              {property.name}
            </h2>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink/70">
              <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
              {property.location}
            </p>
            <p className="mt-5 font-serif text-3xl text-ink">{property.price}</p>
            <PropertySpecs property={property} className="mt-4 border-t border-line pt-4" />
            <p className="mt-5 text-sm leading-relaxed text-ink/75">{property.description}</p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${solidButton} w-full`}
              >
                Enquire on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => onEnquire(property)}
                className={`${outlineButton} w-full`}
              >
                Complete enquiry form
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PropertyModal() {
  const { selected, closeProperty, enquireAbout } = useProperties();

  return (
    <AnimatePresence>
      {selected ? (
        <PropertyDialog
          key={selected.id}
          property={selected}
          onClose={closeProperty}
          onEnquire={enquireAbout}
        />
      ) : null}
    </AnimatePresence>
  );
}
