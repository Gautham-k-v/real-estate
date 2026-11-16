import { BadgeCheck, Compass, Headphones, ShieldCheck } from "lucide-react";
import Container from "./Container";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    text: "Every home is visited and recorded before it is offered, so what you see is the property you will walk into.",
  },
  {
    icon: BadgeCheck,
    title: "Transparent Transactions",
    text: "Pricing, measurements and paperwork are explained in plain language, with nothing held back for the final meeting.",
  },
  {
    icon: Compass,
    title: "Expert Local Knowledge",
    text: "Guidance from people who know these towns street by street — the light, the rain, the road and the neighbours.",
  },
  {
    icon: Headphones,
    title: "Dedicated Customer Support",
    text: "One team stays with you from the first call through the visit, the negotiation and the handover of keys.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Good homes begin with trust."
            text="A purchase of this size should feel considered. These are the standards we keep on every property."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={Math.min(index * 0.05, 0.2)} className="h-full">
              <article className="flex h-full flex-col border border-line bg-cream p-7">
                <span className="grid h-12 w-12 place-items-center border border-gold/60 text-primary">
                  <reason.icon className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-serif text-[1.7rem] leading-tight text-primary">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{reason.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
