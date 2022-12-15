export interface LocationProvinceDataType {
  code: string;
  name: string;
  ghnRefId: number;
}

export interface LocationProvinceWebsiteDataType {
  provinceCode: string;
  websiteId: number;
  province: LocationProvinceDataType;
}

export interface LocationProvinceWebsiteFormDataType {
  id: number | null;
}

export interface LocationDistrictDataType {
  code: string;
  name: string;
  provinceCode: string;
  ghnRefId: number;
  province: LocationProvinceDataType;
}

export interface LocationDistrictWebsiteDataType {
  districtCode: string;
  websiteId: number;
  district: LocationDistrictDataType;
}

export interface LocationDistrictWebsiteFormDataType {
  id: number | null;
  provinceId: number | null;
}
