import { TFunction } from 'i18next';
import { object, string } from 'yup';

import { ContactFormDataType } from '@interfaces/Admin/contactTypes';

import { generateFormSchema } from '@utils/Http/schema';

const contactFormSchema = (t: TFunction) =>
  generateFormSchema<ContactFormDataType>({
    name: string().required(t('form.name.required')),
    phone: string()
      .required(t('form.phone.required'))
      .matches(/(?<id>0[0-9])+([0-9]{8})\b/g, t('form.phone.invalid')),
    zalo: string()
      .required(t('form.zalo.required'))
      .matches(/(?<id>0[0-9])+([0-9]{8})\b/g, t('form.zalo.invalid')),
    email: string(),
    avatar: object().required(t('form.avatar.required')).nullable(),
  });

export { contactFormSchema };
