import { ICategory } from "@encacap-group/common/dist/re";
import { omit } from "lodash";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ServiceDeleteFunctionType } from "@interfaces/Common/commonTypes";
import { ConfirmationModal } from "@components/Modal";
import { ConfirmationModalProps } from "@components/Modal/ConfirmationModal";

interface CategoryDeleteConfirmationModalProps
  extends Omit<ConfirmationModalProps, "title" | "message" | "onConfirm"> {
  category: ICategory | null;
  onDelete: ServiceDeleteFunctionType;
}

const CategoryDeleteConfirmationModal = ({
  isOpen,
  category,
  onDelete,
  onClose,
  ...props
}: CategoryDeleteConfirmationModalProps) => {
  const { t } = useTranslation();

  const handleConfirmDeleteCategory = useCallback(() => {
    if (!category) {
      return;
    }

    void onDelete(category.id);
  }, [category, onDelete]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      status="danger"
      title={`deleteCategory::${String(category?.name)}`}
      message={t("deleteCategoryConfirmation")}
      onConfirm={handleConfirmDeleteCategory}
      onClose={onClose}
      {...omit(props, "title", "message", "onConfirm")}
    />
  );
};

export default CategoryDeleteConfirmationModal;
