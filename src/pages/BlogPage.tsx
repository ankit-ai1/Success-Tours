import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Page from "@/components/common/Page";
import SEO from "@/seo/SEO";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import BlogCard from "@/components/cards/BlogCard";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import { blogs, blogCategories } from "@/data/blogs";
import { formatDate } from "@/utils/format";
import { IMG } from "@/data/images";
import { cn } from "@/utils/cn";

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const featured = blogs[0];
  const categories = ["All", ...blogCategories];

  const rest = useMemo(() => {
    const pool = blogs.slice(1);
    return category === "All" ? pool : pool.filter((b) => b.category === category);
  }, [category]);

  return (
    <Page>
      <SEO
        title="Travel Blog & Kenya Safari Guides"
        description="Expert Kenya travel tips, safari guides, wildlife stories and itinerary inspiration from the Success Tours team. Plan smarter and travel deeper."
        path="/blog"
      />
      <PageHero
        eyebrow="Travel journal"
        title="The Blog"
        subtitle="Guides, tips and tales from the field to inspire and inform your Kenyan adventure."
        image={IMG.acaciaSunset}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          {/* Featured post */}
          <Link to={`/blog/${featured.slug}`} className="group grid grid-cols-1 overflow-hidden rounded-xl border border-sand-200 shadow-soft lg:grid-cols-2">
            <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
              <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center bg-sand p-8 lg:p-12">
              <Badge tone="accent" className="self-start">{featured.category}</Badge>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-primary transition group-hover:text-secondary sm:text-3xl">{featured.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{featured.description}</p>
              <div className="mt-5 flex items-center gap-4 text-xs text-muted">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(featured.date)}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">Read article <ArrowRight className="h-4 w-4" /></span>
            </div>
          </Link>

          {/* Category filter */}
          <div className="mt-14 mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className={cn("rounded-full px-4 py-2 text-sm font-medium transition", category === c ? "bg-primary text-white" : "bg-sand-200 text-primary hover:bg-sand-300")}>
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          {rest.length > 0 ? (
            <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((b) => <StaggerItem key={b.id}><BlogCard post={b} /></StaggerItem>)}
            </Stagger>
          ) : (
            <p className="py-12 text-center text-muted">No articles in this category yet.</p>
          )}
        </Container>
      </section>
    </Page>
  );
}
