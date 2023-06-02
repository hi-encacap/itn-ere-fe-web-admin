import { ESTATE_STATUS_ENUM } from "@encacap-group/common/dist/re";
import { useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

import { slugify } from "@utils/helpers";

interface PostTableBodyItemBadgeProps {
  title: string;
  postId: number;
  status?: ESTATE_STATUS_ENUM;
}

const PostTableBodyItemBadge = ({ title, postId, status }: PostTableBodyItemBadgeProps) => {
  const id = useMemo(() => `${slugify(title)}-${postId}`, [title, postId]);

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
    <>
      <div
        className={twMerge(
          "inline cursor-pointer rounded px-2 pb-0.5 pt-[3px] text-sm duration-100 line-clamp-1",
          classNameByStatus,
        )}
        data-tooltip-id={id}
        data-tooltip-place="bottom"
        data-tooltip-position-strategy="fixed"
      >
        {title}
      </div>
      <Tooltip id={id}>{title}</Tooltip>
    </>
  );
};

export default PostTableBodyItemBadge;
