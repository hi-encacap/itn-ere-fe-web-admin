import { ESTATE_STATUS_ENUM } from '@encacap-group/types/dist/re';
import { ReactNode, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

interface AdminEstateListTableBodyItemBadgeProps {
  children: ReactNode;
  status?: ESTATE_STATUS_ENUM;
}

const AdminEstateListTableBodyItemBadge = ({ children, status }: AdminEstateListTableBodyItemBadgeProps) => {
  const classNameByStatus = useMemo(() => {
    if (status === ESTATE_STATUS_ENUM.DRAFT) {
      return 'bg-gray-100 text-gray-700';
    }

    if (status === ESTATE_STATUS_ENUM.UNPUBLISHED) {
      return 'bg-red-100 text-red-700';
    }

    return 'bg-teal-100 text-teal-700';
  }, [status]);

  return (
    <div className={twMerge('inline rounded px-2 pb-0.5 pt-[3px] text-sm', classNameByStatus)}>
      {children}
    </div>
  );
};

export default AdminEstateListTableBodyItemBadge;
