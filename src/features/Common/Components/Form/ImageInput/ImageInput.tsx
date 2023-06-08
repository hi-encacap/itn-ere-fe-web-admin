import { useController } from "react-hook-form";

import { HookFormControl } from "@interfaces/Common/commonTypes";

import UncontrolledImageInput, { UncontrolledImageInputProps } from "./UncontrolledImageInput";

export type InputProps = UncontrolledImageInputProps & {
  control?: HookFormControl;
};

const ImageInput = ({ control, name, ...inputProps }: InputProps) => {
  if (!control) {
    return <UncontrolledImageInput name={name} {...inputProps} />;
  }

  const {
    field: { onChange, value = null },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledImageInput
      name={name}
      error={errors[name]?.message as string}
      onChange={onChange}
      {...(!(value === undefined || value === null) && { value })}
      {...inputProps}
    />
  );
};

export default ImageInput;
