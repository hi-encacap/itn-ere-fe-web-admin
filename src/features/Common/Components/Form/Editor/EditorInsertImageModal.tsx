import { IImageResponse, getImageURL } from "@encacap-group/common/dist/re";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Modal } from "@components/Modal";
import { BaseModalProps } from "@components/Modal/Modal";
import { FormImageInputDataType } from "@interfaces/Common/elementTypes";

import ImageInput from "../ImageInput/ImageInput";
import Input from "../Input/Input";

interface EditorInsertImageModalProps extends Omit<BaseModalProps, "onConfirm"> {
  onConfirm: (image: string[], caption: string) => void;
}

interface EditorInsertImageModalFormValue {
  images: FormImageInputDataType[] | null;
  caption: string | null;
}

const EditorInsertImageModal = ({ isOpen, onClose, onConfirm }: EditorInsertImageModalProps) => {
  const { t } = useTranslation();

  const defaultValues: EditorInsertImageModalFormValue = {
    images: null,
    caption: null,
  };

  const { control, getValues, reset, watch } = useForm<EditorInsertImageModalFormValue>();
  const images = watch("images");

  const isDisableCaptionInput = useMemo(() => {
    if (!images) {
      return true;
    }

    if (Array.isArray(images)) {
      return images.length !== 1;
    }

    return false;
  }, [images]);

  const handleConfirm = useCallback(() => {
    const { images, caption } = getValues();

    if (!images) {
      return;
    }

    const imageUrls = images.map((image) => getImageURL(image as unknown as IImageResponse));

    onConfirm(imageUrls, caption ?? "");
  }, [getValues]);

  useEffect(() => {
    if (!isOpen) {
      reset(defaultValues);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} title={t("insertImage")} onClose={onClose} onConfirm={handleConfirm}>
      <div className="grid gap-6">
        <ImageInput name="images" label={t("pickImage")} control={control} isRequired isMultiple />
        <Input
          name="caption"
          label={t("caption")}
          placeholder={t("enterCaption")}
          className="block"
          control={control}
          disabled={isDisableCaptionInput}
        />
      </div>
    </Modal>
  );
};

export default memo(EditorInsertImageModal);
