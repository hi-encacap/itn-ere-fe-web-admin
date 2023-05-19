import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface LoadingOverlayProps {
  className?: string;
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({ className }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div
        className={twMerge(
          "h-12 w-12 animate-spin rounded-full border-4 border-teal-400 border-t-transparent",
          className,
        )}
      />
    </div>
  );
};

export default LoadingOverlay;
