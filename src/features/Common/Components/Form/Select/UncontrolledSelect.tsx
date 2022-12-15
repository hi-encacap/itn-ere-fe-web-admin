import { random } from 'lodash';
import { HTMLAttributes, useCallback, useMemo, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

import { FormElementBaseProps, SelectOptionItemType } from '@interfaces/Common/elementTypes';

import FormElementError from '../FormElementError';
import SelectOptionDropdown from './SelecOptionDropdown';

export interface UncontrolledSelectProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    FormElementBaseProps {
  options: SelectOptionItemType[];
  value?: SelectOptionItemType['value'];
  disabled?: boolean;
  isRequired?: boolean;
  onChange?: (value: SelectOptionItemType['value']) => void;
}

const UncontrolledSelect = ({
  value,
  label,
  options,
  error,
  className,
  placeholder,
  disabled,
  isRequired,
  onChange,
}: UncontrolledSelectProps) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [isFocusingDropdown, setIsFocusingDropdown] = useState(false);

  const selectLabel = useMemo(() => {
    if (!value) {
      return null;
    }

    const selectedOption = options.find((option) => option.value === value);

    if (!selectedOption) {
      return null;
    }

    return selectedOption.label;
  }, [value, options]);

  const inputId = useMemo(() => `select_${random(100000, 999999)}`, []);

  const handleFocusInput = useCallback(() => {
    setIsShowOptions(true);
  }, []);

  const handleBlurInput = useCallback(() => {
    if (isFocusingDropdown) {
      return;
    }
    setIsShowOptions(false);
  }, [isFocusingDropdown]);

  const handleFocusDropdown = useCallback(() => {
    setIsFocusingDropdown(true);
  }, []);

  const handleBlurDropdown = useCallback(() => {
    setIsFocusingDropdown(false);
  }, []);

  const handleChange = useCallback((newValue: SelectOptionItemType['value']) => {
    onChange?.(newValue);
    setIsShowOptions(false);
    setIsFocusingDropdown(false);
  }, []);

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className={twMerge(
            'relative mb-2 -mt-2 flex items-center text-sm font-semibold text-gray-400',
            error && 'text-red-500',
          )}
        >
          {label}
          {isRequired && <div className="ml-1 text-red-500">*</div>}
        </label>
      )}
      <div
        className={twMerge(
          'group relative inline-block rounded-lg border-2 border-gray-100 focus-within:border-blue-500 hover:border-gray-200 focus-within:hover:border-blue-500',
          error &&
            'border-red-500 focus-within:border-red-500 hover:border-red-500 focus-within:hover:border-red-500',
          className,
        )}
      >
        <input
          id={inputId}
          className={twMerge(
            'block h-full w-full rounded-lg border-none px-4 py-3 outline-none',
            error && 'text-red-500',
            !selectLabel && 'text-input-placeholder',
          )}
          readOnly
          value={selectLabel ?? placeholder}
          disabled={disabled}
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
        />
        <BiChevronDown className="absolute right-3 top-3" size={20} />
        {!disabled && isShowOptions && (
          <SelectOptionDropdown
            value={value}
            options={options}
            onFocus={handleFocusDropdown}
            onBlur={handleBlurDropdown}
            onChange={handleChange}
          />
        )}
      </div>
      {error && <FormElementError error={error} />}
    </div>
  );
};

export default UncontrolledSelect;
