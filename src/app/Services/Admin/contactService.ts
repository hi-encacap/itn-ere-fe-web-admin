import { pick } from 'lodash';

import { ADMIN_CONTACT_API_PATH } from '@constants/apis';
import { ContactDataType, ContactFormDataType } from '@interfaces/Admin/contactTypes';
import { BaseGetListQueryType } from '@interfaces/Common/commonTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getContacts = async (params?: BaseGetListQueryType) => {
  const response = await axiosInstance.get(ADMIN_CONTACT_API_PATH.CONTACTS_PATH, {
    params,
  });
  return response.data;
};

const createContact = async (data: ContactFormDataType): Promise<ContactDataType> => {
  const response = await axiosInstance.post(ADMIN_CONTACT_API_PATH.CONTACTS_PATH, {
    ...data,
    avatarId: data.avatar?.id,
  });

  return response.data.data;
};

const updateContactById = async (id: number, data: ContactFormDataType): Promise<ContactDataType> => {
  const response = await axiosInstance.put(ADMIN_CONTACT_API_PATH.CONTACT_PATH(id), {
    ...pick(data, ['name', 'phone', 'zalo', 'email']),
    avatarId: data.avatar?.id,
  });

  return response.data.data;
};

const deleteContactById = async (id: number) => {
  const response = await axiosInstance.delete(ADMIN_CONTACT_API_PATH.CONTACT_PATH(id));
  return response.data;
};

export { getContacts, createContact, updateContactById, deleteContactById };
