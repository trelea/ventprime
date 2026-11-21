type JsonLdProps = {
  value: Record<string, unknown>;
};

/** Per Next.js docs: escape `<` so a string cannot break out of the script. */
export function JsonLd({ value }: JsonLdProps) {
  const json = JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
