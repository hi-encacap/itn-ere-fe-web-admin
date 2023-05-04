import { ILocationDistrict, ILocationProvince, ILocationWard } from '@encacap-group/types/dist/re';

import { BaseGetListQueryType } from '@interfaces/Common/commonTypes';

export interface LocationProvinceWebsiteDataType {
  provinceCode: string;
  websiteId: number;
  province: ILocationProvince;
}

export interface LocationProvinceWebsiteFormDataType {
  ghnRefId: number | null;
}

export interface LocationDistrictWebsiteDataType {
  districtCode: string;
  websiteId: number;
  district: ILocationDistrict;
}

export interface LocationDistrictWebsiteFormDataType {
  ghnRefId: number | null;
  provinceCode: string | null;
}

export interface LocationDistrictGetListQueryType extends BaseGetListQueryType {
  provinceCode?: string;
}

export interface LocationWardWebsiteDataType {
  code: string;
  name: string;
  districtCode: string;
  district: ILocationDistrict;
}

export interface LocationWardWebsiteFormDataType {
  ghnRefId: number | null;
  districtCode: string | null;
  provinceCode: string | null;
}

export interface LocationWardGetListQueryType extends BaseGetListQueryType {
  districtCode?: string;
}

export interface LocationAddressBookDataType {
  id: number;
  address: string;
  wardCode: string;
  districtCode: string;
  provinceCode: string;
  ward: ILocationWard;
  district: ILocationDistrict;
  province: ILocationProvince;
  websiteId: number;
  latitude: number | null;
  longitude: number | null;
}
