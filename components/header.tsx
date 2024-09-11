import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center text-foreground gap-4 w-full py-4 px-4 md:px-16 relative">
      <Image
        src="/logo.png"
        alt="Japanese Reader Homepage"
        height={64}
        width={64}
      />
      <div className="h3">Kotto.io</div>
      <div className="absolute top-0 right-0 -z-10">
        <Image src="/waves-top.png" alt="" width={1200} height={1200} />
      </div>
    </header>
  );
}
