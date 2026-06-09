type FooterLink = {
  href: string;
  label: string;
};

const footerLinks: FooterLink[] = [
  { href: "mailto:hello@example.com", label: "Email" },
  { href: "#", label: "Phone" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "GitHub" },
  { href: "#", label: "Blog" },
];

export function SiteFooter() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant" id="contact">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-section-gap max-w-max-width mx-auto gap-8">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">PORTFOLIO</span>
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
            © 2024 PORTFOLIO. ALL RIGHTS RESERVED.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors duration-200"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
