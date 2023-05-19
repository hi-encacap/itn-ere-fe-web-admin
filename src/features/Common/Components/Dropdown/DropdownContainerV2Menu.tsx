import { useCallback, useEffect, useRef, useState } from "react";

import DropdownContainerV2MenuItem, { DropdownMenuItemType } from "./DropdownContainerV2MenuItem";

interface DropdownContainerV2MenuProps {
  menu: DropdownMenuItemType[];
  rect: DOMRect | null;
  onInteract: () => void;
}

const DropdownContainerV2Menu = ({ menu, rect: containerRect, onInteract }: DropdownContainerV2MenuProps) => {
  const paddingSize = 16;
  const [menuClientRect, setMenuClientRect] = useState<Record<string, number | string> | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const getMenuClientRect = useCallback(() => {
    const menuRect = menuRef.current?.getBoundingClientRect();
    const menuHeight = menuRect?.height ?? 0;
    const menuWidth = menuRect?.width ?? 0;
    const containerTop = containerRect?.top ?? 0;
    const containerLeft = containerRect?.left ?? 0;
    const containerHeight = containerRect?.height ?? 0;
    const containerWidth = containerRect?.width ?? 0;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    let top: string | number = "auto";
    let bottom: string | number = "auto";
    let left: string | number = "auto";
    let right: string | number = "auto";

    if (containerTop + menuHeight + paddingSize * 3 > windowHeight) {
      top = "auto";
      bottom = windowHeight - containerTop + paddingSize;
    } else {
      top = containerTop + containerHeight + paddingSize;
      bottom = "auto";
    }

    if (containerLeft + menuWidth > windowWidth) {
      left = "auto";
      right = windowWidth - containerLeft - containerWidth - paddingSize;
    } else {
      left = containerLeft;
      right = "auto";
    }

    return {
      top,
      bottom,
      left,
      right,
    };
  }, [containerRect, paddingSize]);

  useEffect(() => {
    if (!containerRect) {
      return undefined;
    }

    setMenuClientRect(getMenuClientRect());

    return () => setMenuClientRect(null);
  }, [containerRect, getMenuClientRect]);

  return (
    <div
      className="fixed w-48 rounded-lg bg-white py-3.5 shadow-center shadow-black/10"
      style={{
        top: menuClientRect?.top,
        left: menuClientRect?.left,
        bottom: menuClientRect?.bottom,
        right: menuClientRect?.right,
      }}
      ref={menuRef}
    >
      {menu.map(({ id, ...props }) => (
        <DropdownContainerV2MenuItem key={id} id={id} onInteract={onInteract} {...props} />
      ))}
    </div>
  );
};

export default DropdownContainerV2Menu;
