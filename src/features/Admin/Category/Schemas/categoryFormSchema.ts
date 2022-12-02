import { TFunction } from 'i18next';
import { object, string } from 'yup';

const categoryFormSchema = (t: TFunction) =>
  object().shape({
    name: string().required(t('form.name.required')),
    categoryGroupCode: string().required(t('form.categoryGroupCode.required')),
  });

export { categoryFormSchema };
