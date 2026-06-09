import {
  Telescope, BedDouble, Plane, FileCheck, Users, Heart, Briefcase, Check, ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import CTABanner from "@/components/common/CTABanner";
import { services } from "@/data/services";
import { IMG } from "@/data/images";

const iconMap: Record<string, LucideIcon> = {
  Telescope, BedDouble, Plane, FileCheck, Users, Heart, Briefcase,
};

const process = [
  { step: "01", title: "Tell us your dream", text: "Share your travel dates, interests and budget — by form, phone or email." },
  { step: "02", title: "We design your trip", text: "Our specialists craft a tailor-made itinerary and refine it until it's perfect." },
  { step: "03", title: "Relax & explore", text: "Travel with total confidence, backed by 24/7 on-the-ground support." },
];

export default function ServicesPage() {
  return (
    <Page>
      <SEO
        title="Our Services"
        description="Full-service Kenyan travel: safari tours, hotel & lodge booking, airport transfers, visa assistance, group tours, honeymoon packages and corporate travel — all handled by Success Tours."
        path="/services"
      />
      <PageHero
        eyebrow="How we help"
        title="Our Services"
        subtitle="Everything you need for a seamless Kenyan journey, handled end to end by people who care about the detail."
        image={IMG.lodgeTent}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What we offer"
            title="A complete travel partner"
            subtitle="From the first flicker of an idea to your final sundowner, we take care of every moving part."
            className="mb-14"
          />
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = iconMap[s.icon] ?? Telescope;
              return (
                <StaggerItem key={s.id}>
                  <div className="card-hover flex h-full flex-col rounded-lg border border-sand-200 bg-white p-7 shadow-soft">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold text-primary">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.longDescription}</p>
                    <ul className="mt-4 space-y-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-sand py-20 lg:py-28">
        <Container>
          <SectionHeading align="center" eyebrow="Simple & stress-free" title="How it works" className="mb-14" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {process.map((p) => (
              <div key={p.step} className="relative text-center">
                <span className="font-display text-5xl font-bold text-accent/40">{p.step}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-primary">{p.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button to="/quote" variant="secondary" size="lg">Start Planning Now <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </Container>
      </section>

      <CTABanner image={IMG.beachResort} />
    </Page>
  );
}
