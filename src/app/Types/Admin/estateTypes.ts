import { Nullable } from '@interfaces/Common/commonTypes';
import { FormImageInputDataType } from '@interfaces/Common/elementTypes';
import { ImageDataType } from '@interfaces/Common/imageTypes';

import { CategoryDataType } from './categoryTypes';
import { LocationDistrictDataType, LocationProvinceDataType, LocationWardDataType } from './locationTypes';

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
  avatar: ImageDataType;
  province: LocationProvinceDataType;
  district: LocationDistrictDataType;
  ward?: LocationWardDataType;
}

export interface EstateModificationFormDataType extends Nullable<Partial<Omit<EstateDataType, 'avatar'>>> {
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
  images: FormImageInputDataType[];
}
