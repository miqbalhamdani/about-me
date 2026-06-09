"use client";

import Link from "next/link";
import { useState } from "react";
import { MaterialIcon } from "@/components/shared/material-icon";

type NavItem = {
  href: string;
  label: string;
};

const defaultNavItems: NavItem[] = [
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Tech Stack" },
  { href: "/#experience", label: "Experience" },
  { href: "/#portfolio", label: "Portfolio" },
];

const defaultCta = { href: "#", label: "Download CV" };

export function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="top-0 z-50 bg-surface-container-lowest border-b border-outline-variant">
      <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-6 max-w-max-width mx-auto">
        <Link href="/" className="font-headline-lg text-headline-lg font-bold tracking-tighter text-primary">
          PORTFOLIO
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {defaultNavItems.map((item) => (
            <a
              key={item.label}
              className="font-label-bold text-label-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-200"
              href={item.href}
            >
              {item.label}
            </a>
          ))}

          <a
            href={defaultCta.href}
            className="bg-primary text-on-primary px-6 py-2 font-label-bold text-label-bold uppercase tracking-widest hover:bg-secondary transition-colors duration-300"
          >
            {defaultCta.label}
          </a>
        </div>

        <button className="md:hidden text-primary" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          <MaterialIcon icon={open ? "close" : "menu"} className="text-primary" />
        </button>
      </nav>

      {open ? (
        <div className="md:hidden border-t border-outline-variant px-margin-mobile pb-6 flex flex-col gap-4 bg-surface-container-lowest">
          {defaultNavItems.map((item) => (
            <a
              key={`mobile-${item.label}`}
              className="font-label-bold text-label-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-200"
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={defaultCta.href}
            className="mt-2 bg-primary text-on-primary px-6 py-3 font-label-bold text-label-bold uppercase tracking-widest text-center"
            onClick={() => setOpen(false)}
          >
            {defaultCta.label}
          </a>
        </div>
      ) : null}
    </header>
  );
}
