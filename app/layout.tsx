import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

export const metadata: Metadata = {
  title: 'Simpul Negeri',
  description: 'Platform relawan Indonesia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}