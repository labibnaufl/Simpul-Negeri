import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthProvider } from '@/lib/auth-context'; 

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
        <AuthProvider>
          <Navbar />
            <main>{children}</main>
          <Footer />
         </AuthProvider>
      </body>
    </html>
  );
}