import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Tag, Search } from "lucide-react";
import { destinations } from "@/data/destinations";
import type { TripType } from "@/types";

const tripTypes: TripType[] = ["Safari", "Beach", "Adventure", "Family", "Honeymoon", "Cultural", "Luxury"];

/** Hero search bar — composes query params and routes to the packages page. */
export default function PackageSearch() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [type, setType] = useState("");

  const submit = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (type) params.set("type", type);
    navigate(`/packages${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <div className="rounded-xl border border-white/15 bg-white/95 p-3 shadow-lift backdrop-blur sm:p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="flex items-center gap-2 rounded-lg border border-sand-300 bg-white px-3 py-2.5">
          <MapPin className="h-4 w-4 shrink-0 text-secondary" />
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none"
            aria-label="Destination"
          >
            <option value="">Any destination</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 rounded-lg border border-sand-300 bg-white px-3 py-2.5">
          <Tag className="h-4 w-4 shrink-0 text-secondary" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none"
            aria-label="Trip type"
          >
            <option value="">Any experience</option>
            {tripTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <button
          onClick={submit}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition hover:bg-accent-light"
        >
          <Search className="h-4 w-4" /> Search
        </button>
      </div>
    </div>
  );
}
