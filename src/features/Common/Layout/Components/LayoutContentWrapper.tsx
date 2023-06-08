interface LayoutContentWrapperProps {
  children: React.ReactNode;
}

const LayoutContentWrapper = ({ children }: LayoutContentWrapperProps) => {
  return <div className="mt-20 mb-8 ml-72 min-h-layout w-layout">{children}</div>;
};

export default LayoutContentWrapper;
