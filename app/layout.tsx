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
  title: 'Gainleadx | Digital Marketing, Strategy & Lifestyle Editorial',
  description:
    'Gainleadx - Stay up to date on tips, tricks, & trends for social media, digital marketing, and lead acquisition. Editorial publication.',
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
