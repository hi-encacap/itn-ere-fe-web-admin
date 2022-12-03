import { twMerge } from 'tailwind-merge';

import { FormImageInputDataType } from '@interfaces/Common/elementTypes';

import ImageInputItemPlaceholder from './ImageInputItemPlaceholder';
import ImageInputItemPreview from './ImageInputItemPreview';
import ImageInputItemUploading from './ImageInputItemUploading';

interface ImageInputItemProps {
  image?: FormImageInputDataType;
  isUploading?: boolean;
  isMultiple?: boolean;
  error?: boolean;
  onChange?: (image: FormImageInputDataType) => void;
  onRemove?: (id: FormImageInputDataType['id']) => void;
  onChooseImage: (files: FileList) => void;
}

const ImageInputItem = ({
  image,
  isUploading,
  isMultiple,
  error,
  onChooseImage,
  onRemove,
}: ImageInputItemProps) => {
  return (
    <div
      className={twMerge(
        'group relative inline-block aspect-square overflow-hidden rounded-lg border-2 border-gray-100 duration-100 focus-within:border-blue-500 hover:border-gray-200',
        error && 'border-red-500 hover:border-red-500',
      )}
    >
      {!image && <ImageInputItemPlaceholder isMultiple={isMultiple} onChooseImage={onChooseImage} />}
      {image && <ImageInputItemPreview image={image} isUploading={isUploading} onRemove={onRemove} />}
      {isUploading && <ImageInputItemUploading />}
    </div>
  );
};

export default ImageInputItem;
