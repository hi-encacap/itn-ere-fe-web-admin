import { useMemo } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdOpenInNew } from "react-icons/md";

import useSelector from "@hooks/useSelector";

const LayoutSidebarWebsite = () => {
  const user = useSelector((state) => state.common.user);
  const website = useMemo(() => user?.website, [user]);

  if (!website) return null;

  return (
    <div className="group mb-4 flex items-center justify-start space-x-4 border-b-2 border-gray-100 px-4 pb-6">
      <AiOutlineGlobal size={26} className="flex-shrink-0" />
      <div className="flex-1 space-y-0.5">
        <div className="break-all font-semibold line-clamp-1">{website.name}</div>
        <a
          href={`https://www.${website.url}`}
          className="relative block break-all text-sm duration-100 line-clamp-1 group-hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          <span>{website.url.replace("https://", "")}</span>
          <MdOpenInNew className="invisible absolute right-0 top-1 flex-shrink-0 group-hover:visible" />
        </a>
      </div>
    </div>
  );
};

export default LayoutSidebarWebsite;
