import { UNIT_PRICE_TYPE_ENUM } from '@encacap-group/types/dist/re';

import { BaseGetListQueryType } from './commonTypes';

export interface UnitPriceGetListQueryType extends BaseGetListQueryType {
  type?: UNIT_PRICE_TYPE_ENUM;
}
