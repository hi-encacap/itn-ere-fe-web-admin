import { IUnitPrice } from '@encacap-group/types/dist/re';

import { UNIT_PRICE_API_PATH } from '@constants/apis';
import { ResponseWithMetaType } from '@interfaces/Common/commonTypes';
import { UnitPriceGetListQueryType } from '@interfaces/Common/unitPriceTypes';

import axiosInstance from '@utils/Http/axiosInstance';

const getUnitPrices = async (
  query: UnitPriceGetListQueryType,
): Promise<ResponseWithMetaType<IUnitPrice[]>> => {
  const response = await axiosInstance.get(UNIT_PRICE_API_PATH.UNIT_PRICES_PATH, { params: query });
  return response.data;
};

export { getUnitPrices };
