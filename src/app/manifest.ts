import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OneMusic",
    short_name: "OneMusic",
    description: "Dengarkan musik favoritmu dengan pengalaman player yang imersif.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    orientation: "portrait-primary",
    lang: "id",
    categories: ["music", "entertainment"],
    icons: [
      {
        src: "/onemusic.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/onemusic.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
