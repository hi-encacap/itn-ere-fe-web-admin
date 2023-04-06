import { useCallback, useEffect, useRef, useState } from 'react';

import DropdownContainerV2MenuItem, { DropdownMenuItemType } from './DropdownContainerV2MenuItem';

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
    const containerTop = containerRect?.top ?? 0;
    const containerHeight = containerRect?.height ?? 0;
    const windowHeight = window.innerHeight;

    if (containerTop + menuHeight + paddingSize * 3 > windowHeight) {
      return {
        bottom: windowHeight - containerTop + paddingSize,
        top: 'auto',
      };
    }

    return {
      top: containerTop + containerHeight + paddingSize,
      bottom: 'auto',
    };
  }, [containerRect, paddingSize]);

  useEffect(() => {
    if (!containerRect) {
      return;
    }

    setMenuClientRect(getMenuClientRect());

    return () => setMenuClientRect(null);
  }, [containerRect, getMenuClientRect]);

  if (!menuClientRect) {
    return null;
  }

  return (
    <div
      className="fixed w-48 rounded-lg bg-white py-3.5 shadow-center shadow-black/10"
      style={{
        top: menuClientRect?.top,
        left: containerRect?.left,
        bottom: menuClientRect?.bottom,
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
