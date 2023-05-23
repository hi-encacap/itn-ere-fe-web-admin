import { ReactNode } from "react";

import LoadingSpinner from "@components/Loading/LoadingSpinner";

interface SiteConfigBlockContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  isLoading?: boolean;
}

const SiteConfigBlockContainer = ({
  title,
  subtitle,
  children,
  isLoading,
}: SiteConfigBlockContainerProps) => {
  return (
    <div className="relative flex flex-col gap-y-5">
      <div>
        <div className="font-semibold">{title}</div>
        {subtitle && <div className="mt-2 text-sm text-slate-400">{subtitle}</div>}
      </div>
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <LoadingSpinner className="h-6 w-6 border-teal-500" />
        </div>
      )}
    </div>
  );
};

export default SiteConfigBlockContainer;
