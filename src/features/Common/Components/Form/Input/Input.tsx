import { omit } from 'lodash';
import { useController } from 'react-hook-form';

import { HookFormControl } from '@interfaces/Common/commonTypes';

import UncontrolledInput, { UncontrolledInputProps } from './UncontrolledInput';

export interface InputProps extends UncontrolledInputProps {
  control?: HookFormControl;
}

const Input = ({ control, name, ...inputProps }: InputProps) => {
  if (!control) {
    return <UncontrolledInput name={name} {...inputProps} />;
  }

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledInput
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      error={error?.message as string}
      {...(value ? { value } : { value: '' })}
      {...omit(inputProps, ['value', 'onChange', 'onBlur'])}
    />
  );
};

export default Input;
