import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={cn("section", className)}>
      <div className={cn("container-x", containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span className="eyebrow">
        {index ? `${index} — ${eyebrow}` : eyebrow}
      </span>
      <h2 className="display-sm max-w-[18ch]">{title}</h2>
      {description && (
        <p className={cn("lede", align === "center" && "mx-auto text-center")}>
          {description}
        </p>
      )}
    </div>
  );
}
