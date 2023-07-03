import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { LoadingSkeleton } from "../Loading";

export interface AvatarProps {
  alt?: string;
  skeleton?: boolean;
  src?: string;
  className?: string;
}

const Avatar = ({ alt, skeleton = false, src, className }: AvatarProps) => {
  const availableBGColors = useMemo(() => ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500"], []);

  return (
    <div className={twMerge("relative h-12 w-12 cursor-pointer rounded-full bg-gray-100", className)}>
      {skeleton && !src && <LoadingSkeleton className={twMerge("h-12 w-12 rounded-full", className)} />}
      {!skeleton && src && (
        <img
          src={src}
          alt={alt}
          className={twMerge(
            "h-12 w-12 rounded-full border-2 border-gray-100 object-cover object-center",
            className,
          )}
        />
      )}
      {!skeleton && !src && (
        <div
          className={twMerge(
            "flex h-full w-full items-center justify-center rounded-full text-xl font-semibold uppercase text-white",
            availableBGColors[Math.floor(Math.random() * availableBGColors.length)],
          )}
        >
          {alt?.charAt(0)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
