import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

import LayoutContent from '@common/Layout/Components/LayoutContent';

import { setDocumentTitle } from '@utils/helpers';

import AdminCategoryHeaderAction from './Components/AdminCategoryHeaderAction';

const AdminCategory = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:pages.category',
  });

  useLayoutEffect(() => {
    setDocumentTitle(t('title'));
  }, [t]);

  return (
    <LayoutContent title={t('title')} actions={<AdminCategoryHeaderAction />}>
      Admin Category
    </LayoutContent>
  );
};

export default AdminCategory;
