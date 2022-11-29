import { ImageDataType } from '@interfaces/Common/imageTypes';

export interface CategoryDataType {
  code: string;
  name: string;
  categoryGroupCode: string;
  thumbnail: ImageDataType;
}
