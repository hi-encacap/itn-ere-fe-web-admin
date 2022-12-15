import { TFunction } from 'i18next';
import { number } from 'yup';

import { LocationProvinceWebsiteFormDataType } from '@interfaces/Admin/locationTypes';

import { generateFormSchema } from '@utils/Http/schema';

const locationProvinceFormSchema = (t: TFunction) =>
  generateFormSchema<LocationProvinceWebsiteFormDataType>({
    id: number().required(t('form.id.required')).nullable(),
  });

export { locationProvinceFormSchema };
