import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import './globals.css';
import Footer from './components/footer';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
});

export const metadata: Metadata = {
  title: 'Is My Card Leaked?',
  description: 'Check if your credit card number is leaked in a hacker database',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansThai.className} antialiased min-h-screen flex flex-col`}>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
