import { useCallback } from "react";
import { FiTrash2 } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import { FormImageInputDataType } from "@interfaces/Common/elementTypes";

interface ImageInputItemPreviewProps {
  image: FormImageInputDataType;
  isUploading?: boolean;
  isDisabled?: boolean;
  onRemove?: (id: FormImageInputDataType["id"]) => void;
}

const ImageInputItemPreview = ({ image, isUploading, isDisabled, onRemove }: ImageInputItemPreviewProps) => {
  const handleClickRemove = useCallback(() => {
    onRemove?.(image.id);
  }, [image.id, onRemove]);

  return (
    <div
      className={twMerge(
        "group relative h-full w-full overflow-hidden rounded-lg p-3",
        isUploading && "opacity-20",
      )}
    >
      <div className="h-full w-full rounded-lg">
        <img src={image.preview} alt={image.id} className="h-full w-full object-contain" />
      </div>
      {!isUploading && !isDisabled && (
        <div
          className="absolute inset-3 flex cursor-pointer items-center justify-center bg-white bg-opacity-60 opacity-0 duration-100 group-hover:opacity-100"
          role="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={handleClickRemove}
        >
          <FiTrash2 className="text-red-500" size={20} />
        </div>
      )}
    </div>
  );
};

export default ImageInputItemPreview;
