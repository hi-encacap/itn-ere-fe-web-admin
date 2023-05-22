import { IResponseWithMeta } from "@encacap-group/common/dist/base";
import { IUnitPrice } from "@encacap-group/common/dist/re";

import { UNIT_PRICE_API_PATH } from "@constants/apis";
import { UnitPriceGetListQueryType } from "@interfaces/Common/unitPriceTypes";

import axiosInstance from "@utils/Http/axiosInstance";

const getUnitPrices = async (query: UnitPriceGetListQueryType): Promise<IResponseWithMeta<IUnitPrice[]>> => {
  const response = await axiosInstance.get(UNIT_PRICE_API_PATH.UNIT_PRICES_PATH, { params: query });
  return response.data;
};

export { getUnitPrices };
