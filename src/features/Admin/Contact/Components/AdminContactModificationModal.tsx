import { IContact } from '@encacap-group/types/dist/re';
import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContactFormDataType } from '@interfaces/Admin/contactTypes';
import { AxiosErrorType } from '@interfaces/Common/commonTypes';
import { adminContactService } from '@services/index';

import { Input } from '@components/Form';
import ImageInput from '@components/Form/ImageInput/ImageInput';
import Modal, { ModalProps } from '@components/Modal/Modal';

import { setFormError } from '@utils/error';
import { generateImageFormData } from '@utils/image';

import { contactFormSchema } from '../Schemas/contactFormSchema';

interface AdminContactModificationModalProps extends ModalProps {
  contact: IContact | null;
  onCreated: () => void;
  onCreateFailed: () => void;
  onUpdated: () => void;
  onUpdateFailed: () => void;
}

const AdminContactModificationModal = ({
  contact,
  onClose,
  onCreated,
  onCreateFailed,
  onUpdated,
  onUpdateFailed,
  ...props
}: AdminContactModificationModalProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.contact.modal.modification',
  });

  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    name: '',
    phone: '',
    zalo: '',
    avatar: null,
  };

  const {
    control,
    handleSubmit: useFormSubmit,
    reset,
    setValue,
    setError,
  } = useForm<ContactFormDataType>({
    resolver: yupResolver(contactFormSchema(t)),
    defaultValues,
  });

  const formatErrorMessage = useCallback((key: string, value: string) => {
    return t(`form.${key}.${value}`);
  }, []);

  const updateCategory = useCallback(
    (data: ContactFormDataType) => {
      if (!contact) {
        return;
      }

      setIsLoading(true);

      adminContactService
        .updateContactById(contact.id, data)
        .then(() => {
          onUpdated();
          onClose();
        })
        .catch((error) => {
          setFormError<ContactFormDataType>({
            error,
            setError,
            formatMessage: formatErrorMessage,
            otherwise: onUpdateFailed,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [contact],
  );

  const createContact = useCallback((data: ContactFormDataType) => {
    setIsLoading(true);

    adminContactService
      .createContact(data)
      .then(() => {
        onCreated();
        onClose();
      })
      .catch((error: AxiosErrorType) => {
        setFormError<ContactFormDataType>({
          error,
          setError,
          formatMessage: formatErrorMessage,
          otherwise: onCreateFailed,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = useFormSubmit((data) => {
    if (contact) {
      updateCategory(data);
      return;
    }
    createContact(data);
  });

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  useEffect(() => {
    if (contact !== null) {
      setValue('name', contact.name);
      setValue('phone', contact.phone);
      setValue('zalo', contact.zalo || '');
      setValue('avatar', generateImageFormData(contact.avatar));
    }
  }, [contact]);

  return (
    <Modal
      title={contact ? t('title.edit') : t('title.create')}
      isLoading={isLoading}
      onConfirm={handleSubmit}
      onClose={handleClose}
      {...omit(props, 'onSubmit')}
    >
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <Input
          name="name"
          label={t('form.name.label')}
          placeholder={t('form.name.placeholder')}
          className="block"
          autoComplete="off"
          isRequired
          control={control}
          disabled={isLoading}
        />
        <Input
          name="phone"
          label={t('form.phone.label')}
          placeholder={t('form.phone.placeholder')}
          className="block"
          autoComplete="off"
          isRequired
          control={control}
          disabled={isLoading}
        />
        <Input
          name="zalo"
          label={t('form.zalo.label')}
          placeholder={t('form.zalo.placeholder')}
          className="block"
          autoComplete="off"
          control={control}
          disabled={isLoading}
        />
        <ImageInput name="avatar" label={t('form.avatar.label')} control={control} disabled={isLoading} />
        <button type="submit" className="hidden" />
      </form>
    </Modal>
  );
};

export default AdminContactModificationModal;
