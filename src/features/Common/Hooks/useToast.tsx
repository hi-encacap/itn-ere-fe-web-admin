import { pick } from 'lodash';
import { useCallback, useMemo } from 'react';
import { Id, toast as originalToast, ToastOptions, TypeOptions } from 'react-toastify';

import ToastMessage from '@components/Toast/ToastMessage';

type ToastFunction = (message: string, description?: string, options?: ToastOptions) => Id;

interface ExtendedToastOptions extends ToastOptions {
  message: string;
  description?: string;
  type: TypeOptions;
}

interface ToastReturnType {
  success: ToastFunction;
  error: ToastFunction;
}

const useToast = (defaultOptions?: ToastOptions) => {
  const overriddenOptions: ToastOptions = useMemo(
    () => ({
      ...defaultOptions,
      position: originalToast.POSITION.TOP_RIGHT,
      className: 'toast',
      icon: false,
    }),
    [defaultOptions],
  );

  const showToast = useCallback(
    (options: ExtendedToastOptions) =>
      originalToast(<ToastMessage {...pick(options, ['message', 'description', 'type'])} />, {
        ...overriddenOptions,
        ...options,
      }),
    [defaultOptions],
  );

  const result: ToastReturnType = useMemo(
    () => ({
      success: (message, description, options) =>
        showToast({
          ...options,
          type: originalToast.TYPE.SUCCESS,
          message,
          description,
        }),
      error: (message, description, options) =>
        showToast({
          ...options,
          type: originalToast.TYPE.ERROR,
          message,
          description,
        }),
    }),
    [showToast],
  );

  return result;
};

export default useToast;
