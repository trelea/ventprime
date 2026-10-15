import { notFound } from "next/navigation";
import { locale } from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale: override }) => {
  const param = override ?? (await locale());

  if (!hasLocale(routing.locales, param)) notFound();

  return {
    locale: param,
    messages: (await import(`../messages/${param}.json`)).default,
  };
});