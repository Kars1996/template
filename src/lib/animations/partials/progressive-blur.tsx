interface ProgressiveBlurProps {
  className?: string;
  direction: "left" | "right";
  blurIntensity?: number;
}

export function ProgressiveBlur({
  className = "",
  direction,
  blurIntensity = 1,
}: ProgressiveBlurProps) {
  const gradientDirection = direction === "left" ? "to right" : "to left";

  const maskImage = `linear-gradient(${gradientDirection}, transparent, rgba(0,0,0,${blurIntensity}))`;

  return (
    <div
      className={className}
      style={{
        backdropFilter: `blur(${blurIntensity * 4}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity * 4}px)`,
        maskImage,
        WebkitMaskImage: maskImage,
      }}
    />
  );
}