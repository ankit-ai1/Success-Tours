import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";
import Button from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  travelers: z.string().min(1, "Required"),
  date: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

/** Compact inquiry form used on the package details page. */
export default function InquiryForm({ packageName, onSuccess }: { packageName: string; onSuccess?: () => void }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    reset();
    setTimeout(() => {
      setSent(false);
      onSuccess?.();
    }, 3000);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-secondary/30 bg-secondary/5 p-6 text-center">
        <CheckCircle2 className="h-9 w-9 text-secondary" />
        <p className="mt-3 text-sm font-semibold text-primary">Inquiry sent!</p>
        <p className="mt-1 text-xs text-muted">We'll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input type="hidden" value={packageName} readOnly />
      <div>
        <label className="field-label">Name</label>
        <input className="input-field" placeholder="Your name" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-accent-dark">{errors.name.message}</p>}
      </div>
      <div>
        <label className="field-label">Email</label>
        <input className="input-field" placeholder="you@example.com" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-accent-dark">{errors.email.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="field-label">Travelers</label>
          <input type="number" min={1} className="input-field" placeholder="2" {...register("travelers")} />
          {errors.travelers && <p className="mt-1 text-xs text-accent-dark">{errors.travelers.message}</p>}
        </div>
        <div>
          <label className="field-label">Date</label>
          <input type="date" className="input-field" {...register("date")} />
        </div>
      </div>
      <div>
        <label className="field-label">Message</label>
        <textarea rows={3} className="input-field resize-none" placeholder="Questions or special requests…" {...register("message")} />
      </div>
      <Button type="submit" variant="primary" size="md" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send Inquiry"} <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
