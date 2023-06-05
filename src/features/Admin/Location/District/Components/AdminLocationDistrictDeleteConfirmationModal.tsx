import { omit } from "lodash";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { adminLocationService } from "@services/index";
import { ConfirmationModal } from "@components/Modal";
import { ConfirmationModalProps } from "@components/Modal/ConfirmationModal";
import useToast from "@hooks/useToast";

import AdminLocationDistrictDeleteConfirmationModalContent from "./AdminLocationDistrictDeleteConfirmationModalContent";

interface AdminLocationProvinceDeleteConfirmationModalProps
  extends Omit<ConfirmationModalProps, "title" | "message" | "onConfirm"> {
  code: string;
  onDeleted: () => void;
  onDeleteFailed?: () => void;
}

const AdminLocationDistrictDeleteConfirmationModal = ({
  isOpen,
  code: districtCode,
  onDeleted,
  onClose,
  onDeleteFailed,
  ...props
}: AdminLocationProvinceDeleteConfirmationModalProps) => {
  const { t } = useTranslation(["admin"], {
    keyPrefix: "admin:page.location.district",
  });

  const toast = useToast();

  const handleDeleteContact = useCallback(() => {
    if (!districtCode) return;

    adminLocationService
      .deleteDistrictByCode(districtCode)
      .then(() => {
        onDeleted();
        toast.success(t("notification.delete.districtDeleted"));
      })
      .catch(() => {
        onDeleteFailed?.();
        toast.error(t("notification.delete.districtDeleteFailed"));
      })
      .finally(() => {
        onClose();
      });
  }, [districtCode, onClose, onDeleted, onDeleteFailed]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      status="danger"
      title={t("modal.delete.title")}
      message={<AdminLocationDistrictDeleteConfirmationModalContent />}
      onConfirm={handleDeleteContact}
      onClose={onClose}
      {...omit(props, "title", "message")}
    />
  );
};

export default AdminLocationDistrictDeleteConfirmationModal;
