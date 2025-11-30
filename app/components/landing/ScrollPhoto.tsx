"use client";
import { useRef, useState, useEffect, useCallback, FC, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Tipe untuk data kartu
interface CardData {
  id: number;
  image: string;
  tag: string;
  title: string;
  description: string;
  alt?: string;
}

// Tipe untuk props komponen ScrollCard
interface ScrollCardProps {
  card: CardData;
  index: number;
  cardClassName?: string;
  tagClassName?: string;
  imageClassName?: string;
}

// Komponen kartu yang di-memoized
const ScrollCard: FC<ScrollCardProps> = memo(
  ({ card, index, cardClassName, tagClassName, imageClassName }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <div
        className={`scroll-card absolute w-full h-full rounded-lg overflow-hidden ${cardClassName}`}
      >
        {/* Tag (di pojok) */}
        <div
          className={`absolute top-4 left-4 px-3 py-2 rounded-lg bg-yellow-600 z-10 ${tagClassName}`}
        >
          <p className="font-mono text-xs antialiased font-semibold leading-none uppercase text-white">
            {card.tag}
          </p>
        </div>

        <div className="relative w-full h-full">
          {/* Gambar Latar Belakang */}
          <Image
            src={card.image}
            alt={card.alt || card.title || ""}
            fill
            sizes="(max-width: 768px) 95vw, 50vw"
            className={`object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${imageClassName}`}
            onLoad={() => setIsLoaded(true)}
            priority={index < 2}
            quality={85}
          />

          {/* Overlay Teks di Tengah */}
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-t from-black/70 via-black/40 to-black/70">
            <div className="flex flex-col items-center text-center text-white gap-y-2 md:gap-y-3">
              {/* Teks Judul Utama */}
              <h2 className="text-3xl font-bold md:text-5xl drop-shadow-lg">
                {card.title}
              </h2>
              {/* Teks Deskripsi */}
              <p className="max-w-md text-sm font-light md:text-base opacity-90">
                {card.description}
              </p>
            </div>
          </div>

          {/* Placeholder Loading */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 animate-pulse">
              <div className="w-8 h-8 border-2 border-yellow-600 rounded-full border-t-transparent animate-spin" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

ScrollCard.displayName = "ScrollCard";

// Data untuk foto scroll - SESUAIKAN DENGAN KONTEN KAMU
const CARDS_DATA: CardData[] = [
  {
    id: 1,
    image: "/images/volunteer-1.jpg", // Ganti dengan path foto kamu
    tag: "Aksi 1",
    title: "Gotong Royong Bersama",
    description:
      "Bergabunglah dalam kegiatan gotong royong membersihkan lingkungan.",
  },
  {
    id: 2,
    image: "/images/volunteer-2.jpg",
    tag: "Aksi 2",
    title: "Berbagi dengan Sesama",
    description:
      "Membantu mereka yang membutuhkan dengan berbagi makanan dan pakaian.",
  },
  {
    id: 3,
    image: "/images/volunteer-3.jpg",
    tag: "Aksi 3",
    title: "Pendidikan untuk Semua",
    description:
      "Memberikan bimbingan belajar gratis untuk anak-anak kurang mampu.",
  },
  {
    id: 4,
    image: "/images/volunteer-4.jpg",
    tag: "Aksi 4",
    title: "Penghijauan Kota",
    description:
      "Menanam pohon untuk lingkungan yang lebih hijau dan asri.",
  },
];

interface ScrollPhotoProps {
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  tagClassName?: string;
  imageClassName?: string;
  height?: string;
  containerSize?: string;
  disabled?: boolean;
  threshold?: number;
}

export default function ScrollPhoto({
  className = "",
  containerClassName = "",
  cardClassName = "",
  tagClassName = "",
  imageClassName = "",
  height = "h-screen",
  containerSize = "w-[95%] h-[60%] lg:w-1/2 lg:h-1/2",
  disabled = false,
  threshold = 0.1,
}: ScrollPhotoProps) {
  const container = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimationsEnabled(!mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) =>
      setAnimationsEnabled(!e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (disabled || !animationsEnabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "50px" }
    );
    if (container.current) {
      observer.observe(container.current);
    }
    return () => observer.disconnect();
  }, [disabled, animationsEnabled, threshold]);

  const setupAnimations = useCallback(() => {
    if (!isVisible || disabled || !animationsEnabled || !container.current)
      return;

    gsap.registerPlugin(ScrollTrigger);

    const cardElements =
      container.current.querySelectorAll<HTMLDivElement>(".scroll-card");
    const totalCards = cardElements.length;

    if (totalCards === 0) return;

    requestAnimationFrame(() => {
      gsap.set(cardElements[0], {
        y: "0%",
        scale: 1,
        rotation: 0,
        willChange: "transform",
      });
      for (let i = 1; i < totalCards; i++) {
        gsap.set(cardElements[i], {
          y: "100%",
          scale: 1,
          rotation: 0,
          willChange: "transform",
        });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        scrollTimeline
          .to(
            cardElements[i],
            { scale: 0.5, rotation: 10, duration: 1, ease: "none" },
            i
          )
          .to(cardElements[i + 1], { y: "0%", duration: 1, ease: "none" }, i);
      }

      return () => {
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === container.current) {
            trigger.kill();
          }
        });
        gsap.set(cardElements, { willChange: "auto" });
      };
    });
  }, [isVisible, disabled, animationsEnabled]);

  useGSAP(setupAnimations, {
    scope: container,
    dependencies: [isVisible, CARDS_DATA.length, disabled, animationsEnabled],
  });

  if (disabled && !isVisible) {
    return null;
  }

  return (
    <section
      className={`scroll-cards-section relative w-full ${height} bg-gradient-to-br from-yellow-50 to-blue-50 overflow-hidden flex flex-col justify-center items-center ${className}`}
      ref={container}
      style={{
        contain: "layout style paint",
        transform: "translate3d(0,0,0)",
      }}
    >
      <div className="px-4 mb-8 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Aksi Nyata{" "}
          <span className="text-yellow-400">Relawan</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 md:text-xl">
          Lihat berbagai kegiatan volunteer yang telah membuat dampak positif
        </p>
      </div>

      <div
        className={`scroll-cards-container mb-8 relative ${containerSize} rounded-lg overflow-hidden shadow-2xl ${containerClassName}`}
      >
        {CARDS_DATA.map((card, index) => (
          <ScrollCard
            key={card.id}
            card={card}
            index={index}
            cardClassName={cardClassName}
            tagClassName={tagClassName}
            imageClassName={imageClassName}
          />
        ))}
      </div>
    </section>
  );
}