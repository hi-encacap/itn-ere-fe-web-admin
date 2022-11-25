import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import FormElementError from '../FormElementError';

export interface UncontrolledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  error?: string;
  label?: string | null;
}

const UncontrolledInput = ({
  name,
  id,
  type = 'text',
  className,
  label,
  error,
  ...inputProps
}: UncontrolledInputProps) => {
  const inputId = id ?? name;

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
          'group inline-block h-12 rounded-lg border-none ring-2 ring-gray-100 focus-within:ring-blue-500',
          error && 'ring-red-500 focus-within:ring-red-500',
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
