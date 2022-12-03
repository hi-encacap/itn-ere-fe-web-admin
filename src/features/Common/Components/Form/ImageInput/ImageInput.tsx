import { omit } from 'lodash';
import { Control, useController } from 'react-hook-form';

import UncontrolledImageInput, { UncontrolledImageInputProps } from './UncontrolledImageInput';

export interface InputProps extends UncontrolledImageInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
}

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
      {...omit(inputProps, ['value', 'onChange', 'onBlur'])}
    />
  );
};

export default ImageInput;
