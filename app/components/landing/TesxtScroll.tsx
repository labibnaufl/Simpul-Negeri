'use client'
import { motion } from "framer-motion";

export const TextScroll = () => (
  <div className="py-8 md:py-12 bg-blue-50  relative">
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
      }}
    >
      <motion.div
        animate={{
          x: ["0%", "-100%"], 
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex whitespace-nowrap text-yellow-400 text-3xl font-extrabold"
      >
        <span className="mr-8">
          {Array(20).fill("JOIN US! ").join("")}
        </span>
        <span className="mr-8">
          {Array(20).fill("JOIN US! ").join("")}
        </span>
        <span className="mr-8">
          {Array(20).fill("JOIN US! ").join("")}
        </span>
      </motion.div>
    </div>
  </div>
);
