import { ReactElement, cloneElement, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import DropdownContainerV2Menu from './DropdownContainerV2Menu';
import { DropdownMenuItemType } from './DropdownContainerV2MenuItem';

interface DropdownContainerV2Props {
  children: ReactElement;
  menu: DropdownMenuItemType[];
}

const DropdownContainerV2 = ({ children, menu }: DropdownContainerV2Props) => {
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [isShownMenuDropdown, setIsShownMenuDropdown] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownProvider = useMemo(() => window.document.querySelector('.encacap-dropdown-container'), []);

  const handleClickContainer = useCallback(() => {
    setIsShownMenuDropdown((prevState) => !prevState);
  }, []);

  const handleBlurContainer = useCallback(() => {
    setIsShownMenuDropdown(false);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isShownMenuDropdown) {
      return;
    }

    setContainerRect(containerRef.current.getBoundingClientRect());
  }, [isShownMenuDropdown]);

  if (!dropdownProvider) {
    return children;
  }

  return (
    <>
      {cloneElement(children, {
        ...children.props,
        ref: containerRef,
        role: 'button',
        tabIndex: 0,
        onClick: handleClickContainer,
        onBlur: handleBlurContainer,
      })}
      {isShownMenuDropdown &&
        createPortal(<DropdownContainerV2Menu menu={menu} rect={containerRect} />, dropdownProvider)}
    </>
  );
};

export default memo(DropdownContainerV2);
