import { random } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { FormElementBaseProps, FormImageInputDataType } from "@interfaces/Common/elementTypes";
import { uploadService } from "@services/index";

import useToast from "@hooks/useToast";
import { convertToImageDataFromFiles } from "@utils/image";

import ImageInputItem from "./ImageInputItem";

interface BaseUncontrolledImageInputProps extends FormElementBaseProps {
  isRequired?: boolean;
  disabled?: boolean;
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
  isMultiple,
  isRequired = false,
  disabled = false,
  value,
  onChange,
}: UncontrolledImageInputProps) => {
  const { t } = useTranslation("common");
  const toast = useToast();

  const [images, setImages] = useState<FormImageInputDataType[]>([]);
  const [uploadingImageIds, setUploadingImageIds] = useState<string[]>([]);
  const [handledImages, setHandledImages] = useState<FormImageInputDataType[]>([]);

  const inputId = useMemo(() => `image-input-${random()}`, []);
  const isAllowForceSetImagesRef = useRef(true);
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
      } catch (error) {
        toast.error(t("uploadImageError"));
        return null;
      } finally {
        setUploadingImageIds((prev) => prev.filter((id) => id !== file.id));
      }
    },
    [isMultiple, t, toast],
  );

  const handleChooseImage = useCallback(async (files: FileList) => {
    const formattedImages = convertToImageDataFromFiles(files);

    setImages((prev) => [...prev, ...formattedImages]);

    const uploadedImages = await Promise.all(formattedImages.map(uploadImage));
    const filteredUploadedImages = uploadedImages.filter(Boolean) as FormImageInputDataType[];

    isTouchRef.current = true;
    setHandledImages((prev) => [...prev, ...filteredUploadedImages]);
  }, []);

  const handleRemoveImage = useCallback((id: FormImageInputDataType["id"]) => {
    isTouchRef.current = true;
    setHandledImages((prev) => prev.filter((image) => image.id !== id));
    setImages((prev) => prev.filter((image) => image.id !== id));
  }, []);

  useEffect(() => {
    if (!isAllowForceSetImagesRef.current || !value) {
      return;
    }

    const correctValue = Array.isArray(value) ? value : [value];

    setHandledImages(correctValue);
    setImages(correctValue);

    isAllowForceSetImagesRef.current = false;
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
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className={twMerge(
            "relative mb-2 -mt-2 flex items-center text-sm text-stone-700",
            error && "text-red-500",
          )}
        >
          {label}
          {isRequired && <div className="ml-1 text-red-500">*</div>}
        </label>
      )}
      <div className={twMerge("grid grid-cols-4 gap-4", className)}>
        {images.map((image) => (
          <ImageInputItem
            inputId={inputId}
            key={image.id}
            image={image}
            error={Boolean(error)}
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

export default UncontrolledImageInput;
