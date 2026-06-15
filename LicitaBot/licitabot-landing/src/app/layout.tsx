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
  title: "LicitaBot AI | Gana Licitaciones Públicas en LATAM vía WhatsApp",
  description: "Inteligencia Artificial que escanea diariamente los boletines oficiales de Paraguay, Perú y República Dominicana. Recibe alertas curadas directamente en tu WhatsApp.",
  keywords: [
    "licitaciones",
    "compras publicas",
    "contrataciones del estado",
    "paraguay dncp",
    "peru seace",
    "republica dominicana compras dominicanas",
    "alertas whatsapp",
    "inteligencia artificial licitaciones"
  ],
  authors: [{ name: "LicitaBot Team", url: "https://busca.software" }],
  openGraph: {
    title: "LicitaBot AI | Gana Licitaciones Públicas en LATAM",
    description: "Monitoreamos DNCP, SEACE y Boletines del Estado de forma inteligente. Alertas de negocio enviadas a tu WhatsApp en tiempo real.",
    url: "https://busca.software",
    siteName: "LicitaBot AI",
    locale: "es_LA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LicitaBot AI | Gana Licitaciones Públicas en LATAM",
    description: "Monitoreo inteligente 24/7 y alertas a tu WhatsApp de licitaciones públicas aptas para tu empresa.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans antialiased text-brand-dark bg-white">
        {children}
      </body>
    </html>
  );
}
