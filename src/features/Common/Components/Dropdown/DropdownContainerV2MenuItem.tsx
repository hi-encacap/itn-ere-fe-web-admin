import { ReactElement, memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { DropdownMenuTypeEnum } from "@constants/enums";

export interface DropdownMenuItemType {
  icon?: ReactElement;
  id: string;
  className?: string;
  label?: string;
  type?: DropdownMenuTypeEnum;
  onClick?: () => void;
  onInteract?: () => void;
}

const DropdownContainerV2MenuItem = ({
  id,
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

  if (type === DropdownMenuTypeEnum.DIVIDER) {
    return <div className="mx-5 my-3 border-t-2 border-gray-100" />;
  }

  return (
    <div
      className={twMerge(
        "flex cursor-pointer items-center justify-start space-x-4 px-5 py-1.5 hover:bg-gray-100",
        className,
      )}
      key={id}
      role="button"
      tabIndex={0}
      onMouseDown={handleMouseDown}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default memo(DropdownContainerV2MenuItem);
