import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:pages.dashboard',
  });

  return <div className="flex h-layout w-full items-center justify-center">{t('title')}</div>;
};

export default AdminDashboard;
