import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

export interface LayoutContentTabItemType {
  id: string;
  label: string;
  isSelected?: boolean;
}

interface LayoutContentTabProps extends LayoutContentTabItemType {
  onSelectTab: (id: string) => void;
}

const LayoutContentTabItem = ({ id, isSelected = false, label, onSelectTab }: LayoutContentTabProps) => {
  const handleClick = useCallback(() => {
    onSelectTab(id);
  }, [id, onSelectTab]);

  return (
    <div
      className={twMerge(
        'relative -mb-0.5 cursor-pointer rounded-t-lg border-2 border-b-0 border-transparent px-6 pt-2 pb-2.5 duration-100 hover:border-gray-100 hover:text-teal-500',
        isSelected && 'border-gray-100 bg-white text-teal-500 hover:bg-white hover:text-teal-500',
      )}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      {label}
      <span
        className={twMerge(
          'absolute inset-x-0 bottom-0 border-b-2 border-transparent',
          isSelected && 'inset-x-6 border-teal-500',
        )}
      />
    </div>
  );
};

export default LayoutContentTabItem;
