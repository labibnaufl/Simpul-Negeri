'use client';

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link';
import { useState } from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-20 bg-transparent backdrop-blur-sm">
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

            {/* Auth Section - Desktop */}
            <div className="ml-4">
              {loading ? (
                // Loading state
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg" />
              ) : user ? (
                // User logged in - show dropdown menu
                <>
                  {/* Menu untuk user yang sudah login */}
                  {/* <Button variant="ghost" asChild className="mr-2">
                    <Link href="/my-registrations">Pendaftaran Saya</Link>
                  </Button> */}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <User className="h-4 w-4" />
                        {user.fullName}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Profil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/my-registrations" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Pendaftaran Saya
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Keluar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                // User not logged in - show login/register buttons
                <div className="flex items-center gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/auth/login">Masuk</Link>
                  </Button>
                  <Button asChild className="bg-black hover:bg-gray-700">
                    <Link href="/auth/register">Daftar</Link>
                  </Button>
                </div>
              )}
            </div>
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
                  {/* User Info - Mobile */}
                  {user && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-gray-500">Halo,</p>
                      <p className="font-semibold text-gray-900">{user.fullName}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  )}

                  {/* Navigation Links */}
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

                  {/* Authenticated Links - Mobile */}
                  {user && (
                    <>
                      <div className="border-t pt-4">
                        <Button
                          variant="ghost"
                          className="justify-start w-full"
                          asChild
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Link href="/my-registrations">Pendaftaran Saya</Link>
                        </Button>

                        <Button
                          variant="ghost"
                          className="justify-start w-full"
                          asChild
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Link href="/profile">Profil</Link>
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Auth Buttons - Mobile */}
                  {loading ? (
                    <div className="h-10 bg-gray-200 animate-pulse rounded-lg" />
                  ) : user ? (
                    <Button
                      variant="destructive"
                      className="justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Keluar
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="justify-start"
                        asChild
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Link href="/auth/login">Masuk</Link>
                      </Button>

                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        asChild
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Link href="/auth/register">Daftar</Link>
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}