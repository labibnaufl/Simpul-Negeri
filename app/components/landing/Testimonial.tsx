import Image from "next/image";
import { twMerge } from "tailwind-merge";

// Data testimonial - SESUAIKAN dengan testimoni volunteer kamu
const testimonials = [
  {
    text: "Bergabung dengan SimpulNegeri membuka mata saya bahwa perubahan dimulai dari aksi kecil. Saya merasa lebih dekat dengan masyarakat.",
    imageSrc: "/image/testimonial-1.jpg", // Ganti dengan foto asli
    name: "Rina Susanti",
    username: "@rinasus",
    role: "Volunteer 2024"
  },
  {
    text: "Program pendidikan anak yang saya ikuti sangat terstruktur. Melihat senyum anak-anak saat belajar adalah hadiah terbesar.",
    imageSrc: "/image/testimonial-2.jpg",
    name: "Budi Prakoso",
    username: "@budipra",
    role: "Relawan Pendidikan"
  },
  {
    text: "Menjadi volunteer bukan hanya memberi, tapi juga menerima. Saya belajar banyak hal berharga tentang empati dan kebersamaan.",
    imageSrc: "/image/testimonial-3.jpg",
    name: "Siti Nurhaliza",
    username: "@sitinur",
    role: "Volunteer Kesehatan"
  },
  {
    text: "Koordinasi tim yang solid membuat setiap event berjalan lancar. Senang bisa berkontribusi untuk lingkungan yang lebih baik.",
    imageSrc: "/image/testimonial-4.jpg",
    name: "Ahmad Hidayat",
    username: "@ahmadh",
    role: "Relawan Lingkungan"
  },
  {
    text: "Dari yang awalnya ragu, sekarang saya aktif di berbagai kegiatan. SimpulNegeri memberikan platform yang sempurna untuk berkontribusi.",
    imageSrc: "/image/testimonial-5.jpg",
    name: "Dewi Lestari",
    username: "@dewiles",
    role: "Volunteer Aktif"
  },
  {
    text: "Event bersih-bersih pantai membuat saya sadar pentingnya menjaga alam. Terima kasih SimpulNegeri sudah memfasilitasi!",
    imageSrc: "/image/testimonial-6.jpg",
    name: "Fajar Ramadhan",
    username: "@fajarram",
    role: "Relawan Alam"
  },
];

const firstCol = testimonials.slice(0, 2);
const secondCol = testimonials.slice(2, 4);
const thirdCol = testimonials.slice(4, 6);

type Testimonial = {
  text: string;
  imageSrc: string;
  name: string;
  username: string;
  role: string;
};

type TestiColumnProps = {
  className?: string;
  testimonials: Testimonial[];
};

const TestiColumn = (props: TestiColumnProps) => (
  <div
    className={twMerge(
      "flex flex-col gap-6 pb-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
      props.className
    )}
  >
    {props.testimonials.map(({ text, imageSrc, name, username, role }, index) => (
      <div
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
        key={index}
      >
        <div className="text-gray-700 leading-relaxed mb-4">{text}</div>
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
            <Image
              src={imageSrc}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-gray-900 font-semibold text-sm">{name}</div>
            <div className="text-gray-500 text-xs">{role}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function Testimonial() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
            Testimonial
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
            Kata Mereka Tentang{" "}
            <span className="text-blue-500">Simpul Negeri</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ribuan volunteer telah merasakan dampak positif dari bergabung bersama kami
          </p>
        </div>

        {/* Testimonial Columns */}
        <div className="flex justify-center gap-6 max-h-[600px] overflow-hidden">
          <TestiColumn testimonials={firstCol} className="animate-scroll-up" />
          <TestiColumn
            testimonials={secondCol}
            className="hidden md:flex animate-scroll-down"
          />
          <TestiColumn
            testimonials={thirdCol}
            className="hidden lg:flex animate-scroll-up"
          />
        </div>
      </div>
    </section>
  );
}