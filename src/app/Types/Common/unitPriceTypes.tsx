import { IBaseListQuery } from "@encacap-group/types/dist/base";
import { UNIT_PRICE_TYPE_ENUM } from "@encacap-group/types/dist/re";

export interface UnitPriceGetListQueryType extends IBaseListQuery {
  type?: UNIT_PRICE_TYPE_ENUM;
}
