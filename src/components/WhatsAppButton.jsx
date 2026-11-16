import { motion, useReducedMotion } from "framer-motion";
import { FLOATING_MESSAGE, whatsappUrl } from "../lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={whatsappUrl(FLOATING_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Malabar Estates on WhatsApp"
      className="group fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(18,60,47,0.28)]"
      whileHover={reduce ? undefined : { scale: 1.06 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
    >
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap bg-primary px-3 py-2 text-xs tracking-wide text-white opacity-0 shadow transition group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}
