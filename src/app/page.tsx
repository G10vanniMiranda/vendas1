"use client"
import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-5xl">Home</h1>

      <div className="flex flex-col md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: .5 }}
          className="w-[100%] h-[600]
          flex items-center justify-center
          "
        >
          <Image
            src="/bank-home.jpg"
            alt="Vercel Logo"
            width={300} height={300}
            className="flex-1"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: .5 }}
        >
          <h3>Projeto construindo um Bank Online</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: .5 }}
          className="w-[100%] h-[600]
          flex items-center justify-center
          "
        >
          <Image
            src="/bank-login.jpg"
            alt="Vercel Logo"
            width={300} height={300}
            className="flex-1"
          />
        </motion.div>
      </div>

    </div>
  );
}
