import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LocationProvinceWebsiteFormDataType } from '@interfaces/Admin/locationTypes';
import { AxiosErrorType } from '@interfaces/Common/commonTypes';
import { SelectOptionItemType } from '@interfaces/Common/elementTypes';
import { adminLocationService, locationService } from '@services/index';

import { Button, Select } from '@components/Form';
import { Modal } from '@components/Modal';
import { ModalProps } from '@components/Modal/Modal';

import useToast from '@hooks/useToast';
import { formatErrorMessage, setFormError } from '@utils/error';

import { locationProvinceFormSchema } from '../../Schemas/locationFormSchema';

interface AdminLocationProvinceModificationModalProps extends ModalProps {
  onCreated: () => void;
  onCreateFailed?: () => void;
}

const AdminLocationProvinceModificationModal = ({
  isOpen,
  onClose,
  onCreated,
  onCreateFailed,
  ...props
}: AdminLocationProvinceModificationModalProps) => {
  const { t } = useTranslation(['admin'], {
    keyPrefix: 'admin:page.location.province.modal.modification',
  });
  const { t: tNotification } = useTranslation('admin', {
    keyPrefix: 'admin:page.location.province.notification.modify',
  });
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationProvinceOptions, setLocationProvinceOptions] = useState<SelectOptionItemType[]>([]);

  const defaultValues: LocationProvinceWebsiteFormDataType = {
    id: null,
  };

  const {
    control,
    handleSubmit: useFormSubmit,
    reset,
    setError,
  } = useForm<LocationProvinceWebsiteFormDataType>({
    resolver: yupResolver(locationProvinceFormSchema(t)),
    defaultValues,
  });

  const getProvinces = useCallback(() => {
    if (locationProvinceOptions.length === 0) {
      setIsLoading(true);
    }

    locationService
      .getGHNProvinces()
      .then((data) => {
        setLocationProvinceOptions(
          data.map((item) => ({
            value: Number(item.id),
            label: String(item.name),
          })),
        );
        setIsLoading(false);
      })
      .catch(() => {
        setLocationProvinceOptions([]);
      });
  }, [locationProvinceOptions]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleSubmit = useFormSubmit((data) => {
    setIsSubmitting(true);

    adminLocationService
      .createProvince(data)
      .then(() => {
        toast.success(tNotification('provinceCreated'));
        onCreated();
        handleClose();
        setIsSubmitting(false);
      })
      .catch((error: AxiosErrorType) => {
        setFormError(error, setError, formatErrorMessage(t, 'form'));
        setIsSubmitting(false);
        onCreateFailed?.();
      });
  });

  useEffect(() => {
    if (isOpen) {
      getProvinces();
    }
  }, [getProvinces, isOpen]);

  return (
    <Modal
      title={t('title')}
      isOpen={isOpen}
      isLoading={isSubmitting}
      onConfirm={handleSubmit}
      onClose={handleClose}
      {...omit(props, 'onSubmit')}
    >
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <Select
          name="id"
          label={t('form.id.label')}
          placeholder={t('form.id.placeholder')}
          className="block"
          options={locationProvinceOptions}
          isRequired
          control={control}
          disabled={isLoading || isSubmitting}
        />
        <Button type="submit" className="hidden" />
      </form>
    </Modal>
  );
};

export default AdminLocationProvinceModificationModal;
