import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LocationDistrictWebsiteFormDataType } from '@interfaces/Admin/locationTypes';
import { AxiosErrorType } from '@interfaces/Common/commonTypes';
import { adminLocationService } from '@services/index';

import { Button } from '@components/Form';
import { Modal } from '@components/Modal';
import { ModalProps } from '@components/Modal/Modal';

import useToast from '@hooks/useToast';
import { formatErrorMessage, setFormError } from '@utils/error';

import AdminLocationModificationProvinceSelector from '@admin/Location/Components/AdminLocationModificationProvinceSelector';

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
        <AdminLocationModificationProvinceSelector control={control} disabled={isSubmitting} />
        <AdminLocationDistrictModificationDistrictSelector
          control={control}
          provinceCode={provinceCode}
          disabled={isSubmitting}
        />
        <Button type="submit" className="hidden" />
      </form>
    </Modal>
  );
};

export default AdminLocationDistrictModificationModal;
