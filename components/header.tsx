import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex justify-between w-full py-4 px-16">
      <Image
        src="/logo.png"
        alt="Japanese Reader Homepage"
        height={64}
        width={64}
      />
      <Button variant="outline">Get In Touch</Button>
    </header>
  );
}
