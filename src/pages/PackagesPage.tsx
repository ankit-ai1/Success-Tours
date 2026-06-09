import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import PackageCard from "@/components/cards/PackageCard";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import { packages } from "@/data/packages";
import { IMG } from "@/data/images";
import type { TripType } from "@/types";
import { cn } from "@/utils/cn";

const tripTypes: TripType[] = ["Safari", "Beach", "Adventure", "Family", "Honeymoon", "Cultural", "Luxury"];
const durationBands = [
  { label: "Any length", value: "" },
  { label: "1–4 days", value: "short" },
  { label: "5–7 days", value: "mid" },
  { label: "8+ days", value: "long" },
];
const sortOptions = [
  { label: "Most popular", value: "popular" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Highest rated", value: "rating" },
  { label: "Duration", value: "duration" },
];
const PER_PAGE = 9;

export default function PackagesPage() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") ?? "";
  const initialDestination = searchParams.get("destination") ?? "";

  const [type, setType] = useState(initialType);
  const [duration, setDuration] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(8000);
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  // Sync from URL on mount/param change
  useEffect(() => {
    setType(searchParams.get("type") ?? "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = packages.filter((p) => {
      if (type && p.type !== type) return false;
      if (initialDestination && !p.locations.includes(initialDestination) && p.destinationName !== initialDestination) return false;
      if (p.rating < minRating) return false;
      if (p.price > maxPrice) return false;
      if (duration === "short" && p.days > 4) return false;
      if (duration === "mid" && (p.days < 5 || p.days > 7)) return false;
      if (duration === "long" && p.days < 8) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "duration": return a.days - b.days;
        default: return b.rating * b.reviews - a.rating * a.reviews;
      }
    });
    return list;
  }, [type, duration, minRating, maxPrice, sort, initialDestination]);

  useEffect(() => { setPage(1); }, [type, duration, minRating, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const resetFilters = () => {
    setType(""); setDuration(""); setMinRating(0); setMaxPrice(8000); setSort("popular");
  };

  const filterPanel = (
    <div className="space-y-7">
      <div>
        <h4 className="field-label">Experience type</h4>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setType("")} className={cn("rounded-full px-3 py-1.5 text-xs font-medium transition", !type ? "bg-primary text-white" : "bg-sand-200 text-primary hover:bg-sand-300")}>All</button>
          {tripTypes.map((t) => (
            <button key={t} onClick={() => setType(t)} className={cn("rounded-full px-3 py-1.5 text-xs font-medium transition", type === t ? "bg-primary text-white" : "bg-sand-200 text-primary hover:bg-sand-300")}>{t}</button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="field-label">Duration</h4>
        <div className="space-y-1.5">
          {durationBands.map((d) => (
            <label key={d.value} className="flex cursor-pointer items-center gap-2 text-sm text-ink">
              <input type="radio" name="duration" checked={duration === d.value} onChange={() => setDuration(d.value)} className="accent-secondary" />
              {d.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="field-label">Max price: <span className="text-secondary">${maxPrice.toLocaleString()}</span></h4>
        <input type="range" min={1000} max={8000} step={250} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-secondary" />
      </div>

      <div>
        <h4 className="field-label">Minimum rating</h4>
        <div className="flex gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button key={r} onClick={() => setMinRating(r)} className={cn("rounded px-3 py-1.5 text-xs font-medium transition", minRating === r ? "bg-secondary text-white" : "bg-sand-200 text-primary hover:bg-sand-300")}>
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <button onClick={resetFilters} className="text-xs font-semibold uppercase tracking-wide text-secondary hover:text-secondary-dark">
        Reset all filters
      </button>
    </div>
  );

  return (
    <Page>
      <SEO
        title="Kenya Tour Packages & Safaris"
        description="Browse 24 expertly crafted Kenya tour packages — luxury safaris, beach escapes, honeymoons, family adventures and more. Filter by price, duration, type and rating."
        path="/packages"
      />
      <PageHero
        eyebrow="Curated journeys"
        title="Tour Packages"
        subtitle="Twenty-four hand-crafted Kenyan adventures — every one private, flexible and ready to tailor to you."
        image={IMG.safariJeep}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Packages" }]}
      />

      <section className="bg-sand py-16 lg:py-24">
        <Container>
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10">
            {/* Desktop filters */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-lg border border-sand-200 bg-white p-6 shadow-soft">
                <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-primary">
                  <SlidersHorizontal className="h-5 w-5 text-secondary" /> Filters
                </h3>
                {filterPanel}
              </div>
            </aside>

            {/* Results */}
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-muted">
                  Showing <strong className="text-primary">{filtered.length}</strong> {filtered.length === 1 ? "package" : "packages"}
                  {initialDestination && <> in <strong className="text-primary">{initialDestination}</strong></>}
                </p>
                <div className="flex items-center gap-3">
                  <button onClick={() => setMobileFilters(true)} className="inline-flex items-center gap-2 rounded border border-sand-300 bg-white px-3 py-2 text-sm font-medium text-primary lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                  </button>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded border border-sand-300 bg-white px-3 py-2 text-sm text-ink outline-none" aria-label="Sort packages">
                    {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {visible.length > 0 ? (
                <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {visible.map((p) => <StaggerItem key={p.id}><PackageCard pkg={p} /></StaggerItem>)}
                </Stagger>
              ) : (
                <div className="rounded-lg border border-sand-200 bg-white p-12 text-center">
                  <p className="font-display text-xl font-bold text-primary">No packages match your filters</p>
                  <p className="mt-2 text-sm text-muted">Try widening your price range or clearing a filter.</p>
                  <button onClick={resetFilters} className="mt-5 rounded bg-primary px-5 py-2.5 text-sm font-semibold text-white">Reset filters</button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} onClick={() => { setPage(i + 1); window.scrollTo({ top: 300, behavior: "smooth" }); }}
                      className={cn("h-10 w-10 rounded text-sm font-semibold transition", page === i + 1 ? "bg-primary text-white" : "bg-white text-primary hover:bg-sand-200")}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile filter drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="absolute inset-0 bg-primary/50" onClick={() => setMobileFilters(false)} />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-primary">Filters</h3>
              <button onClick={() => setMobileFilters(false)} aria-label="Close filters"><X className="h-6 w-6 text-primary" /></button>
            </div>
            {filterPanel}
            <button onClick={() => setMobileFilters(false)} className="mt-8 w-full rounded bg-primary py-3 text-sm font-semibold text-white">
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </Page>
  );
}
