"use client";

import Link from "next/link";
import { useState } from "react";
import { MaterialIcon } from "@/components/shared/material-icon";
import { homepageContent } from "@/lib/site-content";
import type { NavItem } from "@/lib/content-types";

const navItems: NavItem[] = [
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Tech Stack" },
  { href: "/#experience", label: "Experience" },
  { href: "/#portfolio", label: "Portfolio" },
];

const NAV_CTA_LABEL = "Download CV";

export function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="top-0 z-50 bg-surface-container-lowest border-b border-outline-variant">
      <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-6 max-w-max-width mx-auto">
        <Link href="/" className="font-headline-lg text-headline-lg font-bold tracking-tighter text-primary">
          {homepageContent.brand}
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              className="font-label-bold text-label-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-200"
              href={item.href}
            >
              {item.label}
            </a>
          ))}

          <a
            href={homepageContent.navCta.href}
            className="bg-primary text-on-primary px-6 py-2 font-label-bold text-label-bold uppercase tracking-widest hover:bg-secondary transition-colors duration-300"
          >
            {NAV_CTA_LABEL}
          </a>
        </div>

        <button className="md:hidden text-primary" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          <MaterialIcon icon={open ? "close" : "menu"} className="text-primary" />
        </button>
      </nav>

      {open ? (
        <div className="md:hidden border-t border-outline-variant px-margin-mobile pb-6 flex flex-col gap-4 bg-surface-container-lowest">
          {navItems.map((item) => (
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
            href={homepageContent.navCta.href}
            className="mt-2 bg-primary text-on-primary px-6 py-3 font-label-bold text-label-bold uppercase tracking-widest text-center"
            onClick={() => setOpen(false)}
          >
            {NAV_CTA_LABEL}
          </a>
        </div>
      ) : null}
    </header>
  );
}
