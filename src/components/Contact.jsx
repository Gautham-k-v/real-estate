import { useEffect, useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { useProperties } from "../context/PropertyContext";
import locations from "../data/locations";
import { propertyTypes } from "../data/properties";
import { imageUrl } from "../lib/images";
import { outlineButton, solidButton } from "../lib/styles";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  formEnquiryMessage,
  isValidIndianMobile,
  isValidName,
  openWhatsApp,
  whatsappUrl,
} from "../lib/whatsapp";
import Container from "./Container";
import Photo from "./Photo";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";

const contactImage = imageUrl("photo-1571896349842-33c89424de2d", 1600);

const emptyValues = {
  name: "",
  phone: "",
  type: "",
  location: "",
  message: "",
};

const controlClass = (invalid) =>
  `w-full border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-primary ${
    invalid ? "border-[#8C3A32]" : "border-line"
  }`;

function Field({ id, label, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-medium tracking-[0.18em] text-ink/55 uppercase"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#8C3A32]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function Contact() {
  const { enquiry } = useProperties();
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sentUrl, setSentUrl] = useState("");

  useEffect(() => {
    if (!enquiry) return;
    setValues((current) => ({
      ...current,
      type: enquiry.type,
      location: enquiry.location,
      message: enquiry.message,
    }));
    setErrors({});
    setSubmitted(false);
    const timer = window.setTimeout(() => {
      document.getElementById("full-name")?.focus({ preventScroll: true });
    }, 450);
    return () => window.clearTimeout(timer);
  }, [enquiry]);

  const setField = (key) => (event) => {
    const next = event.target.value;
    setValues((current) => ({ ...current, [key]: next }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitted(false);
  };

  const validate = () => {
    const next = {};
    if (!isValidName(values.name)) {
      next.name = "Please enter your full name.";
    }
    if (!isValidIndianMobile(values.phone)) {
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!values.type) {
      next.type = "Select the property type you are interested in.";
    }
    if (!values.location) {
      next.location = "Select a preferred location.";
    }
    if (values.message.trim().length < 10) {
      next.message = "Please tell us a little about what you are looking for.";
    }
    return next;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    const firstInvalid = ["name", "phone", "type", "location", "message"].find(
      (key) => nextErrors[key],
    );
    if (firstInvalid) {
      const fieldIds = {
        name: "full-name",
        phone: "phone-number",
        type: "property-type",
        location: "preferred-location",
        message: "message",
      };
      document.getElementById(fieldIds[firstInvalid])?.focus();
      return;
    }

    const typeLabel = propertyTypes.find((item) => item.id === values.type)?.label ?? values.type;
    const message = formEnquiryMessage({
      name: values.name,
      phone: values.phone,
      typeLabel,
      location: values.location,
      message: values.message,
    });
    const url = openWhatsApp(message);
    setSentUrl(url);
    setSubmitted(true);
  };

  const resetForm = () => {
    setValues(emptyValues);
    setErrors({});
    setSubmitted(false);
    setSentUrl("");
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <Container>
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.32em] text-gold uppercase">Enquire</p>
            <span className="mt-4 block h-px w-10 bg-gold" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-[2.6rem] leading-[1.08] tracking-[-0.02em] text-primary md:text-5xl">
              Let's Find Your Perfect Property.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75">
              Tell us the home you have in mind. This form prepares a WhatsApp message for our team. It does not save your details on a server.
            </p>

            <div className="mt-6 flex flex-col gap-3 text-sm">
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-ink hover:text-primary">
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ink hover:text-primary"
              >
                <WhatsAppIcon className="h-4 w-4 text-secondary" />
                WhatsApp {PHONE_DISPLAY}
              </a>
            </div>

            <form className="mt-8 border border-line bg-white p-5 md:p-8" onSubmit={onSubmit} noValidate>
              <div className="grid gap-5">
                <Field id="full-name" label="Full Name" error={errors.name}>
                  <input
                    id="full-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={setField("name")}
                    maxLength={80}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "full-name-error" : undefined}
                    className={controlClass(errors.name)}
                    placeholder="Your name"
                  />
                </Field>

                <Field id="phone-number" label="Phone Number" error={errors.phone}>
                  <input
                    id="phone-number"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={setField("phone")}
                    maxLength={16}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-number-error" : undefined}
                    className={controlClass(errors.phone)}
                    placeholder="+91 8590909416"
                  />
                </Field>

                <Field id="property-type" label="Interested Property Type" error={errors.type}>
                  <span className="relative block">
                    <select
                      id="property-type"
                      name="type"
                      value={values.type}
                      onChange={setField("type")}
                      aria-invalid={Boolean(errors.type)}
                      aria-describedby={errors.type ? "property-type-error" : undefined}
                      className={`${controlClass(errors.type)} appearance-none pr-10`}
                    >
                      <option value="">Select a property type</option>
                      {propertyTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-ink/50"
                      aria-hidden="true"
                    />
                  </span>
                </Field>

                <Field id="preferred-location" label="Preferred Location" error={errors.location}>
                  <span className="relative block">
                    <select
                      id="preferred-location"
                      name="location"
                      value={values.location}
                      onChange={setField("location")}
                      aria-invalid={Boolean(errors.location)}
                      aria-describedby={errors.location ? "preferred-location-error" : undefined}
                      className={`${controlClass(errors.location)} appearance-none pr-10`}
                    >
                      <option value="">Select a location</option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.name}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-ink/50"
                      aria-hidden="true"
                    />
                  </span>
                </Field>

                <Field id="message" label="Message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={setField("message")}
                    maxLength={1000}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${controlClass(errors.message)} resize-y`}
                    placeholder="Tell us about the home you are looking for."
                  />
                </Field>
              </div>

              {submitted ? (
                <div role="status" className="mt-6 border border-secondary/30 bg-[#eef4f0] p-5">
                  <p className="font-serif text-2xl text-primary">Enquiry ready on WhatsApp</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">
                    Your message is ready for {PHONE_DISPLAY}. If a chat window did not open, use the button below. Nothing from this form is stored on a server.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={sentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={solidButton}
                    >
                      Open WhatsApp
                    </a>
                    <button type="button" onClick={resetForm} className={outlineButton}>
                      Send another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button type="submit" className={`${solidButton} mt-6 w-full`}>
                    Submit Enquiry
                  </button>
                  <p className="mt-3 text-xs leading-relaxed text-ink/55">
                    Submitting opens WhatsApp with your enquiry to Malabar Estates.
                  </p>
                </>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.08} className="relative min-h-[320px] lg:min-h-full">
            <Photo
              src={contactImage}
              alt="A tropical residence with still water and garden planting"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-5 left-5 bg-primary/90 px-5 py-4 text-white">
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Malabar Estates</p>
              <p className="mt-1 font-serif text-2xl">Kochi, Kerala</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
