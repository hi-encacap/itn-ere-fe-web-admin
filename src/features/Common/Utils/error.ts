import { TFunction } from 'i18next';
import { camelCase, keys, lowerCase } from 'lodash';
import { FieldPath, FieldValues, UseFormSetError, UseFormSetFocus } from 'react-hook-form';

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
  setFocus?: UseFormSetFocus<T>,
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
  let firstKey = '';

  keys(field).forEach((key) => {
    const value = field[key][0];

    if (!firstKey) {
      firstKey = key;
    }

    setError(key as FieldPath<T>, {
      message: formatMessage ? formatMessage(camelCase(lowerCase(key)), camelCase(lowerCase(value))) : value,
    });
  });

  setFocus?.(firstKey as FieldPath<T>);
};

const commonFormErrorFactory = (t: TFunction, prefix?: string) => {
  return (error?: string) => {
    if (!error) {
      return error;
    }

    const errorKey = error.split('.').at(-1);

    return t(`${prefix ? `${prefix}.` : ''}${errorKey ?? error}`);
  };
};

export { setFormError, formatErrorMessage, commonFormErrorFactory };
