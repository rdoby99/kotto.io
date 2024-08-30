import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center md:items-end w-full py-4 px-4 md:px-16 text-secondary-foreground">
      <div className="flex flex-col items-center md:items-start">
        <Image
          src="/logo.png"
          alt="Japanese Reader Homepage"
          height={64}
          width={64}
          className="mb-4"
        />
        <a
          className="hover:opacity-50 font-bold"
          target="_blank"
          href="https://github.com/rdoby99/kotto.io"
        >
          View on Github
        </a>
        <p>&copy; 2024 Ramona Doby</p>
      </div>
      <p className="text-xs">
        Words courtesy of the JMdict-EDICT Dictionary Project
      </p>
    </footer>
  );
}
