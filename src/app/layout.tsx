import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Westchester News Today - Local News for Westchester County, NY",
    template: "%s - Westchester News Today",
  },
  description:
    "Your trusted source for breaking news, local government, education, business and community news in Westchester County, New York.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://westchesternewstoday.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Westchester News Today",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
