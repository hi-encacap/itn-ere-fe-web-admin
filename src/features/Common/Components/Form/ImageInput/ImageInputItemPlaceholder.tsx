import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BsImageAlt } from 'react-icons/bs';

interface ImageInputItemPlaceholderProps {
  isMultiple?: boolean;
  onChooseImage: (files: FileList) => void;
}

const ImageInputItemPlaceholder = ({ isMultiple = false, onChooseImage }: ImageInputItemPlaceholderProps) => {
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
        id="image_input"
        type="file"
        multiple={isMultiple}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={handleChangeImage}
      />
    </div>
  );
};

export default ImageInputItemPlaceholder;
