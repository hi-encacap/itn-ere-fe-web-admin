import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { EstateDraftDataType } from '@interfaces/Admin/estateTypes';
import { adminEstateService } from '@services/index';

import { ConfirmationModal } from '@components/Modal';
import { ModalProps } from '@components/Modal/Modal';

import useToast from '@hooks/useToast';

interface AdminEstateDraftDeleteConfirmationModalProps extends Omit<ModalProps, 'title' | 'message'> {
  data: EstateDraftDataType | null;
  onSuccess: () => void;
}

const AdminEstateDraftDeleteConfirmationModal = ({
  data,
  onSuccess,
  onClose,
  ...props
}: AdminEstateDraftDeleteConfirmationModalProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate',
  });
  const toast = useToast();

  const handleConfirmDelete = useCallback(async () => {
    if (!data) {
      return;
    }

    try {
      await adminEstateService.deleteEstateDraftById(data.id);

      toast.success(t('list.notification.deletedDraft'));

      onSuccess();
    } catch (error) {
      toast.error(t('list.notification.deleteDraftFailed'));
    } finally {
      onClose();
    }
  }, [onSuccess, data, toast, t]);

  return (
    <ConfirmationModal
      title={t('list.deletion.title', { title: data?.title })}
      message={t('list.deletion.message')}
      onConfirm={handleConfirmDelete}
      onClose={onClose}
      {...props}
    />
  );
};

export default AdminEstateDraftDeleteConfirmationModal;
