import { useMemo } from "react";

interface AdminSidebarCategoryIconProps {
  name: string;
}

const AdminSidebarCategoryIcon = ({ name }: AdminSidebarCategoryIconProps) => {
  const firstLetter = useMemo(() => name.charAt(0).toUpperCase(), [name]);

  return (
    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-teal-500 text-xs font-semibold text-white">
      {firstLetter}
    </div>
  );
};

export default AdminSidebarCategoryIcon;
