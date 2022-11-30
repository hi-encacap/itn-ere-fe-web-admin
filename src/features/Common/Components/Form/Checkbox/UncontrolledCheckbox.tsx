import { InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { HiMinusSm } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

export interface UncontrolledCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
  label?: string;
  name: string;
  error?: string;
}

const UncontrolledCheckbox = ({
  className,
  name,
  id,
  checked,
  indeterminate = false,
  disabled = false,
  type = 'checkbox',
  label,
  error,
  onChange,
  ...otherProps
}: UncontrolledCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const iconTouchedClassName = twMerge(
    !indeterminate && !isChecked && 'text-white group-hover:text-primary-700',
    !indeterminate && isChecked && 'text-white group-hover:text-white',
    indeterminate && 'text-primary-700 group-hover:text-primary-700',
    disabled && isChecked && 'text-white group-hover:text-white',
    disabled && !isChecked && 'text-gray-100 group-hover:text-gray-100',
  );

  const iconClassName = twMerge(
    'absolute top-1/2 left-1/2 z-0 mt-px -translate-x-1/2 -translate-y-1/2 text-white group-hover:text-primary-700',
    iconTouchedClassName,
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (checked === undefined || checked === null || !onChange) {
      setIsChecked(e.target.checked);
    }
    onChange?.(e);
  }, []);

  useEffect(() => {
    if (checked !== undefined && checked !== null) {
      setIsChecked(checked);
    }
  }, [checked]);

  return (
    <label
      htmlFor={id ?? name}
      className={twMerge('inline-flex space-x-4', className, 'group items-center justify-start')}
    >
      <div className="relative z-0 inline-block h-5 w-5 rounded-md bg-white">
        <div
          className={twMerge(
            'absolute inset-0 -z-10 h-5 w-5 cursor-pointer rounded-md border-2 border-gray-200 group-hover:border-teal-500',
            error && 'border-red-500',
            isChecked && !indeterminate && !disabled && 'border-teal-500 bg-teal-500',
            indeterminate && !disabled && 'border-teal-500',
            disabled && 'cursor-not-allowed bg-gray-100 group-hover:border-gray-100',
          )}
        />
        {indeterminate ? (
          <HiMinusSm size={20} className={iconClassName} />
        ) : (
          <BsCheck className={iconClassName} size={20} />
        )}
        <input
          type={type}
          name={name}
          id={id ?? name}
          className="relative h-full w-full cursor-pointer opacity-0"
          disabled={disabled}
          onChange={handleChange}
          checked={isChecked}
          {...otherProps}
        />
      </div>
      {label && <div>{label}</div>}
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </label>
  );
};

export default UncontrolledCheckbox;
