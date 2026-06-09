import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/data/destinations";

export default function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const featured = destinations[0];
  const rest = destinations.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-1/2 top-full z-50 mt-3 w-[min(880px,92vw)] -translate-x-1/2 overflow-hidden rounded-lg border border-sand-200 bg-white shadow-lift"
    >
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="col-span-3 p-6">
          <p className="eyebrow mb-4">Explore Kenya by region</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            {rest.map((d) => (
              <Link key={d.id} to={`/destinations/${d.slug}`} onClick={onNavigate}
                className="group flex items-start gap-3 rounded p-2 transition hover:bg-sand-100">
                <img src={d.image} alt={d.name} className="h-12 w-12 shrink-0 rounded object-cover" loading="lazy" />
                <span>
                  <span className="block text-sm font-semibold text-primary group-hover:text-secondary">{d.name}</span>
                  <span className="block text-xs text-muted">{d.region}</span>
                </span>
              </Link>
            ))}
          </div>
          <Link to="/destinations" onClick={onNavigate}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary-dark">
            View all destinations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Link to={`/destinations/${featured.slug}`} onClick={onNavigate}
          className="group relative col-span-2 min-h-[220px] overflow-hidden">
          <img src={featured.image} alt={featured.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
          <div className="absolute bottom-0 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">Featured</p>
            <p className="font-display text-xl font-bold text-white">{featured.name}</p>
            <p className="mt-1 text-xs text-white/80">{featured.tagline}</p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
