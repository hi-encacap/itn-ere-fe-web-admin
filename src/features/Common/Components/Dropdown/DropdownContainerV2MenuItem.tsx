import { ReactElement, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

import { DROPDOWN_MENU_TYPE_ENUM } from '@constants/enums';

export interface DropdownMenuItemType {
  icon?: ReactElement;
  id: string;
  className?: string;
  label?: string;
  type?: DROPDOWN_MENU_TYPE_ENUM;
  onClick?: () => void;
  onInteract?: () => void;
}

const DropdownContainerV2MenuItem = ({
  className,
  label,
  icon,
  type,
  onClick,
  onInteract,
}: DropdownMenuItemType) => {
  const handleMouseDown = useCallback(() => {
    onInteract?.();
    onClick?.();
  }, [onClick, onInteract]);

  if (type === DROPDOWN_MENU_TYPE_ENUM.DIVIDER) {
    return <div className="mx-5 my-3 border-t-2 border-gray-100" />;
  }

  return (
    <div
      className={twMerge(
        'flex cursor-pointer items-center justify-start space-x-4 px-5 py-1.5 hover:bg-gray-100',
        className,
      )}
      onMouseDown={handleMouseDown}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default DropdownContainerV2MenuItem;
