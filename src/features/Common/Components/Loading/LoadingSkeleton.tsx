import { FC } from "react";
import { twMerge } from "tailwind-merge";

export interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton: FC<LoadingSkeletonProps> = ({ className }) => {
  return <div className={twMerge("background-gray-100 animate-pulse rounded-lg bg-gray-100", className)} />;
};

export default LoadingSkeleton;
