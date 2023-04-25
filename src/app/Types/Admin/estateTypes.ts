import { ESTATE_STATUS_ENUM } from '@encacap-group/types/dist/re';

import { Nullable } from '@interfaces/Common/commonTypes';
import { FormImageInputDataType } from '@interfaces/Common/elementTypes';
import { EstateQuarterDataType } from '@interfaces/Common/estateQuarterTypes';
import { ImageDataType } from '@interfaces/Common/imageTypes';
import { UnitPriceDataType } from '@interfaces/Common/unitPriceTypes';

import { CategoryDataType } from './categoryTypes';
import { ContactDataType } from './contactTypes';
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
  images: ImageDataType[];
  province: LocationProvinceDataType;
  district: LocationDistrictDataType;
  ward?: LocationWardDataType;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryDataType;
  quarter?: EstateQuarterDataType;
  status: ESTATE_STATUS_ENUM;
  areaUnit: UnitPriceDataType;
  priceUnit: UnitPriceDataType;
  contact: ContactDataType;
  youtubeId?: string;
}

export interface EstateFormDataType extends Partial<Nullable<Omit<EstateDataType, 'avatar' | 'images'>>> {
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

export interface EstateDraftDataType extends Nullable<Partial<EstateDataType>> {
  id: number;
  title: string;
  status: ESTATE_STATUS_ENUM;
}
