import { Nullable } from '@interfaces/Common/commonTypes';
import { FormImageInputDataType } from '@interfaces/Common/elementTypes';
import { ImageDataType } from '@interfaces/Common/imageTypes';

export interface ContactDataType {
  id: number;
  name: string;
  phone: string;
  zalo: string;
  email: string;
  avatarId: string;
  avatar: ImageDataType;
}

export interface ContactFormDataType extends Omit<Nullable<ContactDataType>, 'avatar' | 'id' | 'avatarId'> {
  avatar: FormImageInputDataType | null;
}
