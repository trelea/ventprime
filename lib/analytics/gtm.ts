type GtmPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: GtmPayload[];
  }
}

/** Pushes a custom event into the dataLayer created by the GTM snippet in <head>. */
function pushGtmEvent(event: string, params: GtmPayload = {}) {
  if (typeof window === "undefined") return;
  const dataLayer = (window.dataLayer ??= []);
  dataLayer.push({ event, ...params });
}

export function trackPhoneClick(source: string) {
  pushGtmEvent("phone_click", { source });
}

export function trackLeadFormSubmit(formName: string) {
  pushGtmEvent("lead_form_submit", { form_name: formName });
}
