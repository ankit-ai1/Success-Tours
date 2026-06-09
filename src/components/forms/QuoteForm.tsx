import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { destinations } from "@/data/destinations";

const budgets = [
  "Under $1,500 pp",
  "$1,500 – $3,000 pp",
  "$3,000 – $5,000 pp",
  "$5,000 – $8,000 pp",
  "$8,000+ pp",
];

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(6, "Please enter a contact number"),
  country: z.string().min(2, "Please enter your country"),
  travelers: z.string().min(1, "Required"),
  travelDate: z.string().min(1, "Please choose an approximate date"),
  destination: z.string().min(1, "Please select a destination"),
  budget: z.string().min(1, "Please select a budget"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function QuoteForm({ defaultDestination }: { defaultDestination?: string }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { destination: defaultDestination ?? "" },
  });

  const onSubmit = async (_data: FormValues) => {
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 7000);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-secondary/30 bg-secondary/5 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-secondary" />
        <h3 className="mt-4 font-display text-2xl font-bold text-primary">Request received!</h3>
        <p className="mt-2 max-w-md text-sm text-muted">
          Thank you. Our travel designers are already reviewing your request and will send a tailored,
          no-obligation proposal within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label">Full Name</label>
          <input className="input-field" placeholder="Jane Doe" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-accent-dark">{errors.name.message}</p>}
        </div>
        <div>
          <label className="field-label">Email Address</label>
          <input className="input-field" placeholder="jane@example.com" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-accent-dark">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label">Phone Number</label>
          <input className="input-field" placeholder="+1 555 000 0000" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-accent-dark">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="field-label">Country</label>
          <input className="input-field" placeholder="United States" {...register("country")} />
          {errors.country && <p className="mt-1 text-xs text-accent-dark">{errors.country.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label className="field-label">No. of Travelers</label>
          <input type="number" min={1} className="input-field" placeholder="2" {...register("travelers")} />
          {errors.travelers && <p className="mt-1 text-xs text-accent-dark">{errors.travelers.message}</p>}
        </div>
        <div>
          <label className="field-label">Travel Date</label>
          <input type="date" className="input-field" {...register("travelDate")} />
          {errors.travelDate && <p className="mt-1 text-xs text-accent-dark">{errors.travelDate.message}</p>}
        </div>
        <div>
          <label className="field-label">Budget (pp)</label>
          <select className="input-field" {...register("budget")}>
            <option value="">Select budget</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && <p className="mt-1 text-xs text-accent-dark">{errors.budget.message}</p>}
        </div>
      </div>

      <div>
        <label className="field-label">Preferred Destination</label>
        <select className="input-field" {...register("destination")}>
          <option value="">Select destination</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
          <option value="Multiple / Not sure yet">Multiple / Not sure yet</option>
        </select>
        {errors.destination && <p className="mt-1 text-xs text-accent-dark">{errors.destination.message}</p>}
      </div>

      <div>
        <label className="field-label">Tell us about your dream trip (optional)</label>
        <textarea rows={4} className="input-field resize-none" placeholder="Special occasions, interests, must-sees, pace…" {...register("message")} />
      </div>

      <Button type="submit" variant="secondary" size="lg" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Request My Free Quote"} <ArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-center text-xs text-muted">
        No payment required. We typically respond within 24 hours.
      </p>
    </form>
  );
}
