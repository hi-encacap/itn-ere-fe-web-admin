import { Editor } from '@tinymce/tinymce-react';
import { EventHandler } from '@tinymce/tinymce-react/lib/cjs/main/ts/Events';
import { useCallback, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { EstateModificationFormDataType } from '@interfaces/Admin/estateTypes';

import FormElementError from '@components/Form/FormElementError';

interface AdminEstateModificationFormDetailDescriptionEditorProps {
  isLoading: boolean;
  isFocusing: boolean;
  onFocusing: (value: boolean) => void;
  onInitialized: () => void;
}

const AdminEstateModificationFormDetailDescriptionEditor = ({
  isLoading = true,
  isFocusing = false,
  onFocusing,
  onInitialized,
}: AdminEstateModificationFormDetailDescriptionEditorProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification.form.detail.form',
  });

  const { control } = useFormContext<EstateModificationFormDataType>();
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name: 'description',
    control,
    defaultValue: '',
  });

  const tinyEditorRef = useRef<Editor>(null);

  const handleChangeEditorContent: EventHandler<unknown> = useCallback((_, editor) => {
    onChange(editor.getContent());
  }, []);

  const handleFocusIn = useCallback(() => {
    onFocusing(true);
  }, [onFocusing]);

  const handleFocusOut = useCallback(() => {
    onFocusing(false);
  }, [onFocusing]);

  const handleInit = useCallback(() => {
    onInitialized();
  }, [onInitialized]);

  return (
    <>
      <div
        className={twMerge(
          'relative mb-2 -mt-2 flex items-center text-sm text-stone-700',
          error?.message && 'text-red-500',
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
          error?.message && 'border-red-500 hover:border-red-500',
        )}
      >
        <Editor
          apiKey={process.env.REACT_APP_TINY_API_KEY ?? ''}
          ref={tinyEditorRef}
          init={{
            height: 288,
            menubar: false,
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family: Source Sans Pro,sans-serif; font-size: 14px }',
          }}
          onChange={handleChangeEditorContent}
          onFocusIn={handleFocusIn}
          onFocusOut={handleFocusOut}
          onInit={handleInit}
        />
      </div>
      {error?.message && <FormElementError error={error?.message} />}
    </>
  );
};

export default AdminEstateModificationFormDetailDescriptionEditor;
