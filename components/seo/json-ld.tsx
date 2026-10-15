/**
 * Renders a JSON-LD block. Kept as a component so any server component can
 * drop schema onto a page without repeating the `<script>` boilerplate.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      // Serialised server-side; `</script>` is escaped so the payload can
      // never break out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}