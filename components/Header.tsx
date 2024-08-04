import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <Link href="/" className="md:flex-1">
        <Image
          src="/assets/images/header.png"
          alt="header"
          width={150}
          height={150}
          className="hidden md:block"
        />
        <Image
          src="/assets/images/header.png"
          alt="header"
          width={100}
          height={100}
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
