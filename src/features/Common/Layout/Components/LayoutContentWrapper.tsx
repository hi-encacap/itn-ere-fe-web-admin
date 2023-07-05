interface LayoutContentWrapperProps {
  children: React.ReactNode;
}

const LayoutContentWrapper = ({ children }: LayoutContentWrapperProps) => {
  return <div className="mb-8 ml-72 mt-20 min-h-layout w-layout">{children}</div>;
};

export default LayoutContentWrapper;
