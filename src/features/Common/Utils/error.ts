import { IAxiosError } from '@encacap-group/types/dist/base';
import { TFunction } from 'i18next';
import { camelCase, keys, lowerCase } from 'lodash';
import { FieldPath, FieldValues, UseFormSetError, UseFormSetFocus } from 'react-hook-form';

type FormatMessageFunction = (key: string, message: string) => string;

interface SetFormErrorParam<T extends FieldValues> {
  error: IAxiosError;
  setError: UseFormSetError<T>;
  formatMessage?: FormatMessageFunction;
  otherwise?: () => void;
  setFocus?: UseFormSetFocus<T>;
  getField?: (field: string) => string;
}

const formatErrorMessage = (t: TFunction, prefix?: string) => {
  const prefixMessage = prefix ? `${prefix}.` : '';
  return (key: string, message: string) => t(`${prefixMessage}${key}.${message}`);
};

const setFormError = <T extends FieldValues>({
  error,
  setError,
  formatMessage,
  setFocus,
  otherwise,
  getField,
}: SetFormErrorParam<T>) => {
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
    const formattedKey = getField?.(key) ?? key;

    if (!firstKey) {
      firstKey = key;
    }

    setError(formattedKey as FieldPath<T>, {
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

export { commonFormErrorFactory, formatErrorMessage, setFormError };
