import { TFunction } from 'i18next';
import { number, string } from 'yup';

import {
  LocationDistrictWebsiteFormDataType,
  LocationProvinceWebsiteFormDataType,
} from '@interfaces/Admin/locationTypes';

import { generateFormSchema } from '@utils/Http/schema';

const locationProvinceFormSchema = (t: TFunction) =>
  generateFormSchema<LocationProvinceWebsiteFormDataType>({
    id: number().required(t('form.id.required')).nullable(),
  });

const locationDistrictFormSchema = (t: TFunction) =>
  generateFormSchema<LocationDistrictWebsiteFormDataType>({
    id: number().required(t('form.id.required')).nullable(),
    provinceCode: string().required(t('form.provinceId.required')).nullable(),
  });

export { locationProvinceFormSchema, locationDistrictFormSchema };
