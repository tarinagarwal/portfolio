import { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Contact",
  description:
    "Get in touch with Tarin Agarwal for web development, game development, or AI/ML projects. Available for freelance opportunities and collaborations in Bangalore, India.",
  url: "https://tarinagarwal.in/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
