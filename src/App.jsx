import { PropertyProvider } from "./context/PropertyContext";
import About from "./components/About";
import Contact from "./components/Contact";
import FeaturedProperties from "./components/FeaturedProperties";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Locations from "./components/Locations";
import Navbar from "./components/Navbar";
import PropertyCategories from "./components/PropertyCategories";
import PropertyModal from "./components/PropertyModal";
import Testimonials from "./components/Testimonials";
import WhatsAppButton from "./components/WhatsAppButton";
import WhyChooseUs from "./components/WhyChooseUs";

export default function App() {
  return (
    <PropertyProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <FeaturedProperties />
        <PropertyCategories />
        <About />
        <WhyChooseUs />
        <Locations />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <PropertyModal />
    </PropertyProvider>
  );
}
