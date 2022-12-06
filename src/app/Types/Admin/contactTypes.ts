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
