import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EstateDataType } from '@interfaces/Admin/estateTypes';

import LayoutContent from '@common/Layout/Components/LayoutContent';

import { setDocumentTitle } from '@utils/helpers';

import AdminEstateListHeaderAction from './Components/List/HeaderAction';
import AdminEstateListTable from './Components/List/Table';

const AdminEstateList = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.list',
  });

  const [estateData, setEstateData] = useState<EstateDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    setDocumentTitle(t('title'));
  }, [t]);

  return (
    <LayoutContent title={t('title')} actions={<AdminEstateListHeaderAction />}>
      <AdminEstateListTable data={estateData} isLoading={isLoading} />
    </LayoutContent>
  );
};

export default AdminEstateList;
