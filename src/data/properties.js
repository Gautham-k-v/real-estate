import { imageUrl } from "../lib/images";

export const propertyTypes = [
  { id: "villa", label: "Luxury Villa" },
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "Independent House" },
  { id: "plot", label: "Residential Plot" },
];

export const budgetOptions = [
  { id: "all", label: "Any Budget", test: () => true },
  {
    id: "under-50",
    label: "Under ₹50 Lakhs",
    test: (value) => value < 5000000,
  },
  {
    id: "50-100",
    label: "₹50 Lakhs – ₹1 Cr",
    test: (value) => value >= 5000000 && value < 10000000,
  },
  {
    id: "100-200",
    label: "₹1 Cr – ₹2 Cr",
    test: (value) => value >= 10000000 && value <= 20000000,
  },
  {
    id: "above-200",
    label: "Above ₹2 Cr",
    test: (value) => value > 20000000,
  },
];

const properties = [
  {
    id: "luxury-waterfront-villa",
    name: "Luxury Waterfront Villa",
    location: "Kochi",
    type: "villa",
    typeLabel: "Luxury Villa",
    price: "₹1.85 Cr",
    priceValue: 18500000,
    bedrooms: 4,
    bathrooms: 4,
    area: "2800 Sq.Ft.",
    image: imageUrl("photo-1613977257363-707ba9348227", 1400),
    description:
      "A four-bedroom villa turned toward the water, with deep verandahs, a shaded court and a garden planted for the monsoon. Kochi stays within reach, while the evenings belong to the shore.",
  },
  {
    id: "premium-family-villa",
    name: "Premium Family Villa",
    location: "Kottayam",
    type: "villa",
    typeLabel: "Luxury Villa",
    price: "₹95 Lakhs",
    priceValue: 9500000,
    bedrooms: 3,
    bathrooms: 3,
    area: "2100 Sq.Ft.",
    image: imageUrl("photo-1600585154340-be6161a56a0c", 1400),
    description:
      "A three-bedroom family villa in Kottayam, planned around a generous living room, a working kitchen and a garden large enough for children and long evening gatherings.",
  },
  {
    id: "modern-3bhk-apartment",
    name: "Modern 3BHK Apartment",
    location: "Thrissur",
    type: "apartment",
    typeLabel: "Apartment",
    price: "₹78 Lakhs",
    priceValue: 7800000,
    bedrooms: 3,
    bathrooms: 2,
    area: "1650 Sq.Ft.",
    image: imageUrl("photo-1545324418-cc1a3fa10c00", 1400),
    description:
      "A light-filled three-bedroom apartment in Thrissur, with two bathrooms, a planned kitchen and the ease of a well-connected residential neighbourhood.",
  },
  {
    id: "premium-residential-plot",
    name: "Premium Residential Plot",
    location: "Pala",
    type: "plot",
    typeLabel: "Residential Plot",
    price: "₹35 Lakhs",
    priceValue: 3500000,
    area: "10 Cents",
    image: imageUrl("photo-1441974231531-c6227db76b6e", 1400),
    description:
      "Ten cents of residential land in Pala, on a quiet approach, ready for a home designed around Kerala's light, rain and garden life.",
  },
  {
    id: "heritage-courtyard-house",
    name: "Heritage Courtyard House",
    location: "Trivandrum",
    type: "house",
    typeLabel: "Independent House",
    price: "₹1.25 Cr",
    priceValue: 12500000,
    bedrooms: 4,
    bathrooms: 3,
    area: "3200 Sq.Ft.",
    image: imageUrl("photo-1570129477492-45c003edd2be", 1400),
    description:
      "An independent house in Trivandrum with the proportions of a traditional home and the comforts of present-day living. Broad rooms, a courtyard and a garden that holds the afternoon.",
  },
  {
    id: "malabar-garden-house",
    name: "Malabar Garden House",
    location: "Kozhikode",
    type: "house",
    typeLabel: "Independent House",
    price: "₹1.10 Cr",
    priceValue: 11000000,
    bedrooms: 4,
    bathrooms: 3,
    area: "2400 Sq.Ft.",
    image: imageUrl("photo-1564013799919-ab600027ffc6", 1400),
    description:
      "A four-bedroom independent house in Kozhikode, set behind a walled garden, with wide rooms and a verandah made for the long Malabar evening.",
  },
];

export function filterProperties(list, filters) {
  const budget =
    budgetOptions.find((item) => item.id === filters.budget) ?? budgetOptions[0];

  return list.filter((property) => {
    const locationMatches =
      filters.location === "all" || property.location === filters.location;
    const typeMatches = filters.type === "all" || property.type === filters.type;
    return locationMatches && typeMatches && budget.test(property.priceValue);
  });
}

export function typeLabelFor(typeId) {
  return propertyTypes.find((item) => item.id === typeId)?.label ?? typeId;
}

export function budgetLabelFor(budgetId) {
  return budgetOptions.find((item) => item.id === budgetId)?.label ?? budgetId;
}

export default properties;
