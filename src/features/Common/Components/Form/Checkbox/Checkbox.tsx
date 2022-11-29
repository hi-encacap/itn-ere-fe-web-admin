import { Control, useController } from 'react-hook-form';

import UncontrolledCheckbox, { UncontrolledCheckboxProps } from './UncontrolledCheckbox';

export interface CheckboxProps extends UncontrolledCheckboxProps {
  control?: Control;
}

const Checkbox = ({ control, name, ...props }: CheckboxProps) => {
  if (!control) {
    return <UncontrolledCheckbox name={name} {...props} />;
  }

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledCheckbox
      name={name}
      checked={value}
      onChange={(event) => onChange(event.target.checked)}
      {...props}
    />
  );
};

export default Checkbox;
