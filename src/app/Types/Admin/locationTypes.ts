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
