import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock, Users, MapPin, Calendar, Check, X as XIcon, Star, ChevronRight, Sparkles, MessageCircle,
} from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/common/Accordion";
import InquiryForm from "@/components/forms/InquiryForm";
import PackageCard from "@/components/cards/PackageCard";
import NotFoundPage from "./NotFoundPage";
import { getPackage, packages } from "@/data/packages";
import { formatPrice, formatDate } from "@/utils/format";

export default function PackageDetailsPage() {
  const { slug } = useParams();
  const pkg = slug ? getPackage(slug) : undefined;
  const [activeImg, setActiveImg] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    if (!inquiryOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setInquiryOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [inquiryOpen]);

  if (!pkg) return <NotFoundPage />;

  const related = packages
    .filter((p) => p.id !== pkg.id && (p.destinationName === pkg.destinationName || p.type === pkg.type))
    .slice(0, 3);

  return (
    <Page>
      <SEO
        title={pkg.name}
        description={pkg.shortDescription}
        path={`/packages/${pkg.slug}`}
        image={pkg.image}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: pkg.name,
          description: pkg.shortDescription,
          image: pkg.image,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: pkg.rating,
            reviewCount: pkg.reviews,
          },
          offers: { "@type": "Offer", price: pkg.price, priceCurrency: "USD" },
        }}
      />

      {/* HERO BANNER */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={pkg.image} alt={pkg.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-primary/30" />
        </div>
        <Container className="relative z-10 pb-12 pt-32">
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs font-medium text-white/70">
            <Link to="/" className="hover:text-accent">Home</Link><ChevronRight className="h-3 w-3" />
            <Link to="/packages" className="hover:text-accent">Packages</Link><ChevronRight className="h-3 w-3" />
            <span className="text-white">{pkg.name}</span>
          </nav>
          <Badge tone="accent">{pkg.type}</Badge>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">{pkg.name}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-accent" />{pkg.duration}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-accent" />{pkg.groupSize}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" />{pkg.locations.join(" · ")}</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-accent text-accent" />{pkg.rating} ({pkg.reviews} reviews)</span>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* MAIN */}
            <div className="lg:col-span-2">
              {/* Gallery */}
              <div className="overflow-hidden rounded-lg">
                <img src={pkg.gallery[activeImg]} alt={pkg.name} className="aspect-[16/10] w-full object-cover" />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {pkg.gallery.map((g, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`overflow-hidden rounded-lg ring-2 transition ${activeImg === i ? "ring-secondary" : "ring-transparent"}`}>
                    <img src={g} alt={`${pkg.name} ${i + 1}`} className="aspect-square w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>

              {/* Overview */}
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">Tour overview</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">{pkg.overview}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {pkg.highlights.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary-dark">
                      <Sparkles className="h-3.5 w-3.5" /> {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">Day-by-day itinerary</h2>
                <ol className="mt-6 space-y-5 border-l-2 border-sand-200 pl-6">
                  {pkg.itinerary.map((d, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-secondary bg-white" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{d.day}</p>
                      <h3 className="mt-0.5 font-display text-lg font-bold text-primary">{d.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{d.description}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Included / Excluded */}
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-lg border border-sand-200 bg-sand p-6">
                  <h3 className="font-display text-lg font-bold text-primary">What's included</h3>
                  <ul className="mt-4 space-y-2.5">
                    {pkg.included.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm text-ink">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-sand-200 bg-sand p-6">
                  <h3 className="font-display text-lg font-bold text-primary">What's excluded</h3>
                  <ul className="mt-4 space-y-2.5">
                    {pkg.excluded.map((exc) => (
                      <li key={exc} className="flex items-start gap-2.5 text-sm text-muted">
                        <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" /> {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQs */}
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">Frequently asked questions</h2>
                <div className="mt-6"><Accordion items={pkg.faqs} /></div>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-lg border border-sand-200 bg-white p-6 shadow-lift">
                  <p className="text-xs uppercase tracking-wide text-muted">From</p>
                  <p className="font-display text-4xl font-bold text-primary">
                    {formatPrice(pkg.price)}<span className="text-sm font-normal text-muted"> / person</span>
                  </p>
                  <div className="mt-5 space-y-3 border-y border-sand-200 py-5 text-sm">
                    <p className="flex items-center justify-between"><span className="text-muted">Duration</span><span className="font-semibold text-primary">{pkg.duration}</span></p>
                    <p className="flex items-center justify-between"><span className="text-muted">Group size</span><span className="font-semibold text-primary">{pkg.groupSize}</span></p>
                    <p className="flex items-center justify-between"><span className="text-muted">Type</span><span className="font-semibold text-primary">{pkg.type}</span></p>
                    <p className="flex items-center justify-between"><span className="text-muted">Next departure</span><span className="inline-flex items-center gap-1 font-semibold text-primary"><Calendar className="h-3.5 w-3.5 text-secondary" />{formatDate(pkg.nextDeparture)}</span></p>
                  </div>
                  <div className="mt-5 space-y-3">
                    <Button to="/quote" variant="secondary" size="lg" fullWidth>Request a Quote</Button>
                    <Button variant="ghost" size="lg" fullWidth onClick={() => setInquiryOpen(true)}>
                      <MessageCircle className="h-4 w-4" /> Ask a Question
                    </Button>
                  </div>
                </div>

                <div id="inquire" className="rounded-lg border border-sand-200 bg-sand p-6 shadow-soft">
                  <h3 className="font-display text-lg font-bold text-primary">Enquire about this trip</h3>
                  <p className="mb-4 mt-1 text-xs text-muted">Send us a quick message and we'll reply within 24 hours.</p>
                  <InquiryForm packageName={pkg.name} />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-sand py-20 lg:py-28">
          <Container>
            <SectionHeading align="center" eyebrow="You may also like" title="Related tours" className="mb-12" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <PackageCard key={p.id} pkg={p} />)}
            </div>
          </Container>
        </section>
      )}

      {/* Inquiry Modal */}
      {inquiryOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
            onClick={() => setInquiryOpen(false)}
          />
          {/* Panel */}
          <div className="relative z-10 w-full max-w-lg rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-sand-200 px-6 py-4">
              <div>
                <h2 className="font-display text-lg font-bold text-primary">Ask a Question</h2>
                <p className="mt-0.5 text-xs text-muted">About: <span className="font-medium text-primary">{pkg.name}</span></p>
              </div>
              <button
                type="button"
                onClick={() => setInquiryOpen(false)}
                className="ml-4 rounded p-1 text-muted transition hover:bg-sand-200 hover:text-primary"
                aria-label="Close"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            {/* Form */}
            <div className="max-h-[80vh] overflow-y-auto px-6 py-5">
              <InquiryForm packageName={pkg.name} onSuccess={() => setInquiryOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
