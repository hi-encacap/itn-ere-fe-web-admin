import { IBaseListQuery } from '@encacap-group/types/dist/base';
import { IContact } from '@encacap-group/types/dist/re';
import { pick } from 'lodash';

import { ADMIN_CONTACT_API_PATH } from '@constants/apis';
import { ContactFormDataType } from '@interfaces/Admin/contactTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getContacts = async (params?: IBaseListQuery) => {
  const response = await axiosInstance.get(ADMIN_CONTACT_API_PATH.CONTACTS_PATH, {
    params,
  });
  return response.data;
};

const getContactById = async (id: number) => {
  const response = await axiosInstance.get(ADMIN_CONTACT_API_PATH.CONTACT_PATH(id));
  return response.data.data;
};

const createContact = async (data: ContactFormDataType): Promise<IContact> => {
  const response = await axiosInstance.post(ADMIN_CONTACT_API_PATH.CONTACTS_PATH, {
    ...data,
    avatarId: data.avatar?.id,
  });

  return response.data.data;
};

const updateContactById = async (id: number, data: ContactFormDataType): Promise<IContact> => {
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

export { createContact, deleteContactById, getContactById, getContacts, updateContactById };
