import { ESTATE_STATUS_ENUM } from '@encacap-group/types/dist/re';

import { EstateDataType, EstateDraftDataType } from '@interfaces/Admin/estateTypes';

import { ModalProps } from '@components/Modal/Modal';

import AdminEstateCompletedDeleteConfirmationModal from './AdminEstateCompletedDeleteConfirmationModal';
import AdminEstateDraftDeleteConfirmationModal from './AdminEstateDraftDeleteConfirmationModal';

interface AdminEstateDeleteConfirmationModalProps extends Omit<ModalProps, 'title' | 'message'> {
  data: EstateDataType | EstateDraftDataType | null;
  onSuccess: () => void;
}

const AdminEstateDeleteConfirmationModal = ({ data, ...props }: AdminEstateDeleteConfirmationModalProps) => {
  if (data?.status === ESTATE_STATUS_ENUM.DRAFT) {
    return <AdminEstateDraftDeleteConfirmationModal data={data} {...props} />;
  }

  return <AdminEstateCompletedDeleteConfirmationModal data={data} {...props} />;
};

export default AdminEstateDeleteConfirmationModal;
