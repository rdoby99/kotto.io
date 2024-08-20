import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex justify-between items-end w-full py-4 px-4 md:px-16 text-secondary-foreground">
      <div className="flex flex-col">
        <Image
          src="/logo.png"
          alt="Japanese Reader Homepage"
          height={64}
          width={64}
          className="mb-4"
        />
        <p>&copy; 2024 Ramona Doby</p>
      </div>
      <p className="text-xs">
        Words courtesy of the JMdict-EDICT Dictionary Project
      </p>
    </footer>
  );
}
