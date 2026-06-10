type MaterialIconProps = {
  icon: string;
  className?: string;
};

const iconPaths: Record<string, string[]> = {
  arrow_back: ["M19 12H5", "M12 19l-7-7 7-7"],
  arrow_forward: ["M5 12h14", "M12 5l7 7-7 7"],
  auto_awesome: [
    "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z",
    "M5 17l.8 2.2L8 20l-2.2.8L5 23l-.8-2.2L2 20l2.2-.8L5 17z",
    "M19 16l.6 1.4L21 18l-1.4.6L19 20l-.6-1.4L17 18l1.4-.6L19 16z",
  ],
  business: [
    "M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16",
    "M17 8h1a2 2 0 0 1 2 2v11",
    "M3 21h18",
    "M8 7h2",
    "M8 11h2",
    "M8 15h2",
    "M13 7h1",
    "M13 11h1",
    "M13 15h1",
  ],
  close: ["M18 6 6 18", "M6 6l12 12"],
  description: [
    "M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
    "M14 3v5h5",
    "M8 13h8",
    "M8 17h6",
  ],
  groups: [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    "M22 21v-2a4 4 0 0 0-3-3.87",
    "M16 3.13a4 4 0 0 1 0 7.75",
  ],
  local_shipping: [
    "M3 6h11v9H3z",
    "M14 9h4l3 3v3h-7z",
    "M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    "M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  ],
  menu: ["M4 7h16", "M4 12h16", "M4 17h16"],
};

export function MaterialIcon({ icon, className = "" }: MaterialIconProps) {
  const paths = iconPaths[icon] ?? iconPaths.auto_awesome;

  return (
    <svg
      aria-hidden="true"
      className={`inline-block h-[1em] w-[1em] shrink-0 align-middle ${className}`}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {paths.map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  );
}
