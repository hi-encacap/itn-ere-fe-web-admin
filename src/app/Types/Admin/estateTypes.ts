import { Nullable } from '@interfaces/Common/commonTypes';
import { FormImageInputDataType } from '@interfaces/Common/elementTypes';

import { CategoryDataType } from './categoryTypes';

export interface EstatePropertyDataType {
  id: number;
  name: string;
  category: CategoryDataType;
}

export interface EstatePropertyFormDataType extends Nullable<Partial<EstatePropertyDataType>> {
  categoryId: number | null;
}

export interface EstateDataType {
  id: number;
  title: string;
  customId: string;
  price: number;
  area: number;
  address: string;
  addressNote?: string;
  description: string;
}

export interface EstateModificationFormDataType extends Nullable<Partial<EstateDataType>> {
  priceUnitId: number;
  areaUnitId: number;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  quarterCode: string;
  categoryId: number;
  properties: Array<Record<'name' | 'value', string | number>>;
  contactId: number;
  avatar: FormImageInputDataType;
}
