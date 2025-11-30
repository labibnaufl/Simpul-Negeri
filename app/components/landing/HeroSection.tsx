import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-overlay.jpg"
          alt="Volunteers in action"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay gradien untuk membuat teks lebih terbaca */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-500 mb-6 drop-shadow-lg">
            Bersama Menginsprasi{' '}
            <span className="text-yellow-400">Bangsa</span>
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Bergabunglah dengan ribuan relawan di seluruh Indonesia untuk membuat dampak positif bagi masyarakat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="bg-yellow-400 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition shadow-lg hover:shadow-xl"
            >
              Lihat Event
            </Link>
            <Link
              href="/about"
              className="bg-white text-yellow-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-yellow-600 hover:bg-yellow-50 transition shadow-lg hover:shadow-xl"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}