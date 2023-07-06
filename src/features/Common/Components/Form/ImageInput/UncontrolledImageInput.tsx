import { random } from "lodash";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import useToast from "@hooks/useToast";
import { FormElementBaseProps, FormImageInputDataType } from "@interfaces/Common/elementTypes";
import { uploadService } from "@services/index";
import { convertToImageDataFromFiles } from "@utils/image";

import FormElementLabel from "../FormElementLabel";
import ImageInputItem from "./ImageInputItem";

interface BaseUncontrolledImageInputProps extends FormElementBaseProps {
  isRequired?: boolean;
  disabled?: boolean;
  onUploading?: (isUploading: boolean) => void;
}

interface UncontrolledSingleImageInputProps {
  isMultiple?: never;
  value?: FormImageInputDataType;
  onChange?: (image: FormImageInputDataType) => void;
}

interface UncontrolledMultipleImageInputProps {
  isMultiple: true;
  value?: FormImageInputDataType[];
  onChange?: (images: FormImageInputDataType[]) => void;
}

export type UncontrolledImageInputProps = BaseUncontrolledImageInputProps &
  (UncontrolledMultipleImageInputProps | UncontrolledSingleImageInputProps);

const UncontrolledImageInput = ({
  label,
  error,
  className,
  itemContainerClassName,
  isMultiple,
  isRequired = false,
  disabled = false,
  value,
  onChange,
  onUploading,
}: UncontrolledImageInputProps) => {
  const { t } = useTranslation("common");
  const toast = useToast();

  const [images, setImages] = useState<FormImageInputDataType[]>([]);
  const [uploadingImageIds, setUploadingImageIds] = useState<string[]>([]);
  const [errorImageIds, setErrorImageIds] = useState<string[]>([]);
  const [handledImages, setHandledImages] = useState<FormImageInputDataType[]>([]);

  const inputId = useMemo(() => `image-input-${random()}`, []);
  const isTouchRef = useRef(false);

  const uploadImage = useCallback(
    async (file: FormImageInputDataType) => {
      if (!file.file) {
        return null;
      }

      setUploadingImageIds((prev) => [...prev, file.id]);

      try {
        const response = await uploadService.uploadImage(file.file);
        return response;
      } catch (uploadError) {
        toast.error(t("uploadImageError"));
        setErrorImageIds((prev) => [...prev, file.id]);
        return null;
      } finally {
        setUploadingImageIds((prev) => prev.filter((id) => id !== file.id));
      }
    },
    [t, toast],
  );

  const handleChooseImage = useCallback(
    async (files: FileList) => {
      const formattedImages = convertToImageDataFromFiles(files);

      setImages((prev) => [...prev, ...formattedImages]);

      onUploading?.(true);

      const uploadedImages = await Promise.all(formattedImages.map(uploadImage));

      onUploading?.(false);

      const filteredUploadedImages = uploadedImages.filter(Boolean) as FormImageInputDataType[];

      isTouchRef.current = true;
      setHandledImages((prev) => [...prev, ...filteredUploadedImages]);
    },
    [onUploading, uploadImage],
  );

  const handleRemoveImage = useCallback((id: FormImageInputDataType["id"]) => {
    isTouchRef.current = true;
    setHandledImages((prev) => prev.filter((image) => image.id !== id));
    setImages((prev) => prev.filter((image) => image.id !== id));
  }, []);

  useEffect(() => {
    if (isTouchRef.current || !value) {
      return;
    }

    const correctValue = Array.isArray(value) ? value : [value];

    setHandledImages(correctValue);
    setImages(correctValue);
  }, [value]);

  useEffect(() => {
    if (!isTouchRef.current) {
      return;
    }

    if (isMultiple) {
      onChange?.(handledImages);
      return;
    }

    onChange?.(handledImages[0]);
  }, [handledImages, isMultiple, onChange]);

  return (
    <div className={className}>
      {label && <FormElementLabel label={label} id={inputId} isRequired={isRequired} error={error} />}
      <div className={twMerge("grid grid-cols-4 gap-4", itemContainerClassName)}>
        {images.map((image) => (
          <ImageInputItem
            inputId={inputId}
            key={image.id}
            image={image}
            error={Boolean(error) || errorImageIds.includes(image.id)}
            isUploading={uploadingImageIds.includes(image.id)}
            isDisabled={disabled}
            onChooseImage={handleChooseImage}
            onRemove={handleRemoveImage}
          />
        ))}
        {((!isMultiple && images.length === 0) || isMultiple) && (
          <ImageInputItem
            inputId={inputId}
            isMultiple={isMultiple}
            error={Boolean(error)}
            isDisabled={disabled}
            onChooseImage={handleChooseImage}
          />
        )}
      </div>
      {error && <div className="mt-1.5 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default memo(UncontrolledImageInput);
