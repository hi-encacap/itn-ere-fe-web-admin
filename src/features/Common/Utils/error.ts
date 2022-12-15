import { TFunction } from 'i18next';
import { camelCase, keys, lowerCase } from 'lodash';
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';

import { AxiosErrorType } from '@interfaces/Common/commonTypes';

type FormatMessageFunction = (key: string, message: string) => string;

const formatErrorMessage = (t: TFunction, prefix?: string) => {
  const prefixMessage = prefix ? `${prefix}.` : '';
  return (key: string, message: string) => t(`${prefixMessage}${key}.${message}`);
};

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

export { setFormError, formatErrorMessage };
