import { omit } from "lodash";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmationModal } from "@components/Modal";
import { ConfirmationModalProps } from "@components/Modal/ConfirmationModal";
import useToast from "@hooks/useToast";
import { adminLocationService } from "@services/index";

import AdminLocationWardDeleteConfirmationModalContent from "./AdminLocationWardDeleteConfirmationModalContent";

interface AdminLocationWardDeleteConfirmationModalProps
  extends Omit<ConfirmationModalProps, "title" | "message" | "onConfirm"> {
  code: string;
  onDeleted: () => void;
  onDeleteFailed?: () => void;
}

const AdminLocationWardDeleteConfirmationModal = ({
  isOpen,
  code: wardCode,
  onDeleted,
  onClose,
  onDeleteFailed,
  ...props
}: AdminLocationWardDeleteConfirmationModalProps) => {
  const { t } = useTranslation(["admin"], {
    keyPrefix: "admin:page.location.ward",
  });

  const toast = useToast();

  const handleDelete = useCallback(() => {
    if (!wardCode) return;

    adminLocationService
      .deleteWardByCode(wardCode)
      .then(() => {
        onDeleted();
        toast.success(t("notification.delete.deleted"));
      })
      .catch(() => {
        onDeleteFailed?.();
        toast.error(t("notification.delete.deleteFailed"));
      })
      .finally(() => {
        onClose();
      });
  }, [onClose, onDeleteFailed, onDeleted, t, toast, wardCode]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      status="danger"
      title={t("modal.delete.title")}
      message={<AdminLocationWardDeleteConfirmationModalContent />}
      onConfirm={handleDelete}
      onClose={onClose}
      {...omit(props, "title", "message")}
    />
  );
};

export default AdminLocationWardDeleteConfirmationModal;
