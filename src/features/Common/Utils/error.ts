import { camelCase, keys, lowerCase } from 'lodash';
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

import { AxiosErrorType } from '@interfaces/Common/commonTypes';

type FormatMessageFunction = (key: string, message: string) => string;

const setFormError = <T extends FieldValues>(
  error: AxiosErrorType,
  setError: UseFormSetError<T>,
  formatMessage?: FormatMessageFunction,
  otherwise?: () => void,
) => {
  const { response } = error;

  if (!response) {
    otherwise?.();
    return;
  }

  const {
    data: {
      error: { field },
    },
  } = response;

  keys(field).forEach((key) => {
    const value = field[key][0];
    setError(key as FieldPath<T>, {
      message: formatMessage ? formatMessage(camelCase(lowerCase(key)), camelCase(lowerCase(value))) : value,
    });
  });
};

export { setFormError };
