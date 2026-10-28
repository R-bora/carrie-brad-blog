import type { Metadata } from 'next';
import { Playfair_Display, Montserrat, Italianno, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const italianno = Italianno({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italianno',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gainleadx | Independent Investigative Journalism & Controversial UK Debates',
  description:
    'Gainleadx — Unfiltered investigative inquests, forensic reporting, and deep-dive exposés on Britain’s most contentious political, economic, and institutional debates.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${italianno.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-white text-neutral-900 selection:bg-[#e8dfd8] selection:text-neutral-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
