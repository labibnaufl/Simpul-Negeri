"use client";

import { ArrowRight, Heart, Users } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative w-full bg-gradient-to-br from-blue-50 to-yellow-50 overflow-hidden flex flex-col justify-center items-center py-24">
      {/* Decorative Elements */}

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Icon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-6">
            <Heart className="w-4 h-4" />
            <span>Mari Bersama Membuat Perubahan</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-6">
            Bergabunglah dengan{" "}
            <span className="bg-blue-500 text-transparent bg-clip-text">
              Ribuan Relawan
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            Mulai perjalananmu hari ini. Setiap aksi kecil yang kamu lakukan akan membawa dampak besar bagi masyarakat dan lingkungan sekitar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/events"
              className="group bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span>Lihat Event Tersedia</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/register"
              className="group bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              <span>Daftar Sebagai Relawan</span>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">5000+</div>
              <div className="text-gray-600 text-lg">Relawan Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">200+</div>
              <div className="text-gray-600 text-lg">Event Selesai</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-600 text-lg">Kota Terjangkau</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}