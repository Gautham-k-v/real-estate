import { useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import locations from "../data/locations";
import { budgetOptions, propertyTypes } from "../data/properties";
import { useProperties } from "../context/PropertyContext";

function SelectField({ id, label, value, onChange, children, className = "" }) {
  return (
    <label htmlFor={id} className={`block min-w-0 bg-white px-4 py-3 md:px-5 md:py-4 ${className}`}>
      <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-ink/45">
        {label}
      </span>
      <span className="relative mt-1 block">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="w-full appearance-none bg-transparent pr-7 text-[15px] font-medium text-ink outline-none"
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-ink/50"
          aria-hidden="true"
        />
      </span>
    </label>
  );
}

export default function PropertySearch() {
  const { filters, applyFilters } = useProperties();
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const update = (key) => (event) => {
    setDraft((current) => ({ ...current, [key]: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    applyFilters({
      location: draft.location,
      type: draft.type,
      budget: draft.budget,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Search properties"
      className="grid grid-cols-1 gap-px bg-line shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
    >
      <SelectField id="search-location" label="Location" value={draft.location} onChange={update("location")}>
        <option value="all">All Locations</option>
        {locations.map((location) => (
          <option key={location.id} value={location.name}>
            {location.name}
          </option>
        ))}
      </SelectField>

      <SelectField id="search-type" label="Property Type" value={draft.type} onChange={update("type")}>
        <option value="all">All Types</option>
        {propertyTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.label}
          </option>
        ))}
      </SelectField>

      <SelectField id="search-budget" label="Budget" value={draft.budget} onChange={update("budget")}>
        {budgetOptions.map((budget) => (
          <option key={budget.id} value={budget.id}>
            {budget.label}
          </option>
        ))}
      </SelectField>

      <div className="bg-white p-2 sm:col-span-1 lg:min-w-[220px]">
        <button
          type="submit"
          className="flex h-full min-h-12 w-full items-center justify-center gap-2 bg-primary px-6 text-sm tracking-wide text-white transition duration-300 hover:bg-secondary"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Search Properties
        </button>
      </div>
    </form>
  );
}
