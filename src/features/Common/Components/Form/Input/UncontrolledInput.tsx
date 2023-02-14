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
  isRequired?: boolean;
}

const UncontrolledInput = ({
  name,
  id,
  type = 'text',
  className,
  label,
  size = 'normal',
  error,
  isRequired,
  disabled,
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
        <div
          className={twMerge(
            'relative mb-2 -mt-2 flex items-center text-sm text-stone-700',
            error && 'text-red-500',
          )}
        >
          {label}
          {isRequired && <div className="ml-1 text-red-500">*</div>}
        </div>
      )}
      <div
        className={twMerge(
          'group inline-block rounded-lg border-2 border-gray-100 duration-100 focus-within:border-blue-500 hover:border-gray-200 focus-within:hover:border-blue-500',
          error &&
            'border-red-500 focus-within:border-red-500 hover:border-red-500 focus-within:hover:border-red-500',
          inputSizeClassName,
          disabled && 'border-gray-100 hover:border-gray-100',
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
          disabled={disabled}
          {...inputProps}
        />
      </div>
      {error && <FormElementError error={error} />}
    </label>
  );
};

export default UncontrolledInput;
