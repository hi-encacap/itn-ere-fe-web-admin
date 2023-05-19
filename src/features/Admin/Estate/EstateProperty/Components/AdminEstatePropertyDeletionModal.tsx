import { omit } from "lodash";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { adminEstatePropertyService } from "@services/index";

import { ConfirmationModal } from "@components/Modal";
import { ConfirmationModalProps } from "@components/Modal/ConfirmationModal";

import useToast from "@hooks/useToast";

interface ComponentProps extends Omit<ConfirmationModalProps, "id" | "title" | "message" | "onConfirm"> {
  id: number | null;
  onDeleted: () => void;
  onDeleteFailed?: () => void;
}

const AdminEstatePropertyDeletionModal = ({
  isOpen,
  id,
  onDeleted,
  onClose,
  onDeleteFailed,
  ...props
}: ComponentProps) => {
  const { t } = useTranslation(["admin"], {
    keyPrefix: "admin:page.estate.property",
  });

  const toast = useToast();

  const handleDeleteContact = useCallback(() => {
    adminEstatePropertyService
      .deleteEstatePropertyById(id as number)
      .then(() => {
        onDeleted();
        toast.success(t("notification.deleted"));
      })
      .catch(() => {
        onDeleteFailed?.();
        toast.error(t("notification.deleteFailed"));
      })
      .finally(() => {
        onClose();
      });
  }, [id, onClose, onDeleted, onDeleteFailed]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      status="danger"
      title={t("modal.delete.title")}
      message={t("modal.delete.message")}
      onConfirm={handleDeleteContact}
      onClose={onClose}
      {...omit(props, "title", "message")}
    />
  );
};

export default AdminEstatePropertyDeletionModal;
