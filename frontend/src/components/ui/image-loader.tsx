import { useState } from "react";
import { Skeleton } from "./skeleton";

interface ImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export const ImageLoader = ({ src, alt, className, fallbackSrc = "/placeholder.svg" }: ImageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setTimeout(() => setIsLoading(false), 100); // Small delay to prevent flashing
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <Skeleton className={`${className} animate-pulse`} />
      )}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={`${className} ${isLoading ? 'absolute opacity-0' : 'opacity-100'} transition-opacity duration-500 ease-in-out`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};