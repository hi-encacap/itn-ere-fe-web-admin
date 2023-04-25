import { omit } from 'lodash';
import { useController } from 'react-hook-form';

import { HookFormControl } from '@interfaces/Common/commonTypes';

import UncontrolledSelect, { UncontrolledSelectProps } from './UncontrolledSelect';

export interface SelectProps extends UncontrolledSelectProps {
  control?: HookFormControl;
  errorFactory?: (error: string) => string | undefined;
}

const Select = ({ control, name, errorFactory, ...inputProps }: SelectProps) => {
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

  const errorMessage = errors[name]?.message as string;

  return (
    <UncontrolledSelect
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      error={errorFactory ? errorFactory(errorMessage) : errorMessage}
      {...(!(value === undefined || value === null) && { value })}
      {...omit(inputProps, ['value', 'onChange', 'onBlur'])}
    />
  );
};

export default Select;
