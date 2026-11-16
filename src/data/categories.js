import { imageUrl } from "../lib/images";

const categories = [
  {
    id: "villa",
    title: "Luxury Villas",
    description: "Waterfront and garden residences with room to breathe.",
    image: imageUrl("photo-1582268611958-ebfd161ef9cf", 1400),
  },
  {
    id: "apartment",
    title: "Modern Apartments",
    description: "City homes with considered planning and clear light.",
    image: imageUrl("photo-1460317442991-0ec209397118", 1400),
  },
  {
    id: "house",
    title: "Independent Houses",
    description: "Family houses with a garden and a gate of their own.",
    image: imageUrl("photo-1572120360610-d971b9d7767c", 1400),
  },
  {
    id: "plot",
    title: "Residential Plots",
    description: "Land chosen for the home you intend to build.",
    image: imageUrl("photo-1472214103451-9374bd1c798e", 1400),
  },
];

export default categories;
