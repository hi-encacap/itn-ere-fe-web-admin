import { ReactNode, Ref, TextareaHTMLAttributes, forwardRef, memo } from "react";
import { FiInfo } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import { FormElementSizeType } from "@interfaces/Common/elementTypes";

import FormElementError from "../FormElementError";

export interface UncontrolledTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  name: string;
  className?: string;
  error?: string;
  label?: string | null;
  size?: FormElementSizeType;
  isRequired?: boolean;
  description?: ReactNode;
}

const UncontrolledTextarea = (
  {
    name,
    id,
    className,
    label,
    size = "normal",
    error,
    isRequired,
    disabled,
    description,
    ...inputProps
  }: UncontrolledTextareaProps,
  ref: Ref<HTMLTextAreaElement>,
) => {
  const inputId = id ?? name;

  return (
    <label htmlFor={inputId}>
      {label && (
        <div
          className={twMerge(
            "relative mb-2 -mt-2 flex items-center text-sm text-stone-700",
            error && "text-red-500",
          )}
        >
          {label}
          {isRequired && <div className="ml-1 text-red-500">*</div>}
        </div>
      )}
      <div
        className={twMerge(
          "group inline-block rounded-lg border-2 border-gray-100 duration-100 focus-within:border-blue-500 hover:border-gray-200 focus-within:hover:border-blue-500",
          error &&
            "border-red-500 focus-within:border-red-500 hover:border-red-500 focus-within:hover:border-red-500",
          disabled && "border-gray-100 hover:border-gray-100",
          className,
        )}
      >
        <textarea
          name={name}
          id={inputId}
          className={twMerge(
            "block h-full w-full rounded-lg border-none px-4 pt-2.5 outline-none",
            error && "text-red-500",
          )}
          disabled={disabled}
          ref={ref}
          {...inputProps}
        />
      </div>
      {error && <FormElementError error={error} />}
      {!error && description && (
        <div className="mt-2 flex items-start space-x-2 text-slate-400">
          <FiInfo size={14} className="mt-0.5 flex-shrink-0" />
          <span className="-mb-2 text-sm">{description}</span>
        </div>
      )}
    </label>
  );
};

export default memo(forwardRef(UncontrolledTextarea));
