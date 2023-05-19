import { IEstate } from "@encacap-group/types/dist/re";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { EstateDraftDataType } from "@interfaces/Admin/estateTypes";
import { adminEstateService } from "@services/index";

import { ConfirmationModal } from "@components/Modal";
import { ModalProps } from "@components/Modal/Modal";

import useToast from "@hooks/useToast";

import AdminEstateCompletedDeleteConfirmationMessage from "./AdminEstateCompletedDeleteConfirmationMessage";

interface AdminEstateCompletedDeleteConfirmationModalProps extends Omit<ModalProps, "title" | "message"> {
  data: EstateDraftDataType | null;
  onSuccess: () => void;
}

const AdminEstateCompletedDeleteConfirmationModal = ({
  data,
  onSuccess,
  onClose,
  ...props
}: AdminEstateCompletedDeleteConfirmationModalProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate",
  });
  const toast = useToast();

  const handleConfirmDelete = useCallback(async () => {
    if (!data) {
      return;
    }

    try {
      await adminEstateService.deleteEstateById(data.id);

      toast.success(t("list.notification.deletedCompleted"));

      onSuccess();
    } catch (error) {
      toast.error(t("list.notification.deleteCompletedFailed"));
    } finally {
      onClose();
    }
  }, [onSuccess, data, toast, t]);

  return (
    <ConfirmationModal
      contentContainerClassName="max-w-xl w-[720px]"
      message={<AdminEstateCompletedDeleteConfirmationMessage data={data as IEstate} />}
      status="danger"
      title={t("list.deletion.title", { title: data?.title })}
      onConfirm={handleConfirmDelete}
      onClose={onClose}
      {...props}
    />
  );
};

export default AdminEstateCompletedDeleteConfirmationModal;
