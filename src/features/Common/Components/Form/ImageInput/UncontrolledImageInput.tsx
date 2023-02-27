import { random } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { FormElementBaseProps, FormImageInputDataType } from '@interfaces/Common/elementTypes';
import { uploadService } from '@services/index';

import useToast from '@hooks/useToast';
import { convertToImageDataFromFiles } from '@utils/image';

import ImageInputItem from './ImageInputItem';

export interface UncontrolledImageInputProps extends FormElementBaseProps {
  value?: FormImageInputDataType | FormImageInputDataType[];
  isMultiple?: boolean;
  isRequired?: boolean;
  disabled?: boolean;
  onChange?: (images: FormImageInputDataType | FormImageInputDataType[]) => void;
}

const UncontrolledImageInput = ({
  label,
  error,
  className,
  isMultiple = false,
  isRequired = false,
  disabled = false,
  value,
  onChange,
}: UncontrolledImageInputProps) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'common:form.imageInput',
  });
  const toast = useToast();

  const [images, setImages] = useState<FormImageInputDataType[]>([]);
  const [uploadingImageIds, setUploadingImageIds] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<FormImageInputDataType[]>([]);
  const [allowForceSetImages, setAllowForceSetImages] = useState(true);

  const inputId = useMemo(() => `image-input-${random()}`, []);

  const uploadImage = useCallback(
    (file: FormImageInputDataType) => {
      if (!file.file) {
        return;
      }

      setUploadingImageIds((prev) => [...prev, file.id]);

      uploadService
        .uploadImage(file.file)
        .then((response) => {
          const newFileData = { ...file, id: response.data.id };
          if (isMultiple) {
            const newUploadedImages = [...uploadedImages, newFileData];
            onChange?.(newUploadedImages);
            setUploadedImages(newUploadedImages);
            return;
          }
          onChange?.(newFileData);
        })
        .catch(() => {
          toast.error(t('error.uploadFailed'));
          setImages((prev) => prev.filter((image) => image.id !== file.id));
        })
        .finally(() => {
          setUploadingImageIds((prev) => prev.filter((id) => id !== file.id));
        });
    },
    [isMultiple],
  );

  const handleChooseImage = useCallback((files: FileList) => {
    const formattedImages = convertToImageDataFromFiles(files);

    formattedImages.forEach((image) => {
      uploadImage(image);
    });
    setImages((prev) => [...prev, ...formattedImages]);
  }, []);

  const handleRemoveImage = useCallback(
    (id: FormImageInputDataType['id']) => {
      const newUploadedImages = uploadedImages.filter((image) => image.id !== id);
      setImages((prev) => prev.filter((image) => image.id !== id));
      setUploadedImages(newUploadedImages);
      onChange?.(newUploadedImages);
    },
    [uploadedImages],
  );

  useEffect(() => {
    if (!allowForceSetImages || !value) {
      return;
    }

    setImages(Array.isArray(value) ? value : [value]);
    setAllowForceSetImages(false);
  }, [value]);

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className={twMerge(
            'relative mb-2 -mt-2 flex items-center text-sm text-stone-700',
            error && 'text-red-500',
          )}
        >
          {label}
          {isRequired && <div className="ml-1 text-red-500">*</div>}
        </label>
      )}
      <div className={twMerge('grid grid-cols-4 gap-4', className)}>
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
