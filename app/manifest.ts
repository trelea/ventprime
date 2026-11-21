import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VentPrime — Natural ventilation in Moldova",
    short_name: "VentPrime",
    description:
      "Design and installation of natural ventilation systems in Chisinau and across Moldova.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00B5A4",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
