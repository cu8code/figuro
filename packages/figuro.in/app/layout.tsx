import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Figuro Agency - Workflow Automation Experts",
    template: "%s | Figuro Agency",
  },
  description:
    "Figuro Agency specializes in custom n8n workflows, AI-powered automation, and seamless integrations. Streamline your processes and boost productivity with our expertise.",
  keywords: [
    "Figuro Agency",
    "workflow automation",
    "n8n automation",
    "AI-powered automation",
    "custom workflows",
    "automation experts",
  ],
  authors: [{ name: "Figuro Agency", url: "https://www.figuro.in" }],
  openGraph: {
    title: "Figuro Agency - Workflow Automation Experts",
    description:
      "Figuro Agency specializes in custom n8n workflows, AI-powered automation, and seamless integrations. Streamline your processes and boost productivity with our expertise.",
    type: "website",
    url: "https://www.figuro.in",
    siteName: "Figuro Agency",
    images: [
      {
        url: "https://www.figuro.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Figuro Agency - Workflow Automation Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Figuro Agency - Workflow Automation Experts",
    description:
      "Figuro Agency specializes in custom n8n workflows, AI-powered automation, and seamless integrations. Streamline your processes and boost productivity with our expertise.",
    images: ["https://www.figuro.in/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://www.figuro.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.figuro.in" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
