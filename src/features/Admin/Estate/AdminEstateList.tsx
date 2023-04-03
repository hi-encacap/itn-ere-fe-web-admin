import { useCallback, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EstateDataType } from '@interfaces/Admin/estateTypes';
import { BaseGetListQueryType } from '@interfaces/Common/commonTypes';
import { adminEstateService } from '@services/index';

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

  const getData = useCallback(async (queryParams: BaseGetListQueryType) => {
    setIsLoading(true);

    try {
      const response = await adminEstateService.getEstates(queryParams);

      setEstateData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useLayoutEffect(() => {
    setDocumentTitle(t('title'));
  }, [t]);

  return (
    <LayoutContent title={t('title')} actions={<AdminEstateListHeaderAction />}>
      <AdminEstateListTable data={estateData} isLoading={isLoading} onChangeQueryParams={getData} />
    </LayoutContent>
  );
};

export default AdminEstateList;
