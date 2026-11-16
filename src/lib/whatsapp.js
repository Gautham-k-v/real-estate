export const WHATSAPP_NUMBER = "918590909416";
export const PHONE_DISPLAY = "+91 8590909416";
export const PHONE_HREF = "tel:+918590909416";
export const WHATSAPP_URL = "https://wa.me/918590909416";

export const FLOATING_MESSAGE =
  "Hello Malabar Estates, I would like to speak with you about buying a property in Kerala.";

export function whatsappUrl(message) {
  if (!message) return WHATSAPP_URL;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message) {
  const url = whatsappUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
  return url;
}

export function isValidIndianMobile(input) {
  const compact = String(input).replace(/[\s()-]/g, "");
  if (/^\+91[6-9]\d{9}$/.test(compact)) return true;
  if (/^91[6-9]\d{9}$/.test(compact)) return true;
  if (/^[6-9]\d{9}$/.test(compact)) return true;
  return false;
}

export function isValidName(input) {
  const value = input.trim();
  if (value.length < 2 || value.length > 80) return false;
  return /[A-Za-z\u0D00-\u0D7F]/.test(value);
}

export function propertyEnquiryMessage(property) {
  const lines = [
    "Hello Malabar Estates,",
    "",
    "I would like to know more about this property.",
    "",
    `Property: ${property.name}`,
    `Location: ${property.location}`,
    `Price: ${property.price}`,
  ];

  if (property.bedrooms) lines.push(`Bedrooms: ${property.bedrooms}`);
  if (property.bathrooms) lines.push(`Bathrooms: ${property.bathrooms}`);
  lines.push(`Area: ${property.area}`);
  lines.push("", "Please share the details and a convenient time to speak.");
  return lines.join("\n");
}

export function formEnquiryMessage({ name, phone, typeLabel, location, message }) {
  return [
    "Hello Malabar Estates,",
    "",
    "I would like to enquire about a property.",
    "",
    `Name: ${name.trim()}`,
    `Phone: ${phone.trim()}`,
    `Property type: ${typeLabel}`,
    `Preferred location: ${location}`,
    `Message: ${message.trim()}`,
  ].join("\n");
}
