import { ESTATE_STATUS_ENUM } from "@encacap-group/common/dist/re";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface PostTableBodyItemBadgeProps {
  title: string;
  status?: ESTATE_STATUS_ENUM;
}

const PostTableBodyItemBadge = ({ title, status }: PostTableBodyItemBadgeProps) => {
  const classNameByStatus = useMemo(() => {
    if (status === ESTATE_STATUS_ENUM.DRAFT) {
      return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }

    if (status === ESTATE_STATUS_ENUM.UNPUBLISHED) {
      return "bg-red-100 text-red-700 hover:bg-red-200";
    }

    return "bg-teal-100 text-teal-700 hover:bg-teal-200";
  }, [status]);

  return (
    <div
      className={twMerge(
        "mr-2 mb-2 inline cursor-pointer rounded px-2 pb-0.5 pt-[3px] text-sm duration-100 last:mr-0",
        classNameByStatus,
      )}
    >
      {title}
    </div>
  );
};

export default PostTableBodyItemBadge;
