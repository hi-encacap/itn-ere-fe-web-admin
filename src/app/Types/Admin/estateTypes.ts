import { ESTATE_STATUS_ENUM, IEstate } from "@encacap-group/common/dist/re";

import { Nullable } from "@interfaces/Common/commonTypes";
import { FormImageInputDataType } from "@interfaces/Common/elementTypes";

export interface EstatePropertyFormDataType {
  categoryId: number | null;
  name: string | null;
}

export interface EstateFormDataType
  extends Partial<Nullable<Omit<IEstate, "avatar" | "images" | "properties">>> {
  priceUnitId: number | null;
  areaUnitId: number | null;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  quarterCode: string;
  categoryId: number | null;
  properties: Array<Record<"name" | "value", string | number>>;
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
