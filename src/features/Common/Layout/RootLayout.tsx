import LayoutContentWrapper from "./Components/LayoutContentWrapper";
import LayoutHeader from "./Components/LayoutHeader";
import RootSidebar from "./Components/RootSidebar";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div>
      <LayoutHeader />
      <RootSidebar />
      <LayoutContentWrapper>{children}</LayoutContentWrapper>
    </div>
  );
};

export default RootLayout;
