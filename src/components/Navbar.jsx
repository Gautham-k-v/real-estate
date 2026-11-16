import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import navLinks from "../data/navigation";
import { navButton, solidButton } from "../lib/styles";
import Logo from "./Logo";

const sectionIds = navLinks.map((link) => link.id);

export default function Navbar() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const marker = 120;
      let current = "home";
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;
        if (element.getBoundingClientRect().top <= marker) current = id;
      });
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;
  const light = !solid;

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[76px] transition-colors duration-300 ${
          solid
            ? "border-b border-line bg-cream/95 shadow-[0_8px_30px_rgba(18,60,47,0.06)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-5 md:px-8">
          <Logo light={light} onClick={closeMenu} />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block" aria-label="Primary">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`text-sm tracking-wide transition ${
                        isActive
                          ? "text-gold"
                          : light
                            ? "text-white/90 hover:text-white"
                            : "text-ink/80 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center">
            <a href="#contact" className={navButton}>
              Enquire Now
            </a>
            <button
              type="button"
              className={`grid h-11 w-11 place-items-center lg:hidden ${
                light ? "text-white" : "text-primary"
              }`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="fixed inset-x-0 top-[76px] bottom-0 z-[45] overflow-y-auto bg-cream px-6 py-8 lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.id} className="border-b border-line">
                  <a
                    href={`#${link.id}`}
                    onClick={closeMenu}
                    className="block py-4 font-serif text-3xl text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={closeMenu}
              className={`${solidButton} mt-8 w-full`}
            >
              Enquire Now
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
