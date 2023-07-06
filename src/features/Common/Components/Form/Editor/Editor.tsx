import { omit } from "lodash";
import { useController } from "react-hook-form";

import { HookFormControl } from "@interfaces/Common/commonTypes";

import UncontrolledEditor, { UncontrolledEditorProps } from "./UncontrolledEditor";

export interface EditorProps extends UncontrolledEditorProps {
  control?: HookFormControl;
}

const Editor = ({ control, name, ...inputProps }: EditorProps) => {
  if (!control) {
    return <UncontrolledEditor name={name} {...inputProps} />;
  }

  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledEditor
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      error={error?.message as string}
      {...(value ? { value } : { value: "" })}
      {...omit(inputProps, ["value", "onChange", "onBlur"])}
    />
  );
};

export default Editor;
