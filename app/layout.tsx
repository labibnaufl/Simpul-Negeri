import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthProvider } from '@/lib/auth-context'; 
import ClientLayout from '@/components/ClientLayout';

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
        <ClientLayout>
          <AuthProvider>
            <Navbar />
              <main>{children}</main>
            <Footer />
          </AuthProvider>
         </ClientLayout>
      </body>
    </html>
  );
}