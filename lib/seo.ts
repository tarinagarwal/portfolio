// SEO Configuration and Utilities
export const siteConfig = {
  name: "Tarin Agarwal",
  title: "Tarin Agarwal | Full-Stack Developer & Game Developer",
  description:
    "Full-Stack Developer & Game Developer specializing in React, Next.js, Node.js, Unreal Engine 5, and AI/ML solutions. Building scalable web applications and immersive gaming experiences in Bangalore, India.",
  url: "https://tarinagarwal.in",
  ogImage: "https://tarinagarwal.in/image.png",
  keywords: [
    "Tarin Agarwal",
    "Full-Stack Developer",
    "Game Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Unreal Engine Developer",
    "AI ML Developer",
    "Web Developer Bangalore",
    "Game Developer India",
    "TypeScript Developer",
    "MongoDB Developer",
    "AWS Developer",
    "Unity Developer",
    "React Native Developer",
  ],
  author: {
    name: "Tarin Agarwal",
    email: "tarinagarwal@gmail.com",
    url: "https://tarinagarwal.in",
  },
  creator: "Tarin Agarwal",
  publisher: "Tarin Agarwal",
  locale: "en_US",
  type: "website",
};

// JSON-LD Schema for Person
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tarin Agarwal",
  url: "https://tarinagarwal.in",
  image: "https://tarinagarwal.in/image.png",
  jobTitle: "Full-Stack Developer & Game Developer",
  description:
    "Full-Stack Developer & Game Developer specializing in React, Next.js, Unreal Engine 5, and AI/ML solutions",
  email: "tarinagarwal@gmail.com",
  telephone: "+91-9352023583",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "BMS Institute of Technology",
  },
  sameAs: [
    "https://github.com/tarinagarwal",
    "https://linkedin.com/in/tarin-agarwal-810793267",
    "https://www.instagram.com/tarinagarwal",
  ],
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Unreal Engine 5",
    "Unity",
    "Game Development",
    "Web Development",
    "AI/ML",
    "MongoDB",
    "PostgreSQL",
    "AWS",
  ],
};

// JSON-LD Schema for Website
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tarin Agarwal Portfolio",
  url: "https://tarinagarwal.in",
  description:
    "Portfolio of Tarin Agarwal - Full-Stack Developer & Game Developer",
  author: {
    "@type": "Person",
    name: "Tarin Agarwal",
  },
  inLanguage: "en-US",
};

// JSON-LD Schema for Professional Service
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tarin Agarwal - Software Development Services",
  image: "https://tarinagarwal.in/image.png",
  "@id": "https://tarinagarwal.in",
  url: "https://tarinagarwal.in",
  telephone: "+91-9352023583",
  email: "tarinagarwal@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

// Generate metadata for pages
export function generateMetadata({
  title,
  description,
  image,
  url,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}) {
  const metaTitle = title ? `${title} | Tarin Agarwal` : siteConfig.title;
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaUrl = url || siteConfig.url;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: siteConfig.keywords,
    authors: [siteConfig.author],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: metaUrl,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: "@tarinagarwal",
    },
    robots: noIndex ? "noindex,nofollow" : "index,follow",
    verification: {
      google: "nBJaTsMhyeH9150bAwZI_VtK0bQpT70tQX72nUzAnGw",
    },
  };
}
