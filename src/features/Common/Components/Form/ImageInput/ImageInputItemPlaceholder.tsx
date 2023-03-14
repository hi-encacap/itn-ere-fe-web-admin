import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BsImageAlt } from 'react-icons/bs';

interface ImageInputItemPlaceholderProps {
  inputId: string;
  isMultiple?: boolean;
  isDisabled?: boolean;
  onChooseImage: (files: FileList) => void;
}

const ImageInputItemPlaceholder = ({
  inputId,
  isMultiple = false,
  isDisabled = false,
  onChooseImage,
}: ImageInputItemPlaceholderProps) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'common:form.imageInput',
  });

  const handleChangeImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (files) {
        onChooseImage(files);
      }
    },
    [onChooseImage],
  );

  return (
    <div className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center text-input-placeholder">
      <BsImageAlt size={26} />
      <div className="mt-3 text-xs text-input-placeholder">{t('placeholder')}</div>
      <input
        id={inputId}
        type="file"
        multiple={isMultiple}
        className="absolute inset-0 cursor-pointer opacity-0"
        disabled={isDisabled}
        onChange={handleChangeImage}
      />
    </div>
  );
};

export default ImageInputItemPlaceholder;
