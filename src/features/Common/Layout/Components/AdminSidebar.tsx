import { useTranslation } from 'react-i18next';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import { ADMIN_PATH } from '@constants/urls';
import { SidebarItemType } from '@interfaces/Common/commonTypes';

import LayoutSidebar from './LayoutSidebar';
import LayoutSidebarItem from './LayoutSidebarItem';
import LayoutSidebarWebsite from './LayoutSidebarWebsite';

const AdminSidebar = () => {
  const { pathname } = useLocation();

  const { t } = useTranslation('admin', {
    keyPrefix: 'layout.sidebar',
  });

  const items: SidebarItemType[] = [
    {
      key: 'dashboard',
      icon: <AiOutlineDashboard size={20} />,
      label: t('dashboard'),
      to: ADMIN_PATH.HOME_PATH,
    },
    {
      key: 'category',
      icon: <BiCategory size={20} />,
      label: t('category'),
      to: ADMIN_PATH.CATEGORY_PATH,
    },
    {
      key: 'contact',
      icon: <FiUsers size={20} />,
      label: t('contact'),
      to: ADMIN_PATH.CONTACT_PATH,
    },
  ];

  return (
    <LayoutSidebar>
      <LayoutSidebarWebsite />
      {items.map((item) => (
        <LayoutSidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          to={item.to}
          isActive={pathname === item.to}
        />
      ))}
    </LayoutSidebar>
  );
};

export default AdminSidebar;
