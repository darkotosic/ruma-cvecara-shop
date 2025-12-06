export default function SeoSchema({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  if (!data) return null;

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
