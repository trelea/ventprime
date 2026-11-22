import { handleContactRequest } from "@/lib/contact";

/** Detailed form in the Contacts section. */
export function POST(request: Request) {
  return handleContactRequest(request, {
    source: "contacts-page",
    subject: (name) => `New consultation request — ${name}`,
    extraFields: (payload) => [
      ["City", payload.city],
      ["Problem(s)", payload.problem],
      ["Service(s)", payload.service],
    ],
  });
}
