import { TFunction } from 'i18next';
import { number, string } from 'yup';

import { EstatePropertyFormDataType } from '@interfaces/Admin/estateTypes';

import { generateFormSchema } from '@utils/schema';

const estatePropertyFormSchema = (t: TFunction) =>
  generateFormSchema<EstatePropertyFormDataType>({
    categoryId: number().required(t('required')).nullable(),
    name: string().required(t('form.name.required')).nullable(),
  });

export { estatePropertyFormSchema };
