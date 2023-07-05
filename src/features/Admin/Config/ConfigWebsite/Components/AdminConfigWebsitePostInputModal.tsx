import { memo, useCallback, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Modal } from "@components/Modal";
import { ModalProps } from "@components/Modal/Modal";
import { HookFormControl } from "@interfaces/Common/commonTypes";

import AdminPostList from "@admin/Post/AdminPostList";

interface AdminConfigWebsitePostInputModalProps extends Omit<ModalProps, "title" | "onConfirm"> {
  name: string;
  control: HookFormControl;
}

const AdminConfigWebsitePostInputModal = ({
  control,
  name,
  isOpen,
  onClose,
}: AdminConfigWebsitePostInputModalProps) => {
  const { t } = useTranslation();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const handleConfirm = useCallback(() => {
    onChange(selectedIds[0]);
    onClose();
  }, [onChange, onClose, selectedIds]);

  useEffect(() => {
    if (!value || selectedIds.length > 0) return;

    setSelectedIds([value]);
  }, [value, selectedIds.length]);

  return (
    <Modal
      contentContainerClassName="w-256"
      isOpen={isOpen}
      title={t("pickPost")}
      isAllowSubmit={selectedIds.length > 0}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <AdminPostList
        defaultSelection={selectedIds}
        isResetScroll={false}
        layoutClassName="px-0"
        mode="modal"
        tableMode="selection"
        onChangeSelection={setSelectedIds}
      />
    </Modal>
  );
};

export default memo(AdminConfigWebsitePostInputModal);
