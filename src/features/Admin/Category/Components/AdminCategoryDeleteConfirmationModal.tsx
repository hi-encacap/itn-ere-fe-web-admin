import { omit } from 'lodash';
import { useTranslation } from 'react-i18next';

import { ConfirmationModal } from '@components/Modal';
import { ConfirmationModalProps } from '@components/Modal/ConfirmationModal';

import AdminCategoryDeleteConfirmationModalContent from './AdminCategoryDeleteConfirmationModalContent';

interface AdminCategoryDeleteConfirmationModalProps
  extends Omit<ConfirmationModalProps, 'title' | 'message'> {
  categoryCode?: string;
}

const AdminCategoryDeleteConfirmationModal = ({
  isOpen,
  ...props
}: AdminCategoryDeleteConfirmationModalProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:pages.category.modal.delete',
  });

  return (
    <ConfirmationModal
      isOpen={isOpen}
      status="danger"
      title={t('title')}
      message={<AdminCategoryDeleteConfirmationModalContent />}
      {...omit(props, 'title', 'message')}
    />
  );
};

export default AdminCategoryDeleteConfirmationModal;
