interface AdminEstateListTableBodyItemBadgeProps {
  children: React.ReactNode;
}

const AdminEstateListTableBodyItemBadge = ({ children }: AdminEstateListTableBodyItemBadgeProps) => {
  return (
    <div className="inline rounded bg-teal-100 px-2 pb-0.5 pt-[3px] text-sm text-teal-700">{children}</div>
  );
};

export default AdminEstateListTableBodyItemBadge;
