import { Quote } from "lucide-react";
import testimonials from "../data/testimonials";
import Container from "./Container";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="The best stories begin at home."
            text="A few words from families who found their address with us."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={Math.min(index * 0.06, 0.18)} className="h-full">
              <blockquote className="flex h-full flex-col border border-line bg-cream p-7 md:p-8">
                <Quote className="h-7 w-7 text-gold" aria-hidden="true" />
                <p className="mt-5 flex-1 font-serif text-[1.45rem] leading-snug text-primary italic">
                  “{item.quote}”
                </p>
                <footer className="mt-6 border-t border-line pt-4">
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="mt-1 text-sm text-ink/60">{item.detail}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
