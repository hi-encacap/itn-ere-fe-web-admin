import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { FormElementBaseProps, FormImageInputDataType } from '@interfaces/Common/elementTypes';
import { uploadService } from '@services/index';

import { convertToImageDataFromFiles } from '@utils/image';

import ImageInputItem from './ImageInputItem';

export interface UncontrolledImageInputProps extends FormElementBaseProps {
  value?: FormImageInputDataType | FormImageInputDataType[];
  isMultiple?: boolean;
  onChange?: (images: FormImageInputDataType | FormImageInputDataType[]) => void;
}

const UncontrolledImageInput = ({
  label,
  error,
  isMultiple = false,
  value,
  onChange,
}: UncontrolledImageInputProps) => {
  const [images, setImages] = useState<FormImageInputDataType[]>([]);
  const [uploadingImageIds, setUploadingImageIds] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<FormImageInputDataType[]>([]);
  const [allowForceSetImages, setAllowForceSetImages] = useState(true);

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
        .catch((error) => {
          // #skipcq: JS-0002
          console.log(error);
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
          htmlFor="image_input"
          className={twMerge(
            '-mt-2 block cursor-default pb-2 text-sm font-medium text-slate-500',
            error && 'text-red-500',
          )}
        >
          {label}
        </label>
      )}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <ImageInputItem
            key={image.id}
            image={image}
            error={Boolean(error)}
            isUploading={uploadingImageIds.includes(image.id)}
            onChooseImage={handleChooseImage}
            onRemove={handleRemoveImage}
          />
        ))}
        {!isMultiple && images.length === 0 && (
          <ImageInputItem isMultiple={isMultiple} error={Boolean(error)} onChooseImage={handleChooseImage} />
        )}
      </div>
      {error && <div className="mt-1.5 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default UncontrolledImageInput;
