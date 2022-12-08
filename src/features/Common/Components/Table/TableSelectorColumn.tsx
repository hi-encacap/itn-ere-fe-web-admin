import { nanoid } from '@reduxjs/toolkit';
import { FormEventHandler } from 'react';

import { Checkbox } from '@components/Form';

export interface TableSelectorColumnProps {
  isSelected?: boolean;
  onToggle: FormEventHandler<HTMLInputElement>;
}

const TableSelectorColumn = ({ isSelected, onToggle }: TableSelectorColumnProps) => {
  return (
    <div className="flex w-5 items-center pt-1">
      <Checkbox name={`tableSelector${nanoid()}`} checked={isSelected} onChange={onToggle} />
    </div>
  );
};

export default TableSelectorColumn;
