import { IEstate, IPost } from "@encacap-group/common/dist/re";
import { Key, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmationModal } from "@components/Modal";
import { ModalProps } from "@components/Modal/Modal";
import useToast from "@hooks/useToast";

import AdminEstateCompletedDeleteConfirmationMessage from "../../../../Admin/Estate/Components/AdminEstateCompletedDeleteConfirmationMessage";

interface PostDeleteConfirmationModalCompletedProps
  extends Omit<ModalProps, "title" | "message" | "onConfirm"> {
  data: IEstate | IPost | null;
  onConfirm: (id: Key) => Promise<void>;
  onSuccess: () => void;
}

const PostDeleteConfirmationModalCompleted = ({
  data,
  onSuccess,
  onClose,
  onConfirm,
  ...props
}: PostDeleteConfirmationModalCompletedProps) => {
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

      toast.success(t("list.notification.deletedCompleted"));

      onSuccess();
    } catch (error) {
      toast.error(t("list.notification.deleteCompletedFailed"));
    } finally {
      onClose();
    }
  }, [data, onClose, onConfirm, onSuccess, t, toast]);

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

export default PostDeleteConfirmationModalCompleted;
