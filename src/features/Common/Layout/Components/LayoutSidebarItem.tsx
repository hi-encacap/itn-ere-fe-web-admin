import { cloneElement, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface LayoutSidebarItemProps {
  icon: ReactElement;
  label: string;
  to: string;
  isActive?: boolean;
}

const LayoutSidebarItem = ({ icon, label, to, isActive = false }: LayoutSidebarItemProps) => {
  return (
    <Link
      to={to}
      className={twMerge(
        'relative cursor-pointer rounded-md px-5 py-2 duration-100 hover:bg-gray-100',
        isActive && 'bg-gray-100',
      )}
    >
      {isActive && <div className="absolute left-0 top-2.5 h-5 w-1 rounded-r-sm bg-teal-400" />}
      <div className="flex items-center justify-start space-x-4">
        {cloneElement(icon, {
          className: twMerge('w-5 h-5 block flex-shrink-0', isActive && 'text-teal-400'),
        })}
        <div className={twMerge(isActive && 'text-teal-400')}>{label}</div>
      </div>
    </Link>
  );
};

export default LayoutSidebarItem;
