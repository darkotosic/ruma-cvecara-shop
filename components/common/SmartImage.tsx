import Image, { ImageProps } from "next/image";

export type SmartImageProps = Omit<ImageProps, "loader"> & {
  variant?: "hero" | "grid" | "card";
};

const variantSizes: Record<NonNullable<SmartImageProps["variant"]>, string> = {
  hero: "(min-width: 1280px) 1200px, (min-width: 1024px) 960px, 100vw",
  grid: "(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw",
  card: "(min-width: 1280px) 320px, (min-width: 768px) 33vw, 90vw",
};

export default function SmartImage({
  variant = "grid",
  className,
  sizes,
  quality = 85,
  loading,
  ...props
}: SmartImageProps) {
  const mergedClassName = ["h-full w-full object-cover", className].filter(Boolean).join(" ");
  const resolvedSizes = sizes ?? variantSizes[variant];
  const resolvedLoading = loading ?? (variant === "hero" ? "eager" : "lazy");

  return (
    <Image
      {...props}
      className={mergedClassName}
      quality={quality}
      sizes={resolvedSizes}
      loading={resolvedLoading}
      priority={props.priority ?? variant === "hero"}
    />
  );
}
