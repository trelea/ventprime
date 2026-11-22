import { handleContactRequest } from "@/lib/contact";

/** Detailed form in the Contacts section. */
export function POST(request: Request) {
  return handleContactRequest(request, {
    source: "contacts-page",
    kind: "contacts",
    extraFields: (payload) => [
      ["city", payload.city],
      ["problems", payload.problem],
      ["services", payload.service],
    ],
  });
}
