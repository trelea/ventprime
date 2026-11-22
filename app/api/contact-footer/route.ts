import { handleContactRequest } from "@/lib/contact";

/** Compact form in the site footer. */
export function POST(request: Request) {
  return handleContactRequest(request, {
    source: "footer-form",
    subject: (name) => `New footer request — ${name}`,
    extraFields: (payload) => [["Email", payload.email]],
  });
}
