import AdminSidebar from './Components/AdminSidebar';
import LayoutContentWrapper from './Components/LayoutContentWrapper';
import LayoutHeader from './Components/LayoutHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      <LayoutHeader />
      <AdminSidebar />
      <LayoutContentWrapper>{children}</LayoutContentWrapper>
    </div>
  );
};

export default AdminLayout;
