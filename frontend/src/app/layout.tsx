// ============================================================================
// HealthSphere AI — Root Layout
// Production-grade Next.js App Router layout with metadata and providers
// ============================================================================

import type { Metadata, Viewport } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'HealthSphere AI | Intelligence for a Healthier Life',
    template: '%s | HealthSphere AI',
  },
  description:
    'HealthSphere AI is an enterprise healthcare platform combining clinical intelligence, telemedicine, AI-powered diagnostics, and physiotherapy tracking for modern medical practices.',
  keywords: [
    'healthcare',
    'telemedicine',
    'AI diagnostics',
    'patient management',
    'doctor dashboard',
    'physiotherapy',
    'medical records',
    'video consultation',
  ],
  authors: [{ name: 'HealthSphere AI Team' }],
  creator: 'HealthSphere AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://healthsphere.ai',
    siteName: 'HealthSphere AI',
    title: 'HealthSphere AI | Intelligence for a Healthier Life',
    description: 'Enterprise healthcare platform with AI-powered diagnostics and telemedicine.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HealthSphere AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthSphere AI',
    description: 'Enterprise healthcare platform with AI-powered diagnostics.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#003d9b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--on-surface)] font-[var(--font-body)] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--primary)] focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
