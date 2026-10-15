import type { Metadata } from "next";
import {
  ServicePage,
  generateServiceMetadata,
} from "@/components/pages/service-page";

export async function generateMetadata(): Promise<Metadata> {
  return generateServiceMetadata("ventilatie-pasiva");
}

export default function Page() {
  return <ServicePage service="ventilatie-pasiva" />;
}
