import { InputHTMLAttributes, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { FormElementSizeType } from '@interfaces/Common/elementTypes';

import FormElementError from '../FormElementError';

export interface UncontrolledInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name: string;
  className?: string;
  error?: string;
  label?: string | null;
  size?: FormElementSizeType;
}

const UncontrolledInput = ({
  name,
  id,
  type = 'text',
  className,
  label,
  size = 'normal',
  error,
  ...inputProps
}: UncontrolledInputProps) => {
  const inputId = id ?? name;

  const inputSizeClassName = useMemo(() => {
    if (size === 'sm') {
      return 'h-10';
    }

    return 'h-12';
  }, [size]);

  return (
    <label htmlFor={inputId}>
      {label && (
        <span
          className={twMerge('mb-2 -mt-2 block text-sm font-medium text-slate-500', error && 'text-red-500')}
        >
          {label}
        </span>
      )}
      <div
        className={twMerge(
          'group inline-block rounded-lg border-2 border-gray-100 focus-within:border-blue-500',
          error && 'border-red-500 focus-within:border-red-500',
          inputSizeClassName,
          className,
        )}
      >
        <input
          name={name}
          id={inputId}
          type={type}
          className={twMerge(
            'block h-full w-full rounded-lg border-none px-4 outline-none',
            error && 'text-red-500',
          )}
          {...inputProps}
        />
      </div>
      {error && <FormElementError error={error} />}
    </label>
  );
};

export default UncontrolledInput;
