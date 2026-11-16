export default function Logo({ light = false, onClick }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      className="flex items-center gap-3"
      aria-label="Malabar Estates, home"
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center border ${
          light ? "border-gold text-gold" : "border-primary text-primary"
        }`}
      >
        <span className="font-serif text-xl leading-none">M</span>
      </span>
      <span className="leading-none">
        <span
          className={`block font-serif text-[17px] tracking-[0.2em] ${
            light ? "text-white" : "text-primary"
          }`}
        >
          MALABAR
        </span>
        <span className="mt-1 block text-[10px] tracking-[0.32em] text-gold">
          ESTATES
        </span>
      </span>
    </a>
  );
}
