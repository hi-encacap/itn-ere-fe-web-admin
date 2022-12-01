import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiAlertTriangle } from 'react-icons/fi';

import { ConfirmationModalStatusType } from '@interfaces/Common/elementTypes';

import { Button } from '@components/Form';

import Modal, { ModalProps } from './Modal';

export interface ConfirmationModalProps extends ModalProps {
  title: string;
  message: string | JSX.Element;
  status?: ConfirmationModalStatusType;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  isOpen,
  status = 'success',
  title,
  message,
  cancelButtonText,
  confirmButtonText,
  onConfirm,
  onClose,
  ...props
}: ConfirmationModalProps) => {
  const { t } = useTranslation(['common'], {
    keyPrefix: 'common:confirmationModal',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickConfirmButton = () => {
    setIsSubmitting(true);
    onConfirm();
  };

  const handleClickCancelButton = () => {
    onClose();
  };

  const getClassNameByStatus = (statusParam: ConfirmationModalStatusType) => {
    if (statusParam === 'success') {
      return 'flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10';
    }
    if (statusParam === 'danger') {
      return 'flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10';
    }
    return 'flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10';
  };

  const getIconClassNameByStatus = (statusParam: ConfirmationModalStatusType) => {
    if (statusParam === 'success') {
      return 'text-green-500';
    }
    if (statusParam === 'danger') {
      return 'text-red-500';
    }
    return 'text-red-500';
  };

  useEffect(() => {
    if (isOpen) {
      setIsSubmitting(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      isShowHeader={false}
      isShowFooter={false}
      contentContainerClassName="max-w-md"
      onClose={onClose}
      {...props}
    >
      <div className="-mx-10 -my-2 pl-6 sm:flex sm:items-start">
        <div className={getClassNameByStatus(status)}>
          <FiAlertTriangle size={18} className={getIconClassNameByStatus(status)} />
        </div>
        <div className="text-center sm:mx-6 sm:mt-0 sm:text-left">
          <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900">{title}</h3>
          <div className="mt-4">
            <p className="whitespace-pre-line text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="-mx-10 mt-9 -mb-8 flex items-center justify-end space-x-6 rounded-b-lg bg-gray-50 px-6 py-5">
        <Button
          type="button"
          size="sm"
          color="light"
          onClick={handleClickCancelButton}
          disabled={isSubmitting}
        >
          {cancelButtonText ?? t('cancelButtonText')}
        </Button>
        <Button
          type="button"
          size="sm"
          className="px-12"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          onClick={handleClickConfirmButton}
        >
          {confirmButtonText ?? t('confirmButtonText')}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
