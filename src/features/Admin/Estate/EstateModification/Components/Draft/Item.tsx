import { getImageURL } from "@encacap-group/common/dist/re";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiTrash2 } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";
import { twMerge } from "tailwind-merge";

import { EstateDraftDataType } from "@interfaces/Admin/estateTypes";
import DropdownContainerV2 from "@components/Dropdown/DropdownContainerV2";
import { DropdownMenuItemType } from "@components/Dropdown/DropdownContainerV2MenuItem";

interface AdminEstateModificationDraftItemProps {
  draft: EstateDraftDataType;
  onClickDelete?: (id: number) => void;
}

const AdminEstateModificationDraftItem = ({
  draft,
  onClickDelete,
}: AdminEstateModificationDraftItemProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.list",
  });
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState<boolean>(false);

  const handleClickDelete = useCallback(() => {
    onClickDelete?.(draft.id);
  }, [draft, onClickDelete]);

  const dropdownMenu = useMemo<DropdownMenuItemType[]>(
    () => [
      {
        id: "delete",
        label: t("table.action.delete"),
        icon: <FiTrash2 />,
        className: "text-red-500",
        onClick: handleClickDelete,
      },
    ],
    [t, handleClickDelete],
  );

  const handleShowDropdownMenu = useCallback(() => {
    setIsShowDropdownMenu(true);
  }, []);

  const handleHideDropdownMenu = useCallback(() => {
    setIsShowDropdownMenu(false);
  }, []);

  return (
    <div className="group relative grid grid-cols-6 overflow-hidden rounded-md">
      <div className="col-span-2 h-full flex-shrink-0 overflow-hidden bg-gray-100 py-0.5">
        {draft.avatar && (
          <img
            src={getImageURL(draft.avatar)}
            alt={draft.title}
            className="h-full w-full rounded-l-md object-cover object-center"
          />
        )}
      </div>
      <div className="col-span-4 flex flex-col justify-center rounded-r-md border-2 border-l-0 border-gray-100 px-4 py-3">
        <div
          className={twMerge(
            "font-semibold duration-100 line-clamp-2 group-hover:text-teal-500",
            isShowDropdownMenu && "text-teal-500",
          )}
        >
          {draft.title}
        </div>
        <div className="mt-1 flex items-center justify-start space-x-2">
          <MdAccessTime />
          <span className="text-sm">
            {t("table.column.updatedAt", {
              date: dayjs(draft.updatedAt).format("DD/MM/YYYY"),
            })}
          </span>
        </div>
      </div>
      <DropdownContainerV2
        menu={dropdownMenu}
        onShow={handleShowDropdownMenu}
        onHide={handleHideDropdownMenu}
      >
        <button
          type="button"
          className={twMerge(
            "absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white opacity-0 shadow-center duration-100 hover:bg-teal-500 hover:text-white group-hover:opacity-100",
            isShowDropdownMenu && "bg-teal-500 text-white opacity-100",
          )}
        >
          <HiDotsHorizontal size={20} />
        </button>
      </DropdownContainerV2>
    </div>
  );
};

export default AdminEstateModificationDraftItem;
