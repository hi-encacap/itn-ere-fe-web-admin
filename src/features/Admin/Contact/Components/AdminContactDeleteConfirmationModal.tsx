import { omit } from "lodash";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmationModal } from "@components/Modal";
import { ConfirmationModalProps } from "@components/Modal/ConfirmationModal";
import { adminContactService } from "@services/index";

import AdminContactDeleteConfirmationModalContent from "./AdminContactDeleteConfirmationModalContent";

interface AdminContactDeleteConfirmationModalProps
  extends Omit<ConfirmationModalProps, "title" | "message" | "onConfirm"> {
  contactId?: number;
  onDeleted: () => void;
  onDeleteFailed: () => void;
}

const AdminContactDeleteConfirmationModal = ({
  isOpen,
  contactId,
  onDeleted,
  onClose,
  onDeleteFailed,
  ...props
}: AdminContactDeleteConfirmationModalProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.contact.modal.delete",
  });

  const handleDeleteContact = useCallback(() => {
    if (!contactId) return;

    adminContactService
      .deleteContactById(contactId)
      .then(() => {
        onDeleted();
      })
      .catch(onDeleteFailed)
      .finally(() => {
        onClose();
      });
  }, [contactId, onClose, onDeleted]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      status="danger"
      title={t("title")}
      message={<AdminContactDeleteConfirmationModalContent />}
      onConfirm={handleDeleteContact}
      onClose={onClose}
      {...omit(props, "title", "message")}
    />
  );
};

export default AdminContactDeleteConfirmationModal;
