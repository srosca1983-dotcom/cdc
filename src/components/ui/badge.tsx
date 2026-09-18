import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase",
  {
    variants: {
      variant: {
        cdc: "bg-cdc text-primary-foreground",
        review: "bg-review text-primary-foreground",
        ok: "bg-ok-soft text-ok",
        residue: "bg-residue text-primary-foreground",
        muted: "bg-surface-2 text-muted",
        navy: "bg-navy text-primary-foreground",
      },
    },
    defaultVariants: { variant: "muted" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
