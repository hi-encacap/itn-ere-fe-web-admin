import { twMerge } from "tailwind-merge";

interface FormElementLabelProps {
  error?: string;
  id?: string;
  isRequired?: boolean;
  label: string;
}

const FormElementLabel = ({ id, label, isRequired, error }: FormElementLabelProps) => {
  return (
    <label
      htmlFor={id}
      className={twMerge(
        "relative -mt-2 mb-2 flex items-center text-sm text-stone-700",
        error && "text-red-500",
      )}
    >
      {label}
      {isRequired && <div className="ml-1 text-red-500">*</div>}
    </label>
  );
};

export default FormElementLabel;
