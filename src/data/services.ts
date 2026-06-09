import type { Service } from "@/types";

export const services: Service[] = [
  { id: "s1", slug: "safari-tours", title: "Safari Tours", icon: "Telescope",
    description: "Expertly guided game drives across Kenya's finest parks and conservancies.",
    longDescription: "Our signature safaris are crafted around the wildlife moments you most want to see, led by some of Kenya's most experienced driver-guides in comfortable private 4x4 vehicles.",
    features: ["Private 4x4 vehicles", "Expert local guides", "Big Five & migration", "Luxury & classic options", "Conservancy access"] },
  { id: "s2", slug: "hotel-booking", title: "Hotel & Lodge Booking", icon: "BedDouble",
    description: "Hand-picked lodges, tented camps and beach resorts to suit every taste and budget.",
    longDescription: "From intimate eco-camps to opulent beachfront villas, we secure the best properties at preferred rates and match each stay to your style and the rhythm of your journey.",
    features: ["Curated property portfolio", "Preferred-partner rates", "Luxury to mid-range", "Verified quality", "Seamless reservations"] },
  { id: "s3", slug: "airport-transfers", title: "Airport Transfers", icon: "Plane",
    description: "Reliable, comfortable meet-and-greet transfers and internal flight coordination.",
    longDescription: "Travel stress-free from the moment you land. We arrange airport welcomes, private transfers and all internal light-aircraft connections so you never have to think about logistics.",
    features: ["Airport meet & greet", "Private vehicles", "Light-aircraft connections", "24/7 coordination", "Door-to-door service"] },
  { id: "s4", slug: "visa-assistance", title: "Visa Assistance", icon: "FileCheck",
    description: "Step-by-step guidance through Kenya's eVisa and regional travel requirements.",
    longDescription: "Our team simplifies the paperwork, guiding you through the Kenyan eVisa process and any regional permits, so your entry is smooth and worry-free.",
    features: ["eVisa guidance", "Document checklists", "Regional permits", "Entry requirement updates", "Personal support"] },
  { id: "s5", slug: "group-tours", title: "Group Tours", icon: "Users",
    description: "Seamless logistics and exclusive experiences for groups of all sizes.",
    longDescription: "Whether it's an extended family, a special-interest club or a large reward programme, we manage every detail of group travel, from flights to exclusive-use camps.",
    features: ["Groups of all sizes", "Exclusive-use options", "Dedicated coordinator", "Custom itineraries", "Special-interest themes"] },
  { id: "s6", slug: "honeymoon-packages", title: "Honeymoon Packages", icon: "Heart",
    description: "Romantic bush-and-beach escapes with thoughtful, surprise-and-delight touches.",
    longDescription: "We design honeymoons that balance adventure and indulgence — private game drives, candle-lit dinners, beach villas and the special touches that make the trip unforgettable.",
    features: ["Bush-to-beach journeys", "Private experiences", "Romantic touches", "Couples spa & dining", "Complete privacy"] },
  { id: "s7", slug: "corporate-travel", title: "Corporate Travel", icon: "Briefcase",
    description: "Incentive trips, retreats and conferences delivered with corporate precision.",
    longDescription: "From leadership retreats to large incentive programmes, we deliver turnkey corporate travel with conference facilities, team-building, branding and a dedicated event manager.",
    features: ["Incentive & reward trips", "Conference facilities", "Team-building experiences", "Dedicated event manager", "Branded touches"] },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
