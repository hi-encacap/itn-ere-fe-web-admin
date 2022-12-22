import { TFunction } from 'i18next';
import { number, string } from 'yup';

import {
  LocationDistrictWebsiteFormDataType,
  LocationProvinceWebsiteFormDataType,
  LocationWardWebsiteFormDataType,
} from '@interfaces/Admin/locationTypes';

import { generateFormSchema } from '@utils/Http/schema';

const locationProvinceFormSchema = (t: TFunction) =>
  generateFormSchema<LocationProvinceWebsiteFormDataType>({
    ghnRefId: number().required(t('form.id.required')).nullable(),
  });

const locationDistrictFormSchema = (t: TFunction) =>
  generateFormSchema<LocationDistrictWebsiteFormDataType>({
    ghnRefId: number().required(t('form.id.required')).nullable(),
    provinceCode: string().required(t('form.provinceId.required')).nullable(),
  });

const locationWardFormSchema = (t: TFunction) =>
  generateFormSchema<LocationWardWebsiteFormDataType>({
    ghnRefId: number().required(t('form.id.required')).nullable(),
    districtCode: string().required(t('form.districtId.required')).nullable(),
    provinceCode: string().required(t('form.provinceId.required')).nullable(),
  });

export { locationProvinceFormSchema, locationDistrictFormSchema, locationWardFormSchema };
