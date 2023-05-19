import { twMerge } from "tailwind-merge";

export interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div
      className={twMerge(
        "h-4 w-4 animate-spin rounded-full border-2 border-white",
        className,
        "border-t-transparent",
      )}
    />
  );
};

export default LoadingSpinner;
