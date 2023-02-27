import { Editor } from '@tinymce/tinymce-react';
import { useCallback, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { EstateModificationFormDataType } from '@interfaces/Admin/estateTypes';

const AdminEstateModificationFormDetailDescription = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification.form.detail.form',
  });

  const [isFocusing, setIsFocusing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const tinyEditorRef = useRef<Editor>(null);
  const { setValue } = useFormContext<EstateModificationFormDataType>();

  const handleFocusIn = useCallback(() => {
    setIsFocusing(true);
  }, []);

  const handleFocusOut = useCallback(() => {
    setIsFocusing(false);
  }, []);

  const handleChangeContent = useCallback(() => {
    const content = tinyEditorRef.current?.editor?.getContent();

    setValue('description', content);
  }, []);

  const handleInit = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="mt-6">
      <div
        className={twMerge(
          'relative mb-2 -mt-2 flex items-center text-sm text-stone-700',
          // error && 'text-red-500',
        )}
      >
        {t('description.label')}
        <div className="ml-1 text-red-500">*</div>
      </div>
      {isLoading && <div className="h-72 animate-pulse rounded-lg border-2 border-gray-100 bg-gray-100" />}
      <div
        className={twMerge(
          'rounded-lg border-2 border-gray-100 hover:border-gray-200',
          isFocusing && 'border-blue-500 hover:border-blue-500',
          isLoading && 'hidden',
        )}
      >
        <Editor
          apiKey={process.env.REACT_APP_TINY_API_KEY ?? ''}
          ref={tinyEditorRef}
          init={{
            height: 288,
            menubar: false,
            // plugins: ['advlist autolink lists link image charmap print preview anchor'],
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family: Source Sans Pro,sans-serif; font-size: 14px }',
          }}
          onChange={handleChangeContent}
          onFocusIn={handleFocusIn}
          onFocusOut={handleFocusOut}
          onInit={handleInit}
        />
      </div>
    </div>
  );
};

export default AdminEstateModificationFormDetailDescription;
