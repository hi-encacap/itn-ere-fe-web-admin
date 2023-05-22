import { ESTATE_STATUS_ENUM, IEstate, getImageURL } from "@encacap-group/common/dist/re";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit2, FiTrash2, FiUpload } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import striptags from "striptags";

import { DROPDOWN_MENU_TYPE_ENUM } from "@constants/enums";
import { ADMIN_PATH } from "@constants/urls";
import { EstateDraftDataType } from "@interfaces/Admin/estateTypes";

import DropdownContainerV2 from "@components/Dropdown/DropdownContainerV2";
import { DropdownMenuItemType } from "@components/Dropdown/DropdownContainerV2MenuItem";
import { Button } from "@components/Form";
import LoadingSpinner from "@components/Loading/LoadingSpinner";

import useToast from "@hooks/useToast";

import AdminEstateListTableBodyItemBadge from "./TableBodyItemBadge";

interface AdminEstateListTableBodyItemProps {
  data: IEstate | EstateDraftDataType;
  onClickDelete?: (id: number) => void;
  onMoveToTop?: (id: number) => Promise<void>;
  onClickUnPublish?: (id: number) => void;
  onClickPublish?: (id: number) => void;
  onInteraction?: () => void;
}

const AdminEstateListTableBodyItem = ({
  data,
  onClickDelete,
  onMoveToTop,
  onClickUnPublish,
  onClickPublish,
  onInteraction,
}: AdminEstateListTableBodyItemProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.list",
  });
  const { t: tEstate } = useTranslation("admin", {
    keyPrefix: "admin:page.estate",
  });
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickDelete = useCallback(() => {
    onClickDelete?.(data.id);
  }, [data, onClickDelete]);

  const handleClickEdit = useCallback(() => {
    navigate(ADMIN_PATH.ESTATE_MODIFICATION_PATH(data.id, data.status));
  }, [data, navigate]);

  const handleClickMoveToTop = useCallback(async () => {
    setIsLoading(true);

    try {
      await onMoveToTop?.(data.id);
      toast.success(t("notification.movedToTop"));
      onInteraction?.();
    } catch (error) {
      toast.error(t("notification.moveToTopFailed"));
    } finally {
      setIsLoading(false);
    }
  }, [data, onClickDelete]);

  const handleClickUnPublish = useCallback(() => {
    onClickUnPublish?.(data.id);
  }, [data, onClickUnPublish]);

  const handleClickPublish = useCallback(() => {
    onClickPublish?.(data.id);
  }, [data, onClickPublish]);

  const moveTopTopOption: DropdownMenuItemType = useMemo(
    () => ({
      icon: <FiUpload />,
      id: "moveToTop",
      label: t("table.action.moveToTop"),
      onClick: handleClickMoveToTop,
    }),
    [handleClickMoveToTop],
  );

  const editOption: DropdownMenuItemType = useMemo(
    () => ({
      icon: <FiEdit2 />,
      id: "edit",
      label: t("table.action.edit"),
      onClick: handleClickEdit,
    }),
    [handleClickEdit],
  );

  const deleteOption: DropdownMenuItemType = useMemo(
    () => ({
      className: "text-red-500",
      icon: <FiTrash2 />,
      id: "delete",
      label: t("table.action.delete"),
      onClick: handleClickDelete,
    }),
    [handleClickDelete],
  );

  const dropdownMenu = useMemo<DropdownMenuItemType[]>(() => {
    if (data.status === ESTATE_STATUS_ENUM.UNPUBLISHED) {
      return [editOption, { id: "divider", type: DROPDOWN_MENU_TYPE_ENUM.DIVIDER }, deleteOption];
    }

    if (data.status === ESTATE_STATUS_ENUM.DRAFT) {
      return [deleteOption];
    }

    return [
      moveTopTopOption,
      editOption,
      { id: "divider", type: DROPDOWN_MENU_TYPE_ENUM.DIVIDER },
      deleteOption,
    ];
  }, [handleClickDelete]);

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-50" />
      )}
      <div className="aspect-video w-full flex-shrink-0 overflow-hidden bg-gray-100">
        {data.avatar && (
          <img
            src={getImageURL(data.avatar)}
            alt={data.title}
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col rounded-b-lg border-2 border-t-0 border-gray-100 px-4 py-4">
        <div className="mb-2 flex items-center justify-start space-x-2">
          {isLoading && <LoadingSpinner className="h-5 w-5 border-teal-500" />}
          <AdminEstateListTableBodyItemBadge status={data.status}>
            {tEstate(`status.${String(data.status)}`)}
          </AdminEstateListTableBodyItemBadge>
          {data.customId && (
            <AdminEstateListTableBodyItemBadge>#{data.customId}</AdminEstateListTableBodyItemBadge>
          )}
          {data.category && (
            <AdminEstateListTableBodyItemBadge>{data.category.name}</AdminEstateListTableBodyItemBadge>
          )}
        </div>
        <div>
          <div className="font-semibold">{data.title}</div>
          <div className="mt-1 flex items-center justify-start space-x-2">
            <MdAccessTime />
            <span className="text-sm">
              {t("table.column.updatedAt", {
                date: dayjs(data.updatedAt).format("DD/MM/YYYY"),
              })}
            </span>
          </div>
        </div>
        <div
          // #skipcq: JS-0440
          dangerouslySetInnerHTML={{
            __html: data.description ? striptags(data.description) : t("notification.emptyDescription"),
          }}
          className="mt-3 mb-2.5 flex-1 overflow-hidden border-t-2 border-gray-100 pt-2 line-clamp-3"
        />
        <div className="flex items-center space-x-4 border-t-2 border-gray-100 pt-4">
          <DropdownContainerV2 menu={dropdownMenu}>
            <Button className="rounded-sm py-2.5" color="light" size="sm" disabled={isLoading}>
              <HiDotsHorizontal size={20} />
            </Button>
          </DropdownContainerV2>
          {data.status === ESTATE_STATUS_ENUM.UNPUBLISHED && (
            <Button className="flex-1 rounded-sm" size="sm" disabled={isLoading} onClick={handleClickPublish}>
              {t("table.action.publish")}
            </Button>
          )}
          {data.status === ESTATE_STATUS_ENUM.DRAFT && (
            <Button className="flex-1 rounded-sm" size="sm" disabled={isLoading} onClick={handleClickEdit}>
              {t("table.action.edit")}
            </Button>
          )}
          {data.status === ESTATE_STATUS_ENUM.PUBLISHED && (
            <Button
              className="flex-1 rounded-sm"
              size="sm"
              disabled={isLoading}
              onClick={handleClickUnPublish}
            >
              {t("table.action.unPublish")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEstateListTableBodyItem;
