import { omit } from "lodash";
import { memo } from "react";
import { useController } from "react-hook-form";

import { HookFormControl } from "@interfaces/Common/commonTypes";

import UncontrolledTextarea, { UncontrolledTextareaProps } from "./UncontrolledTextarea";

export interface TextareaProps extends UncontrolledTextareaProps {
  control?: HookFormControl;
}

const Textarea = ({ control, name, ...inputProps }: TextareaProps) => {
  if (!control) {
    return <UncontrolledTextarea name={name} {...inputProps} />;
  }

  const {
    field: { onChange, onBlur, value, ref },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledTextarea
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      error={(errors[name]?.message as string) ?? ""}
      {...(value ? { value } : { value: "" })}
      {...omit(inputProps, ["value", "onChange", "onBlur"])}
    />
  );
};

export default memo(Textarea);
