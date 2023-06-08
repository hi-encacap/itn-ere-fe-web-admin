import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export interface DropdownContainerProps {
  children: React.ReactNode;
  className?: string;
  parentRef: React.RefObject<HTMLDivElement | HTMLButtonElement>;
  onClickOutside?: () => void;
}

const DropdownContainer = ({ children, className, parentRef, onClickOutside }: DropdownContainerProps) => {
  useEffect(() => {
    if (parentRef.current === null || parentRef.current === undefined) {
      return undefined;
    }

    const parentElement = parentRef?.current;

    const handleClickOutside = (event: MouseEvent) => {
      if (parentElement.contains(event.target as Node)) {
        return;
      }
      onClickOutside?.();
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [parentRef.current]);

  return (
    <div
      className={twMerge("flex flex-col rounded-lg bg-white text-base shadow-xl shadow-black/10", className)}
    >
      {children}
    </div>
  );
};

export default DropdownContainer;
