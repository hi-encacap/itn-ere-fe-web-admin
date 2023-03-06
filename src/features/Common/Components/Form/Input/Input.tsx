import { omit } from 'lodash';
import { Control, Controller } from 'react-hook-form';

import UncontrolledInput, { UncontrolledInputProps } from './UncontrolledInput';

export interface InputProps extends UncontrolledInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
}

const Input = ({ control, name, ...inputProps }: InputProps) => {
  if (!control) {
    return <UncontrolledInput name={name} {...inputProps} />;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState: { errors } }) => (
        <UncontrolledInput
          name={name}
          ref={field.ref}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          error={errors[name]?.message as string}
          {...omit(inputProps, ['value', 'onChange', 'onBlur'])}
        />
      )}
    />
  );
};

export default Input;
