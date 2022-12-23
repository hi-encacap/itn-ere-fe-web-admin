import { omit } from 'lodash';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { adminLocationService } from '@services/index';

import { ConfirmationModal } from '@components/Modal';
import { ConfirmationModalProps } from '@components/Modal/ConfirmationModal';

import useToast from '@hooks/useToast';

interface ComponentProps extends Omit<ConfirmationModalProps, 'id' | 'title' | 'message' | 'onConfirm'> {
  id: number;
  onDeleted: () => void;
  onDeleteFailed?: () => void;
}

const AdminLocationAddressBookDeleteConfirmationModal = ({
  isOpen,
  id,
  onDeleted,
  onClose,
  onDeleteFailed,
  ...props
}: ComponentProps) => {
  const { t } = useTranslation(['admin'], {
    keyPrefix: 'admin:page.location.addressBook',
  });

  const toast = useToast();

  const handleDeleteContact = useCallback(() => {
    if (!id) return;

    adminLocationService
      .deleteAddressBookById(id)
      .then(() => {
        onDeleted();
        toast.success(t('notification.delete.deleted'));
      })
      .catch(() => {
        onDeleteFailed?.();
        toast.error(t('notification.delete.deleteFailed'));
      })
      .finally(() => {
        onClose();
      });
  }, [id, onClose, onDeleted, onDeleteFailed]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      status="danger"
      title={t('modal.delete.title')}
      message={t('modal.delete.message')}
      onConfirm={handleDeleteContact}
      onClose={onClose}
      {...omit(props, 'title', 'message')}
    />
  );
};

export default AdminLocationAddressBookDeleteConfirmationModal;
