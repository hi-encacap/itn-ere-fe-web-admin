import { omit } from 'lodash';
import { Control, useController } from 'react-hook-form';

import UncontrolledInput, { UncontrolledInputProps } from './UncontrolledInput';

export interface InputProps extends UncontrolledInputProps {
  control?: Control;
}

const Input = ({ control, name, ...inputProps }: InputProps) => {
  if (control) {
    const {
      field: { onChange, onBlur, value = '' },
      formState: { errors },
    } = useController({
      name,
      control,
    });

    return (
      <UncontrolledInput
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        error={errors[name]?.message as string}
        {...(!(value === undefined || value === null) && { value })}
        {...omit(inputProps, ['value', 'onChange', 'onBlur'])}
      />
    );
  }

  return <UncontrolledInput name={name} {...inputProps} />;
};

export default Input;
