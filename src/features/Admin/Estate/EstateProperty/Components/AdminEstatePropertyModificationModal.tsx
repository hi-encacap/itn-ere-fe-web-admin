import { yupResolver } from '@hookform/resolvers/yup';
import { keys, omit, pick } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstatePropertyDataType, EstatePropertyFormDataType } from '@interfaces/Admin/estateTypes';
import { AxiosErrorType } from '@interfaces/Common/commonTypes';
import { adminEstatePropertyService } from '@services/index';

import { Button, Input } from '@components/Form';
import Modal, { ModalProps } from '@components/Modal/Modal';

import useToast from '@hooks/useToast';
import { formatErrorMessage, setFormError } from '@utils/error';

import AdminCategorySelector from '@admin/Estate/Components/AdminCategorySelector';
import { estatePropertyFormSchema } from '@admin/Estate/Schemas/estatePropertyFormSchema';

interface ComponentProps extends Omit<ModalProps, 'id'> {
  estateProperty?: EstatePropertyDataType;
  onCreated: () => void;
}

const AdminEstatePropertyModificationModal = ({
  estateProperty,
  onCreated,
  onClose,
  ...props
}: ComponentProps) => {
  const { t } = useTranslation(['admin'], {
    keyPrefix: 'admin:page.estate.property.modal.modification',
  });
  const { t: tNoti } = useTranslation(['admin'], {
    keyPrefix: 'admin:page.estate.property.notification',
  });
  const toast = useToast();
  const defaultValues: EstatePropertyFormDataType = {
    name: '',
    categoryId: null,
  };

  const {
    handleSubmit: useFormSubmit,
    control,
    reset,
    setError,
  } = useForm<EstatePropertyFormDataType>({
    defaultValues,
    resolver: yupResolver(estatePropertyFormSchema(t)),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = useCallback(() => {
    onClose?.();
    reset(defaultValues);
  }, [onClose, reset, defaultValues]);

  const handleCreate = useCallback(
    (data: EstatePropertyFormDataType) => {
      adminEstatePropertyService
        .createEstateProperty(data)
        .then(() => {
          toast.success(tNoti('created'));
          onCreated();
          handleClose();
        })
        .catch((error: AxiosErrorType) => {
          setFormError(error, setError, formatErrorMessage(t, 'form'));
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [onCreated, handleClose, setError, t, tNoti],
  );

  const handleUpdate = useCallback(
    (data: EstatePropertyFormDataType) => {
      adminEstatePropertyService
        .updateEstateProperty(estateProperty?.id as number, data)
        .then(() => {
          toast.success(tNoti('updated'));
          onCreated();
          handleClose();
        })
        .catch((error: AxiosErrorType) => {
          setFormError(error, setError, formatErrorMessage(t, 'form'));
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [estateProperty, onCreated, handleClose, setError, t, tNoti],
  );

  const handleSubmit = useFormSubmit((data) => {
    setIsSubmitting(true);
    if (!estateProperty) {
      handleCreate(data);
      return;
    }
    handleUpdate(data);
  });

  useEffect(() => {
    if (estateProperty) {
      reset(pick(estateProperty, keys(defaultValues)));
    } else {
      reset(defaultValues);
    }
  }, [estateProperty, reset]);

  return (
    <Modal
      title={estateProperty ? t('title.edit') : t('title.create')}
      isLoading={isSubmitting}
      onConfirm={handleSubmit}
      onClose={handleClose}
      {...omit(props, 'onSubmit')}
    >
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <AdminCategorySelector control={control} disabled={isSubmitting} />
        <Input
          name="name"
          control={control}
          label={t('form.name.label')}
          placeholder={t('form.name.placeholder')}
          className="block"
          isRequired
          disabled={isSubmitting}
        />
        <Button type="submit" className="hidden" />
      </form>
    </Modal>
  );
};

export default AdminEstatePropertyModificationModal;
