import { memo } from "react";

interface AdminConfigWebsitePostInputPlaceholderEmptyProps {
  title: string;
  onClick: VoidFunction;
}

const AdminConfigWebsitePostInputPlaceholderEmpty = ({
  title,
  onClick,
}: AdminConfigWebsitePostInputPlaceholderEmptyProps) => {
  return (
    <div
      className="flex w-full cursor-pointer items-center justify-center py-6 text-sm text-slate-300 hover:text-slate-400"
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <span>{title}</span>
    </div>
  );
};

export default memo(AdminConfigWebsitePostInputPlaceholderEmpty);
