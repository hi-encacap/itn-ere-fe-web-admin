import { UNIT_PRICE_TYPE_ENUM } from '@constants/enums';

import { BaseGetListQueryType } from './commonTypes';

export interface UnitPriceDataType {
  id: number;
  name: string;
  type: UNIT_PRICE_TYPE_ENUM;
}

export interface UnitPriceGetListQueryType extends BaseGetListQueryType {
  type?: UNIT_PRICE_TYPE_ENUM;
}
