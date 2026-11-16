export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  light = false,
}) {
  const centered = align === "center";

  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <span
        className={`mt-4 block h-px w-10 bg-gold ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
      <h2
        className={`mt-5 font-serif text-[2.5rem] leading-[1.08] tracking-[-0.02em] text-balance md:text-5xl lg:text-[3.35rem] ${
          light ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={`mt-5 text-base leading-relaxed md:text-lg ${
            light ? "text-white/75" : "text-ink/70"
          }`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
