import { ICloudflareImageResponse, getImageURL } from "@encacap-group/common/dist/re";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormImageInputDataType } from "@interfaces/Common/elementTypes";
import { Modal } from "@components/Modal";
import { BaseModalProps } from "@components/Modal/Modal";

import ImageInput from "../ImageInput/ImageInput";
import Input from "../Input/Input";

interface EditorInsertImageModalProps extends Omit<BaseModalProps, "onConfirm"> {
  onConfirm: (image: string, caption: string) => void;
}

interface EditorInsertImageModalFormValue {
  image: FormImageInputDataType | null;
  caption: string | null;
}

const EditorInsertImageModal = ({ isOpen, onClose, onConfirm }: EditorInsertImageModalProps) => {
  const { t } = useTranslation();

  const defaultValues: EditorInsertImageModalFormValue = {
    image: null,
    caption: null,
  };

  const { control, getValues, reset } = useForm<EditorInsertImageModalFormValue>();

  const handleConfirm = useCallback(() => {
    const { image, caption } = getValues();

    onConfirm(getImageURL(image as unknown as ICloudflareImageResponse), caption ?? "");
  }, [getValues]);

  useEffect(() => {
    if (!isOpen) {
      reset(defaultValues);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} title={t("insertImage")} onClose={onClose} onConfirm={handleConfirm}>
      <div className="grid gap-6">
        <ImageInput name="image" label={t("pickImage")} control={control} isRequired />
        <Input
          name="caption"
          label={t("caption")}
          placeholder={t("enterCaption")}
          className="block"
          control={control}
        />
      </div>
    </Modal>
  );
};

export default EditorInsertImageModal;
