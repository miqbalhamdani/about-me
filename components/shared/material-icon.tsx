type MaterialIconProps = {
  icon: string;
  className?: string;
};

export function MaterialIcon({ icon, className = "" }: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined align-middle [font-variation-settings:'FILL'_0,'wght'_400,'GRAD'_0,'opsz'_24] ${className}`}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}
