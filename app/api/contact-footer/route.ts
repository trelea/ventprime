import { handleContactRequest } from "@/lib/contact";

/** Compact form in the site footer. */
export function POST(request: Request) {
  return handleContactRequest(request, {
    source: "footer-form",
    kind: "footer",
    extraFields: () => [],
  });
}
