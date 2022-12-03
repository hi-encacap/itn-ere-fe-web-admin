import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { FormElementBaseProps, FormImageInputDataType } from '@interfaces/Common/elementTypes';
import { uploadService } from '@services/index';

import { convertToImageDataFromFiles } from '@utils/image';

import ImageInputItem from './ImageInputItem';

export interface UncontrolledImageInputProps extends FormElementBaseProps {
  value?: FormImageInputDataType[];
  isMultiple?: boolean;
  onChange?: (images: FormImageInputDataType | FormImageInputDataType[]) => void;
}

const UncontrolledImageInput = ({
  label,
  error,
  isMultiple = false,
  onChange,
}: UncontrolledImageInputProps) => {
  const [images, setImages] = useState<FormImageInputDataType[]>([]);
  const [uploadingImageIds, setUploadingImageIds] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<FormImageInputDataType[]>([]);

  const uploadImage = useCallback(
    (file: FormImageInputDataType) => {
      setUploadingImageIds((prev) => [...prev, file.id]);

      uploadService
        .uploadImage(file.file)
        .then((response) => {
          const newFileData = { ...file, id: response.data.id };
          if (isMultiple) {
            setUploadedImages((prev) => [...prev, newFileData]);
            return;
          }
          onChange?.(newFileData);
        })
        .catch((error) => {
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
      setImages((prev) => prev.filter((image) => image.id !== id));
      setUploadedImages((prev) => prev.filter((image) => image.id !== id));
    },
    [setImages, setUploadedImages],
  );

  useEffect(() => {
    if (isMultiple) {
      onChange?.(uploadedImages);
      return;
    }
    onChange?.(uploadedImages[0]);
  }, [uploadedImages]);

  return (
    <div>
      {label && (
        <label
          htmlFor="image_input"
          className={twMerge(
            '-mt-2 block cursor-default pb-2 text-sm font-medium text-slate-500',
            error && 'text-red-500',
          )}
          role="button"
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
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default UncontrolledImageInput;
