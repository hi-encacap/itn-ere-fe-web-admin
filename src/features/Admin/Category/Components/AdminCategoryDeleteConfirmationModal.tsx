import { IAxiosError } from "@encacap-group/types/dist/base";
import { omit } from "lodash";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { adminCategoryService } from "@services/index";

import { ConfirmationModal } from "@components/Modal";
import { ConfirmationModalProps } from "@components/Modal/ConfirmationModal";

import AdminCategoryDeleteConfirmationModalContent from "./AdminCategoryDeleteConfirmationModalContent";

interface AdminCategoryDeleteConfirmationModalProps
  extends Omit<ConfirmationModalProps, "title" | "message" | "onConfirm"> {
  categoryId?: number;
  onDeleted?: () => void;
  onDeleteFailed?: (error: IAxiosError) => void;
}

const AdminCategoryDeleteConfirmationModal = ({
  isOpen,
  categoryId,
  onDeleted,
  onDeleteFailed,
  onClose,
  ...props
}: AdminCategoryDeleteConfirmationModalProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.category.modal.delete",
  });

  const handleConfirmDeleteCategory = useCallback(() => {
    if (!categoryId) {
      return;
    }

    adminCategoryService
      .deleteCategoryByCode(categoryId)
      .then(() => {
        onDeleted?.();
      })
      .catch(onDeleteFailed)
      .finally(() => {
        onClose?.();
      });
  }, [categoryId, onClose, onDeleted, onDeleteFailed]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      status="danger"
      title={t("title")}
      message={<AdminCategoryDeleteConfirmationModalContent />}
      onConfirm={handleConfirmDeleteCategory}
      onClose={onClose}
      {...omit(props, "title", "message", "onConfirm")}
    />
  );
};

export default AdminCategoryDeleteConfirmationModal;
