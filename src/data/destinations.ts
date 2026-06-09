import type { Destination } from "@/types";
import { IMG } from "./images";

export const destinations: Destination[] = [
  {
    id: "d1",
    slug: "maasai-mara",
    name: "Maasai Mara",
    region: "Rift Valley",
    tagline: "The theatre of the Great Migration",
    description:
      "Kenya's crown jewel — endless golden plains where lions, leopards and cheetahs roam and over a million wildebeest thunder across the Mara River.",
    longDescription:
      "The Maasai Mara National Reserve is the northern extension of Tanzania's Serengeti and arguably the finest big-cat country on Earth. Between July and October the reserve hosts the dramatic river crossings of the Great Migration, while year-round game viewing delivers the full Big Five. Stay in tented camps perched above the Mara River, share sundowners on the savanna and meet the Maasai communities whose stewardship has protected this wilderness for generations.",
    image: IMG.savanna,
    gallery: [IMG.elephants, IMG.lion, IMG.wildebeest, IMG.safariJeep, IMG.acaciaSunset],
    activities: ["Big Five game drives", "Hot-air balloon safari", "Great Migration river crossings", "Maasai village visit", "Bush dining & sundowners"],
    bestTime: "July – October (migration); January – March (calving & big cats)",
    highlights: ["Annual wildebeest migration", "Highest lion density in Africa", "Balloon safaris at dawn", "Authentic Maasai culture"],
    relatedPackages: ["luxury-maasai-mara-safari", "great-migration-explorer", "mara-balloon-romance"],
  },
  {
    id: "d2",
    slug: "amboseli",
    name: "Amboseli",
    region: "Kajiado County",
    tagline: "Elephants beneath Kilimanjaro",
    description:
      "Vast elephant herds framed by the snow-capped peak of Mount Kilimanjaro — the most iconic backdrop in African photography.",
    longDescription:
      "Amboseli National Park is famous for its free-ranging elephant herds and uninterrupted views of Mount Kilimanjaro rising across the border in Tanzania. The park's swamps, fed by Kilimanjaro's meltwater, draw concentrations of wildlife to compact, photographer-friendly plains. It is one of the best places on the continent to observe and study elephants up close, and the golden light at dawn and dusk is the stuff of legend.",
    image: IMG.kilimanjaro,
    gallery: [IMG.elephantClose, IMG.kilimanjaro, IMG.elephants, IMG.acaciaSunset],
    activities: ["Elephant-focused game drives", "Kilimanjaro photography", "Observation Hill walks", "Cultural Maasai bomas", "Birdwatching at the swamps"],
    bestTime: "June – October & January – February (dry, clear Kilimanjaro views)",
    highlights: ["Iconic Kilimanjaro backdrop", "Giant tusker elephants", "Over 400 bird species", "Compact, easy game viewing"],
    relatedPackages: ["amboseli-kilimanjaro-classic", "amboseli-tsavo-discovery", "family-safari-adventure"],
  },
  {
    id: "d3",
    slug: "diani-beach",
    name: "Diani Beach",
    region: "South Coast",
    tagline: "Powder-white sands on the Indian Ocean",
    description:
      "Twelve kilometres of palm-fringed white sand and turquoise water — the perfect bush-to-beach finale or pure tropical escape.",
    longDescription:
      "Repeatedly voted Africa's leading beach destination, Diani Beach stretches along Kenya's south coast with soft coral sand, warm Indian Ocean waters and a fringing reef ideal for snorkelling and diving. Beyond the boutique resorts you'll find the sacred Kaya forests, colobus monkeys, kite-surfing in season and dhow cruises to sandbanks at low tide. It is the classic counterpoint to a safari — barefoot luxury after the dust of the plains.",
    image: IMG.beach,
    gallery: [IMG.beach, IMG.beachAerial, IMG.dhow, IMG.beachResort],
    activities: ["Snorkelling & scuba diving", "Dhow sunset cruises", "Kite-surfing", "Skydiving over the reef", "Colobus monkey sanctuary"],
    bestTime: "October – March (calm seas, ideal diving)",
    highlights: ["Award-winning white-sand beach", "Vibrant coral reef", "Barefoot luxury resorts", "Watersports capital of Kenya"],
    relatedPackages: ["diani-beach-bliss", "bush-and-beach-honeymoon", "mombasa-diani-coastal"],
  },
  {
    id: "d4",
    slug: "nairobi",
    name: "Nairobi",
    region: "Capital City",
    tagline: "The only capital with a national park",
    description:
      "A fast, green capital where lions roam against a skyline backdrop and world-class restaurants meet pioneering conservation.",
    longDescription:
      "Nairobi is the beating heart of East Africa — and the only capital city on Earth bordered by a fully-fledged national park. Here you can watch rhino and lion with skyscrapers on the horizon, cuddle orphaned elephants at the David Sheldrick Wildlife Trust, hand-feed endangered Rothschild giraffes at the Giraffe Centre, and dine in some of the continent's most exciting kitchens. It is the gateway to every Kenyan adventure and a destination in its own right.",
    image: IMG.nairobi,
    gallery: [IMG.nairobi, IMG.giraffe, IMG.elephantClose, IMG.savanna],
    activities: ["Nairobi National Park game drive", "Elephant orphanage visit", "Giraffe Centre", "Karen Blixen Museum", "Local food & art tours"],
    bestTime: "Year-round (pleasant highland climate)",
    highlights: ["Wildlife within the city", "Sheldrick elephant orphanage", "Giraffe Centre encounters", "Gateway to all safaris"],
    relatedPackages: ["nairobi-city-wildlife", "kenya-grand-tour", "family-safari-adventure"],
  },
  {
    id: "d5",
    slug: "tsavo",
    name: "Tsavo",
    region: "Coast & Eastern",
    tagline: "Land of the red elephants",
    description:
      "Kenya's largest wilderness — vast, untamed and famous for its dust-red elephants, lava flows and crystal-clear springs.",
    longDescription:
      "Split into Tsavo East and Tsavo West, this is Kenya's largest protected area and one of the biggest game reserves in the world. Tsavo East offers sweeping savanna and the legendary red elephants that dust themselves in the region's rust-coloured soil; Tsavo West is more dramatic, with the Shetani lava flows, Mzima Springs where hippos glide through clear water, and the Ngulia rhino sanctuary. Remote, wild and uncrowded, Tsavo rewards the adventurous traveller.",
    image: IMG.acaciaSunset,
    gallery: [IMG.acaciaSunset, IMG.elephants, IMG.riftValley, IMG.savanna],
    activities: ["Red-elephant game drives", "Mzima Springs underwater viewing", "Shetani lava flow walks", "Rhino sanctuary visit", "Birding safaris"],
    bestTime: "June – October & January – February (dry season)",
    highlights: ["Iconic red elephants", "Crystal-clear Mzima Springs", "Vast uncrowded wilderness", "Dramatic volcanic scenery"],
    relatedPackages: ["amboseli-tsavo-discovery", "tsavo-wilderness-trail", "mombasa-diani-coastal"],
  },
  {
    id: "d6",
    slug: "lake-nakuru",
    name: "Lake Nakuru",
    region: "Rift Valley",
    tagline: "A pink shoreline of flamingos & rhinos",
    description:
      "A shallow soda lake rimmed with flamingos and a fenced sanctuary protecting both black and white rhino in equal measure.",
    longDescription:
      "Lake Nakuru National Park is a Rift Valley jewel — a shallow alkaline lake whose shores can shimmer pink with flamingos, surrounded by acacia forest and dramatic cliffs. It is one of Kenya's premier rhino sanctuaries, home to healthy populations of both black and white rhino, as well as the rare Rothschild's giraffe, tree-climbing lions and over 450 bird species. Compact and beautiful, it pairs perfectly with the Maasai Mara on a Rift Valley circuit.",
    image: IMG.flamingos,
    gallery: [IMG.flamingos, IMG.riftValley, IMG.giraffes, IMG.lion],
    activities: ["Flamingo & pelican viewing", "Rhino tracking", "Baboon Cliff viewpoint", "Rothschild giraffe spotting", "Makalia Falls walk"],
    bestTime: "Year-round; June – March for the best birdlife",
    highlights: ["Flamingo-pink shoreline", "Black & white rhino sanctuary", "Rare Rothschild's giraffe", "450+ bird species"],
    relatedPackages: ["rift-valley-lakes-safari", "kenya-grand-tour", "great-migration-explorer"],
  },
  {
    id: "d7",
    slug: "samburu",
    name: "Samburu",
    region: "Northern Kenya",
    tagline: "The wild north's special species",
    description:
      "A rugged semi-arid frontier along the Ewaso Ng'iro River, home to wildlife found nowhere else in Kenya's south.",
    longDescription:
      "Samburu National Reserve sits in Kenya's arid north, its life sustained by the palm-lined Ewaso Ng'iro River. The reserve is famed for the 'Samburu Special Five' — Grevy's zebra, reticulated giraffe, Beisa oryx, gerenuk and Somali ostrich — species adapted to this harsh, beautiful landscape and seen almost nowhere else. The proud Samburu people, cousins of the Maasai, add deep cultural richness to a safari that feels genuinely off the beaten track.",
    image: IMG.riftValley,
    gallery: [IMG.riftValley, IMG.giraffes, IMG.zebra, IMG.lodgeTent],
    activities: ["Special Five game drives", "Samburu cultural visits", "River-walks along the Ewaso Ng'iro", "Camel-back excursions", "Night game drives"],
    bestTime: "June – October & December – March (dry season)",
    highlights: ["Samburu Special Five", "Authentic northern culture", "Dramatic river landscapes", "Low-density, exclusive safaris"],
    relatedPackages: ["samburu-northern-frontier", "kenya-grand-tour", "luxury-maasai-mara-safari"],
  },
];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);
