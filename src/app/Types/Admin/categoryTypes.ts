import { FormImageInputDataType } from '@interfaces/Common/elementTypes';

export interface CategoryFormDataType {
  name: string;
  categoryGroupCode: string;
  thumbnail: FormImageInputDataType | null;
  thumbnailId?: string;
}
