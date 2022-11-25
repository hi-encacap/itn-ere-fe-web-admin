import { TFunction } from 'i18next';
import { object, string } from 'yup';

const authLoginFormSchema = (t: TFunction) =>
  object().shape({
    email: string()
      .required(t('form.email.required') ?? '')
      .email(t('form.email.invalid') ?? ''),
    password: string().required(t('form.password.required') ?? ''),
  });

export { authLoginFormSchema };
