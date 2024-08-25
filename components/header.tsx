import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center text-foreground gap-4 w-full py-4 px-4 md:px-16">
      <Image
        src="/logo.png"
        alt="Japanese Reader Homepage"
        height={64}
        width={64}
      />
      <div className="h3">Kotto.io</div>
    </header>
  );
}
