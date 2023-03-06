import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LocationWardWebsiteFormDataType } from '@interfaces/Admin/locationTypes';
import { AxiosErrorType } from '@interfaces/Common/commonTypes';
import { adminLocationService } from '@services/index';

import { Button } from '@components/Form';
import { Modal } from '@components/Modal';
import { ModalProps } from '@components/Modal/Modal';

import useToast from '@hooks/useToast';
import { formatErrorMessage, setFormError } from '@utils/error';

import AdminLocationDistrictSelector from '@admin/Components/AdminLocationDistrictSelector';
import AdminLocationProvinceSelector from '@admin/Components/AdminLocationProvinceSelector';

import { locationWardFormSchema } from '../../Schemas/locationFormSchema';
import AdminLocationWardModificationWardSelector from './AdminLocationWardModificationWardSelector';

interface AdminLocationWardModificationModalProps extends ModalProps {
  onCreated: () => void;
  onCreateFailed?: () => void;
}

const AdminLocationWardModificationModal = ({
  isOpen,
  onClose,
  onCreated,
  onCreateFailed,
  ...props
}: AdminLocationWardModificationModalProps) => {
  const { t } = useTranslation(['admin'], {
    keyPrefix: 'admin:page.location.ward.modal.modification',
  });
  const { t: tNotification } = useTranslation('admin', {
    keyPrefix: 'admin:page.location.ward.notification.modify',
  });
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: LocationWardWebsiteFormDataType = {
    ghnRefId: null,
    districtCode: null,
    provinceCode: null,
  };

  const {
    control,
    handleSubmit: useFormSubmit,
    reset,
    setError,
    watch,
  } = useForm<LocationWardWebsiteFormDataType>({
    resolver: yupResolver(locationWardFormSchema(t)),
    defaultValues,
  });

  const provinceCode = watch('provinceCode');
  const districtCode = watch('districtCode');

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleSubmit = useFormSubmit((data) => {
    setIsSubmitting(true);

    adminLocationService
      .createWard(data)
      .then(() => {
        toast.success(tNotification('created'));
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
        <AdminLocationProvinceSelector control={control} disabled={isSubmitting} />
        <AdminLocationDistrictSelector
          control={control}
          provinceCode={provinceCode ?? ''}
          disabled={isSubmitting}
        />
        <AdminLocationWardModificationWardSelector
          control={control}
          districtCode={districtCode}
          disabled={isSubmitting}
        />
        <Button type="submit" className="hidden" />
      </form>
    </Modal>
  );
};

export default AdminLocationWardModificationModal;
