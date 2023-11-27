import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { FormImageInputDataType } from "@interfaces/Common/elementTypes";

import ImageInputItemPlaceholder from "./ImageInputItemPlaceholder";
import ImageInputItemPreview from "./ImageInputItemPreview";
import ImageInputItemUploading from "./ImageInputItemUploading";

interface ImageInputItemProps {
  inputId: string;
  image?: FormImageInputDataType;
  isUploading?: boolean;
  isMultiple?: boolean;
  isDisabled?: boolean;
  error?: boolean;
  onRemove?: (id: FormImageInputDataType["id"]) => void;
  onChooseImage: (files: FileList) => void;
}

const ImageInputItem = ({
  inputId,
  image,
  isUploading,
  isMultiple,
  isDisabled,
  error,
  onChooseImage,
  onRemove,
}: ImageInputItemProps) => {
  return (
    <div
      className={twMerge(
        "group relative inline-block aspect-square overflow-hidden rounded-lg border-2 border-gray-100 duration-100  hover:border-gray-200",
        error && "border-red-500 hover:border-red-500",
        isDisabled && "hover:border-gray-100",
      )}
    >
      {isDisabled && <div className="absolute inset-0 bg-gray-50" />}
      {!image && (
        <ImageInputItemPlaceholder
          inputId={inputId}
          isMultiple={isMultiple}
          isDisabled={isDisabled}
          onChooseImage={onChooseImage}
        />
      )}
      {image && (
        <ImageInputItemPreview
          image={image}
          isUploading={isUploading}
          isDisabled={isDisabled}
          onRemove={onRemove}
        />
      )}
      {isUploading && <ImageInputItemUploading />}
    </div>
  );
};

export default memo(ImageInputItem);
