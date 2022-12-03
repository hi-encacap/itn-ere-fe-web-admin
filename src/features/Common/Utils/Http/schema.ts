import { object } from 'yup';

import { FormValidationSchemaShapeType } from '@interfaces/Common/elementTypes';

const generateFormSchema = <T>(shape: FormValidationSchemaShapeType<T>) =>
  object().shape<FormValidationSchemaShapeType<T>>(shape);

export { generateFormSchema };
