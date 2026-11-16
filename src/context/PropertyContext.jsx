import { createContext, useCallback, useContext, useMemo, useState } from "react";
import properties, { filterProperties } from "../data/properties";

const PropertyContext = createContext(null);

const emptyFilters = {
  location: "all",
  type: "all",
  budget: "all",
};

export function PropertyProvider({ children }) {
  const [filters, setFilters] = useState(emptyFilters);
  const [selectedId, setSelectedId] = useState(null);
  const [enquiry, setEnquiry] = useState(null);

  const results = useMemo(
    () => filterProperties(properties, filters),
    [filters],
  );

  const selected = useMemo(
    () => properties.find((item) => item.id === selectedId) ?? null,
    [selectedId],
  );

  const applyFilters = useCallback((partial, { scroll = true } = {}) => {
    setFilters((current) => ({ ...current, ...partial }));
    if (!scroll) return;
    window.requestAnimationFrame(() => {
      document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(emptyFilters);
  }, []);

  const openProperty = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const closeProperty = useCallback(() => {
    setSelectedId(null);
  }, []);

  const enquireAbout = useCallback((property) => {
    setEnquiry({
      token: crypto.randomUUID(),
      type: property.type,
      location: property.location,
      message: `I would like to know more about ${property.name} in ${property.location}, listed at ${property.price}.`,
    });
    setSelectedId(null);
    window.requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const value = {
    filters,
    results,
    selected,
    enquiry,
    applyFilters,
    resetFilters,
    openProperty,
    closeProperty,
    enquireAbout,
  };

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used within PropertyProvider");
  }
  return context;
}
