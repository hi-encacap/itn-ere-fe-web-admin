import { Key, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmationModal } from "@components/Modal";
import { ModalProps } from "@components/Modal/Modal";
import useToast from "@hooks/useToast";
import { EstateDraftDataType } from "@interfaces/Admin/estateTypes";
import { PostDraftDataType } from "@interfaces/Admin/postTypes";

interface PostDeleteConfirmationModalDraftProps extends Omit<ModalProps, "title" | "message" | "onConfirm"> {
  data: EstateDraftDataType | PostDraftDataType | null;
  onConfirm: (id: Key) => Promise<void>;
  onSuccess: () => void;
}

const PostDeleteConfirmationModalDraft = ({
  data,
  onSuccess,
  onClose,
  onConfirm,
  ...props
}: PostDeleteConfirmationModalDraftProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate",
  });
  const toast = useToast();

  const handleConfirmDelete = useCallback(async () => {
    if (!data) {
      return;
    }

    try {
      await onConfirm(data.id);

      toast.success(t("list.notification.deletedDraft"));

      onSuccess();
    } catch (error) {
      toast.error(t("list.notification.deleteDraftFailed"));
    } finally {
      onClose();
    }
  }, [data, onClose, onConfirm, onSuccess, t, toast]);

  return (
    <ConfirmationModal
      title={t("list.deletion.title", { title: data?.title })}
      message={t("list.deletion.message")}
      onConfirm={handleConfirmDelete}
      onClose={onClose}
      {...props}
    />
  );
};

export default PostDeleteConfirmationModalDraft;
