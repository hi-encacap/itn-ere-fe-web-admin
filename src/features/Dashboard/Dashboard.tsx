import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:pages.dashboard',
  });

  return <div className="flex h-screen w-full items-center justify-center">{t('title')}</div>;
};

export default Dashboard;
