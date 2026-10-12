export const RevealGlide: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={`${className} reveal-glide-item opacity-0 text-gray-300 will-change-transform`}
  >
    {children}
  </div>
);
