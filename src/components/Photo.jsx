import { useState } from "react";

export default function Photo({ src, alt, className = "", loading = "lazy", ...props }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`bg-[linear-gradient(160deg,#123C2F,#246B50_58%,#1a4a38)] ${className}`}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
