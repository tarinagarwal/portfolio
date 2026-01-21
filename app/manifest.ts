import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tarin Agarwal - Full-Stack Developer & Game Developer",
    short_name: "Tarin Agarwal",
    description:
      "Portfolio of Tarin Agarwal - Full-Stack Developer & Game Developer specializing in React, Next.js, Unreal Engine 5, and AI/ML solutions",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/image.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/image.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["portfolio", "developer", "technology"],
    lang: "en-US",
    dir: "ltr",
  };
}
