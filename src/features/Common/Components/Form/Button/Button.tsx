import { twMerge } from 'tailwind-merge';

import { FormElementSizeType } from '@interfaces/Common/elementTypes';

export type ButtonColorType = 'primary' | 'light' | 'blue' | 'orange' | 'gray';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: FormElementSizeType;
  color?: ButtonColorType;
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button = ({
  isLoading,
  children,
  className,
  disabled,
  color = 'primary',
  size = 'normal',
  ...anotherProps
}: ButtonProps) => {
  let colorClassNames = '';
  let sizeClassNames = '';
  let spinnerColorClassNames = '';

  switch (color) {
    case 'light':
      colorClassNames +=
        'bg-white hover:bg-gray-100 text-slate-700 ring-gray-200 disabled:ring-gray-200 disabled:bg-gray-200';
      spinnerColorClassNames += disabled === true ? 'border-white' : 'border-gray-400';
      break;

    default:
      colorClassNames +=
        'bg-teal-500 hover:bg-teal-600 text-white ring-teal-500 disabled:ring-gray-200 disabled:bg-gray-200';
      spinnerColorClassNames += disabled === true ? 'border-white' : 'border-gray-400';
  }

  switch (size) {
    case 'xs':
      sizeClassNames += 'px-2 py-1';
      break;

    case 'sm':
      sizeClassNames += 'px-4 py-2 rounded-md shadow-none drop-shadow-none';
      break;

    default:
      sizeClassNames += 'px-6 py-2';
  }

  return (
    <button
      type="button"
      className={twMerge(
        'rounded-md',
        sizeClassNames,
        'duration-100s font-semibold outline-none ring-2 transition-colors',
        colorClassNames,
        className,
        'flex items-center justify-center',
      )}
      disabled={disabled}
      {...anotherProps}
    >
      {isLoading === true && (
        <div
          className={twMerge(
            'h-4 w-4 border-2',
            spinnerColorClassNames,
            'mr-4 animate-spin rounded-full border-t-transparent',
          )}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
