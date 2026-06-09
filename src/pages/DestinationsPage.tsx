import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { Stagger, StaggerItem } from "@/components/common/Reveal";
import DestinationCard from "@/components/cards/DestinationCard";
import CTABanner from "@/components/common/CTABanner";
import { destinations } from "@/data/destinations";
import { IMG } from "@/data/images";
import { MapPin, CalendarRange } from "lucide-react";

export default function DestinationsPage() {
  return (
    <Page>
      <SEO
        title="Kenya Destinations"
        description="Explore Kenya's iconic destinations with Success Tours — Maasai Mara, Amboseli, Diani Beach, Nairobi, Tsavo, Lake Nakuru and Samburu. Find activities, best times to visit and tailored packages."
        path="/destinations"
      />
      <PageHero
        eyebrow="Explore Kenya"
        title="Destinations"
        subtitle="From the legendary Maasai Mara to the coral coast of Diani — discover the places that make Kenya extraordinary."
        image={IMG.savanna}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Destinations" }]}
      />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Seven iconic regions"
            title="Where would you like to go?"
            subtitle="Each destination offers its own character, wildlife and rhythm. Tap any to explore activities, the best time to visit and our recommended journeys."
            className="mb-14"
          />
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <StaggerItem key={d.id}>
                <div className="card-hover flex h-full flex-col overflow-hidden rounded-lg border border-sand-200 bg-white shadow-soft">
                  <DestinationCard destination={d} />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm leading-relaxed text-muted">{d.description}</p>
                    <div className="mt-4 space-y-2 border-t border-sand-200 pt-4 text-xs text-muted">
                      <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-secondary" /> {d.activities.length} signature activities</p>
                      <p className="flex items-start gap-2"><CalendarRange className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" /> Best time: {d.bestTime}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <Reveal><CTABanner image={IMG.riftValley} /></Reveal>
    </Page>
  );
}
