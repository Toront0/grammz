const GlintText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`relative overflow-hidden font-sans leading-3 text-[10px] lg:text-xs uppercase tracking-[0.25em] font-medium`}
    >
      {/* Base (dim) text */}
      <span className="relative z-0 text-neutral-500">{children}</span>

      {/* Bright text revealed by the moving spotlight */}
      <span
        aria-hidden
        className="absolute inset-0 z-10 text-white"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 45%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 45%, black 55%, transparent 100%)",
          maskSize: "60% 100%",
          WebkitMaskSize: "60% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "-150% 0",
          WebkitMaskPosition: "-150% 0",
          animation: "spotlightMove 3s ease-in-out infinite"
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default GlintText;
