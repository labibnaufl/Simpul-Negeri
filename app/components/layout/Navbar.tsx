'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 backdrop-blur-sm z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold transition flex items-center">
            <span className="text-yellow-400 hover:text-yellow-600">Simpul</span>
            <span className="text-blue-800 hover:text-blue-600 ml-1">Negeri</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link href="/">Beranda</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/events">Event</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/gallery">Galeri</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/about">Tentang</Link>
            </Button>
            
            <Button asChild className="ml-4 bg-black hover:bg-gray-700">
              <Link href="/auth/login">Masuk</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col space-y-4 mt-6">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/">Beranda</Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/events">Event</Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/gallery">Galeri</Link>
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/about">Tentang</Link>
                  </Button>

                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/auth/login">Masuk</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}