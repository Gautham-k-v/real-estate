import { Phone } from "lucide-react";
import { useProperties } from "../context/PropertyContext";
import categories from "../data/categories";
import navLinks from "../data/navigation";
import { PHONE_DISPLAY, PHONE_HREF, whatsappUrl } from "../lib/whatsapp";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  const { applyFilters } = useProperties();

  return (
    <footer className="bg-primary text-cream">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            A Kerala property house for villas, apartments, independent homes and residential plots. We help you choose a place with the same care you will live in it.
          </p>
        </div>

        <div>
          <h2 className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">Quick Links</h2>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-sm text-white/75 transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
            Property Categories
          </h2>
          <ul className="mt-5 space-y-3">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => applyFilters({ type: category.id })}
                  className="text-left text-sm text-white/75 transition hover:text-white"
                >
                  {category.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">Contact</h2>
          <address className="mt-5 space-y-3 text-sm text-white/75 not-italic">
            <p>Kochi, Kerala</p>
            <a href={PHONE_HREF} className="flex items-center gap-2 transition hover:text-white">
              <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4 text-gold" />
              WhatsApp {PHONE_DISPLAY}
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-5 py-6 pr-20 text-xs text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© 2026 Malabar Estates. All rights reserved.</p>
          <p>Homes across God's Own Country.</p>
        </div>
      </div>
    </footer>
  );
}
