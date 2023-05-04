import { ESTATE_STATUS_ENUM, ICategory, IEstate } from '@encacap-group/types/dist/re';

import { Nullable } from '@interfaces/Common/commonTypes';
import { FormImageInputDataType } from '@interfaces/Common/elementTypes';

export interface EstatePropertyDataType {
  id: number;
  name: string;
  category: ICategory;
}

export interface EstatePropertyFormDataType extends Nullable<Partial<EstatePropertyDataType>> {
  categoryId: number | null;
}

export interface EstateFormDataType extends Partial<Nullable<Omit<IEstate, 'avatar' | 'images'>>> {
  priceUnitId: number | null;
  areaUnitId: number | null;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  quarterCode: string;
  categoryId: number | null;
  properties: Array<Record<'name' | 'value', string | number>>;
  contactId: number | null;
  avatar: FormImageInputDataType;
  images: FormImageInputDataType[];
  draftId?: number;
}

export interface EstateDraftDataType extends Nullable<Partial<IEstate>> {
  id: number;
  title: string;
  status: ESTATE_STATUS_ENUM;
}
