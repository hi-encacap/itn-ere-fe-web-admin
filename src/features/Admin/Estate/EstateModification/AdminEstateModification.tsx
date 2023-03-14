import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

import LayoutContent from '@common/Layout/Components/LayoutContent';

import { setDocumentTitle } from '@utils/helpers';

import AdminEstateModificationForm from './Components/Form/Form';
import AdminEstateModificationHeaderAction from './Components/HeaderAction';

const AdminEstateModification = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification',
  });

  useLayoutEffect(() => {
    setDocumentTitle(t('title.create'));
  }, [t]);

  return (
    <LayoutContent title={t('title.create')} actions={<AdminEstateModificationHeaderAction />}>
      <div className="grid grid-cols-6">
        <AdminEstateModificationForm />
      </div>
    </LayoutContent>
  );
};

export default AdminEstateModification;
