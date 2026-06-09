import { Link } from "react-router-dom";
import { Clock, MapPin, Users, ArrowRight } from "lucide-react";
import type { TourPackage } from "@/types";
import { formatPrice } from "@/utils/format";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";

export default function PackageCard({ pkg }: { pkg: TourPackage }) {
  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden rounded-lg border border-sand-200 bg-white shadow-soft">
      <Link to={`/packages/${pkg.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <img src={pkg.image} alt={pkg.name} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute left-3 top-3"><Badge tone="white">{pkg.type}</Badge></div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center justify-between">
          <span className="eyebrow">{pkg.destinationName}</span>
          <Rating value={pkg.rating} />
        </div>
        <h3 className="font-display text-xl font-bold leading-snug text-primary">
          <Link to={`/packages/${pkg.slug}`} className="transition hover:text-secondary">{pkg.name}</Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{pkg.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-secondary" />{pkg.duration}</span>
          <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-secondary" />{pkg.groupSize}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-secondary" />{pkg.locations.length} stops</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-sand-200 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted">From</p>
            <p className="font-display text-xl font-bold text-primary">{formatPrice(pkg.price)}<span className="text-xs font-normal text-muted"> /pp</span></p>
          </div>
          <Link to={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-1.5 rounded bg-accent px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-accent-light">
            Explore <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
