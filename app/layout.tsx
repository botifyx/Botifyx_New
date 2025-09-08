import './globals.css';
import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import StickyConsultButton from '@/components/StickyConsultButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Botifyx - Build fast. Test hard. Ship secure.',
  description: 'Professional web development, testing, and AI/ML solutions. Full-stack development, security testing, chatbots, and more.',
  keywords: 'web development, testing, AI, ML, chatbots, full-stack, security testing, performance testing',
  authors: [{ name: 'Botifyx' }],
  openGraph: {
    title: 'Botifyx - Build fast. Test hard. Ship secure.',
    description: 'Professional web development, testing, and AI/ML solutions.',
    url: 'https://www.botifyx.in',
    siteName: 'Botifyx',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Botifyx - Build fast. Test hard. Ship secure.',
    description: 'Professional web development, testing, and AI/ML solutions.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Botifyx",
              "url": "https://www.botifyx.in",
              "description": "Professional web development, testing, and AI/ML solutions",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://www.botifyx.in/contact"
              }
            })
          }}
        />
      </head>
      <body className="font-inter antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <StickyConsultButton />
      </body>
    </html>
  );
}
