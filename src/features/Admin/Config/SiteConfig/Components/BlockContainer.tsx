import { WEBSITE_DOMAIN_ENUM } from "@encacap-group/common/dist/re";
import { ReactNode } from "react";

import LoadingSpinner from "@components/Loading/LoadingSpinner";
import useSelector from "@hooks/useSelector";

interface SiteConfigBlockContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  isLoading?: boolean;
  websites?: WEBSITE_DOMAIN_ENUM[];
}

const SiteConfigBlockContainer = ({
  title,
  subtitle,
  children,
  isLoading,
  websites,
}: SiteConfigBlockContainerProps) => {
  const user = useSelector((state) => state.common.user);

  if (websites && !websites.includes(user?.website.url as WEBSITE_DOMAIN_ENUM)) {
    return null;
  }

  return (
    <div className="w-1/2 p-4">
      <div className="relative flex flex-col gap-y-5 rounded-md border-2 border-gray-100 bg-white px-8 pt-6 pb-8">
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
    </div>
  );
};

export default SiteConfigBlockContainer;
