import { useTranslation } from 'react-i18next';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { TiContacts } from 'react-icons/ti';
import { useLocation } from 'react-router-dom';

import { ADMIN_PATH } from '@constants/urls';

import LayoutSidebar from './LayoutSidebar';
import LayoutSidebarItem from './LayoutSidebarItem';
import LayoutSidebarWebsite from './LayoutSidebarWebsite';

const AdminSidebar = () => {
  const { pathname } = useLocation();

  const { t } = useTranslation('admin', {
    keyPrefix: 'layout.sidebar',
  });

  return (
    <LayoutSidebar>
      <LayoutSidebarWebsite />
      <LayoutSidebarItem
        icon={<AiOutlineDashboard size={20} />}
        label={t('dashboard')}
        to={ADMIN_PATH.HOME_PATH}
        isActive={pathname === ADMIN_PATH.HOME_PATH}
      />
      <LayoutSidebarItem
        icon={<BiCategory size={20} />}
        label={t('categories')}
        to={ADMIN_PATH.CATEGORY_PATH}
        isActive={pathname === ADMIN_PATH.CATEGORY_PATH}
      />
      <LayoutSidebarItem
        icon={<TiContacts size={20} />}
        label={t('contacts')}
        to={ADMIN_PATH.CONTACT_PATH}
        isActive={pathname === ADMIN_PATH.CONTACT_PATH}
      />
    </LayoutSidebar>
  );
};

export default AdminSidebar;
