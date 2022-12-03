import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CategoryDataType, CategoryFormDataType } from '@interfaces/Admin/categoryTypes';
import { SelectOptionItemType } from '@interfaces/Common/elementTypes';

import { Button, Input } from '@components/Form';
import ImageInput from '@components/Form/ImageInput/ImageInput';
import Select from '@components/Form/Select/Select';
import Modal, { ModalProps } from '@components/Modal/Modal';

import { categoryFormSchema } from '../Schemas/categoryFormSchema';

interface AdminCategoryModificationModalProps extends ModalProps {
  category?: CategoryDataType;
}

const AdminCategoryModificationModal = ({
  category,
  onClose,
  ...props
}: AdminCategoryModificationModalProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:pages.category.modal.modification',
  });

  const [categoryGroupOptions] = useState<SelectOptionItemType[]>([
    {
      value: '1',
      label: 'Group 1',
    },
    {
      value: '2',
      label: 'Group 2',
    },
  ]);

  const {
    control,
    handleSubmit: useFormSubmit,
    reset,
    watch,
  } = useForm<CategoryFormDataType>({
    resolver: yupResolver(categoryFormSchema(t)),
  });

  const thumbnail = watch('thumbnail');

  const handleSubmit = useFormSubmit((data) => {
    console.log(data);
  });

  const handleClose = useCallback(() => {
    onClose();
    reset();
  }, [onClose]);

  useEffect(() => {
    console.log(thumbnail);
  }, [thumbnail]);

  return (
    <Modal
      title={category ? t('title.edit') : t('title.create')}
      onConfirm={handleSubmit}
      onClose={handleClose}
      {...omit(props, 'onSubmit')}
    >
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <Input
          name="name"
          label={t('form.name.label')}
          placeholder={t('form.name.placeholder')}
          className="block"
          control={control}
        />
        <Select
          name="categoryGroupCode"
          label={t('form.categoryGroupCode.label')}
          placeholder={t('form.categoryGroupCode.placeholder')}
          className="block"
          control={control}
          options={categoryGroupOptions}
        />
        <ImageInput name="thumbnail" label={t('form.thumbnail.label')} control={control} />
        <Button type="submit" className="hidden" />
      </form>
    </Modal>
  );
};

export default AdminCategoryModificationModal;
