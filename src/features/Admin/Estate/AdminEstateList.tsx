import { ESTATE_STATUS_ENUM } from '@encacap-group/types/dist/re';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { EstateDataType } from '@interfaces/Admin/estateTypes';
import { BaseGetListQueryType } from '@interfaces/Common/commonTypes';
import { adminEstateService } from '@services/index';

import LayoutContent from '@common/Layout/Components/LayoutContent';
import { LayoutContentTabItemType } from '@common/Layout/Components/LayoutContentTabItem';

import { setDocumentTitle } from '@utils/helpers';

import AdminEstateListHeaderAction from './Components/List/HeaderAction';
import AdminEstateListTable from './Components/List/Table';

const AdminEstateList = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate',
  });

  const [estateData, setEstateData] = useState<EstateDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTabIdParam = useMemo(
    () => searchParams.get('tab_id') ?? ESTATE_STATUS_ENUM.PUBLISHED,
    [searchParams],
  );

  const tabItems = useMemo<LayoutContentTabItemType[]>(
    () => [
      {
        id: ESTATE_STATUS_ENUM.PUBLISHED,
        label: t('status.published'),
      },
      {
        id: ESTATE_STATUS_ENUM.UNPUBLISHED,
        label: t('status.unpublished'),
      },
      {
        id: ESTATE_STATUS_ENUM.DRAFT,
        label: t('status.draft'),
      },
    ],
    [t],
  );

  const getData = useCallback(async (queryParams: BaseGetListQueryType) => {
    setIsLoading(true);

    try {
      const response = await adminEstateService.getEstates(queryParams);

      setEstateData(response.data);
    } catch (error) {
      setEstateData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChangeTab = useCallback(
    (tabId: string) => {
      searchParams.set('tab_id', tabId);

      setSearchParams(searchParams);
    },
    [searchParams],
  );

  const handleUnPublish = useCallback(adminEstateService.unPublishEstateById, []);

  const handlePublish = useCallback(adminEstateService.publishEstateById, []);

  const handleMoveToTop = useCallback(adminEstateService.moveEstateToTopById, []);

  useLayoutEffect(() => {
    setDocumentTitle(t('list.title'));
  }, [t]);

  return (
    <LayoutContent
      title={t('list.title')}
      actions={<AdminEstateListHeaderAction />}
      tabs={tabItems}
      defaultSelectedTab={selectedTabIdParam}
      onChangeTab={handleChangeTab}
    >
      <AdminEstateListTable
        data={estateData}
        isLoading={isLoading}
        onChangeQueryParams={getData}
        onUnPublish={handleUnPublish}
        onPublish={handlePublish}
        onMoveToTop={handleMoveToTop}
      />
    </LayoutContent>
  );
};

export default AdminEstateList;
