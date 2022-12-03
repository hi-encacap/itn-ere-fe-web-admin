import { omit } from 'lodash';
import { Control, useController } from 'react-hook-form';

import UncontrolledSelect, { UncontrolledSelectProps } from './UncontrolledSelect';

export interface SelectProps extends UncontrolledSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
}

const Select = ({ control, name, ...inputProps }: SelectProps) => {
  if (!control) {
    return <UncontrolledSelect name={name} {...inputProps} />;
  }

  const {
    field: { onChange, onBlur, value = '' },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledSelect
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      error={errors[name]?.message as string}
      {...(!(value === undefined || value === null) && { value })}
      {...omit(inputProps, ['value', 'onChange', 'onBlur'])}
    />
  );
};

export default Select;
