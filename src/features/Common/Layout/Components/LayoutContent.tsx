interface LayoutContentProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const LayoutContent = ({ title, children, actions }: LayoutContentProps) => {
  return (
    <div className="px-8">
      <div className="flex h-18 items-center justify-between">
        <div className="font-semibold">{title}</div>
        {actions}
      </div>
      <div className="rounded-lg border-2 border-gray-100 p-6 shadow-sm">{children}</div>
    </div>
  );
};

export default LayoutContent;
