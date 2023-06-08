import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { UNIT_PRICE_TYPE_ENUM } from "@encacap-group/common/dist/re";

export interface UnitPriceGetListQueryType extends IBaseListQuery {
  type?: UNIT_PRICE_TYPE_ENUM;
}
