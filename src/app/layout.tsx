import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ＹＡＮÈＬＬＥ",
    template: "%s · ＹＡＮÈＬＬＥ",
  },
  description:
    "Quiet luxury — women's bags, clothing and accessories. ＹＡＮÈＬＬＥ.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${serif.variable} ${sans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
