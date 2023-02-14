interface AdminEstateModificationFormTitleProps {
  title: string;
}

const AdminEstateModificationFormTitle = ({ title }: AdminEstateModificationFormTitleProps) => {
  return <div className="font-semibold text-teal-500">{title}</div>;
};

export default AdminEstateModificationFormTitle;
