import { ESTATE_STATUS_ENUM } from '@encacap-group/types/dist/re';

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
  createdAt: Date;
  updatedAt: Date;
  category: CategoryDataType;
  status: ESTATE_STATUS_ENUM;
}

export interface EstateFormDataType extends Nullable<Partial<Omit<EstateDataType, 'avatar'>>> {
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

export interface EstateDraftDataType extends Nullable<Partial<EstateDataType>> {
  id: number;
  title: string;
  status: ESTATE_STATUS_ENUM;
}
