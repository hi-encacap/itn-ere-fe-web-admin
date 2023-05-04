import { IContact } from '@encacap-group/types/dist/re';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@components/Modal';
import { ModalProps } from '@components/Modal/Modal';

import AdminContactList from '@admin/Contact/AdminContactList';

interface AdminEstateModificationFormContactPickerProps extends ModalProps {
  data: IContact | null;
  onPick: (contact: IContact) => void;
}

const AdminEstateModificationFormContactPicker = ({
  data,
  onPick,
  ...props
}: AdminEstateModificationFormContactPickerProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification.form.contact.picker',
  });

  const [isAllowSubmit, setIsAllowSubmit] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

  const handleChangeContactSelection = useCallback((contact: IContact[]) => {
    setSelectedContact(contact[0]);

    if (contact.length === 1) {
      setIsAllowSubmit(true);
      return;
    }

    setIsAllowSubmit(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (!selectedContact) {
      return;
    }

    onPick(selectedContact);
  }, [selectedContact]);

  useEffect(() => {
    if (data && !selectedContact) {
      setSelectedContact(data);
      setIsAllowSubmit(true);
    }
  }, [data]);

  return (
    <Modal
      contentContainerClassName="max-w-4xl w-auto"
      title={t('title')}
      isAllowSubmit={isAllowSubmit}
      onConfirm={handleConfirm}
      {...props}
    >
      <AdminContactList
        defaultSelection={data ? [data] : []}
        isShowTableOnly
        onChangeSelection={handleChangeContactSelection}
      />
    </Modal>
  );
};

export default AdminEstateModificationFormContactPicker;
