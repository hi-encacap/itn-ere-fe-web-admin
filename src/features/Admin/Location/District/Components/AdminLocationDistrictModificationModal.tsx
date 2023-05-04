import { IAxiosError } from '@encacap-group/types/dist/base';
import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LocationDistrictWebsiteFormDataType } from '@interfaces/Admin/locationTypes';
import { adminLocationService } from '@services/index';

import { Modal } from '@components/Modal';
import { ModalProps } from '@components/Modal/Modal';

import useToast from '@hooks/useToast';
import { formatErrorMessage, setFormError } from '@utils/error';

import AdminLocationProvinceSelector from '@admin/Components/AdminLocationProvinceSelector';

import { locationDistrictFormSchema } from '../../Schemas/locationFormSchema';
import AdminLocationDistrictModificationDistrictSelector from './AdminLocationDistrictModificationDistrictSelector';

interface AdminLocationDistrictModificationModalProps extends ModalProps {
  onCreated: () => void;
  onCreateFailed?: () => void;
}

const AdminLocationDistrictModificationModal = ({
  isOpen,
  onClose,
  onCreated,
  onCreateFailed,
  ...props
}: AdminLocationDistrictModificationModalProps) => {
  const { t } = useTranslation(['admin'], {
    keyPrefix: 'admin:page.location.district.modal.modification',
  });
  const { t: tNotification } = useTranslation('admin', {
    keyPrefix: 'admin:page.location.district.notification.modify',
  });
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: LocationDistrictWebsiteFormDataType = {
    ghnRefId: null,
    provinceCode: null,
  };

  const {
    control,
    handleSubmit: useFormSubmit,
    reset,
    setError,
    watch,
  } = useForm<LocationDistrictWebsiteFormDataType>({
    resolver: yupResolver(locationDistrictFormSchema(t)),
    defaultValues,
  });

  const provinceCode = watch('provinceCode');

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleSubmit = useFormSubmit((data) => {
    setIsSubmitting(true);

    adminLocationService
      .createDistrict(data)
      .then(() => {
        toast.success(tNotification('districtCreated'));
        onCreated();
        handleClose();
        setIsSubmitting(false);
      })
      .catch((error: IAxiosError) => {
        setFormError({ error, setError, formatMessage: formatErrorMessage(t, 'form') });
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
        <AdminLocationDistrictModificationDistrictSelector
          control={control}
          provinceCode={provinceCode}
          disabled={isSubmitting}
        />
        <button type="submit" className="hidden" />
      </form>
    </Modal>
  );
};

export default AdminLocationDistrictModificationModal;
