import { SortingState } from '@tanstack/react-table';
import { isEqual } from 'lodash';
import { Key, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_PAGE_SIZE } from '@constants/defaultValues';
import { EstatePropertyDataType } from '@interfaces/Admin/estateTypes';
import { BaseGetListQueryType, TablePaginationType } from '@interfaces/Common/commonTypes';
import { TableColumnFilterState } from '@interfaces/Common/elementTypes';
import { adminEstatePropertyService } from '@services/index';

import Table from '@components/Table/Table';

import LayoutContent from '@common/Layout/Components/LayoutContent';

import { generateColumnFilterObject, setDocumentTitle } from '@utils/helpers';

import createEstatePropertyTableColumns from './Columns/adminEstatePropertyTableColumn';
import AdminEstatePropertyDeletionModal from './Components/AdminEstatePropertyDeletionModal';
import AdminEstatePropertyHeaderAction from './Components/AdminEstatePropertyHeaderAction';
import AdminEstatePropertyModificationModal from './Components/AdminEstatePropertyModificationModal';

const AdminEstatePropertyList = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.property',
  });

  const [estatePropertyData, setEstatePropertyData] = useState<EstatePropertyDataType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationType>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [columnSorting, setColumnSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TableColumnFilterState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useState<BaseGetListQueryType>({
    ...pagination,
  });
  const [selectedProperty, setSelectedProperty] = useState<EstatePropertyDataType | null>(null);
  const [isShowDeleteConfirmationModal, setIsShowDeleteConfirmationModal] = useState(false);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);

  const getEstateProvinceData = useCallback(() => {
    setIsLoading(true);

    adminEstatePropertyService
      .getEstateProperties(queryParams)
      .then(({ data, meta }) => {
        setEstatePropertyData(data);
        setPagination((prev) => ({
          ...prev,
          totalPages: meta.totalPages,
          totalRows: meta.totalRows,
        }));
        setSelectedProperty(null);
      })
      .catch(() => {
        setEstatePropertyData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryParams]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback(
    (id: Key) => {
      const property = estatePropertyData.find((item) => item.id === id);

      setSelectedProperty(property ?? null);
      setIsShowDeleteConfirmationModal(true);
    },
    [estatePropertyData],
  );

  const handleCloseDeleteConfirmationModal = useCallback(() => {
    setIsShowDeleteConfirmationModal(false);
    setSelectedProperty(null);
  }, []);

  const handleClickEditButton = useCallback(
    (id: Key) => {
      const property = estatePropertyData.find((item) => item.id === id);

      setSelectedProperty(property ?? null);
      setIsShowModificationModal(true);
    },
    [estatePropertyData],
  );

  const handleCloseModificationModal = useCallback(() => {
    setIsShowModificationModal(false);
    setSelectedProperty(null);
  }, []);

  useEffect(() => {
    getEstateProvinceData();
  }, [queryParams]);

  useEffect(() => {
    const newQueryParams: BaseGetListQueryType = {
      ...queryParams,
      ...generateColumnFilterObject(columnFilters),
      page: pagination.page,
      limit: pagination.limit,
    };

    if (isEqual(newQueryParams, queryParams)) {
      return;
    }

    setQueryParams(newQueryParams);
  }, [columnFilters, pagination]);

  useLayoutEffect(() => {
    setDocumentTitle(t('title'));
  }, [t]);

  return (
    <LayoutContent
      title={t('title')}
      actions={<AdminEstatePropertyHeaderAction onClick={handleClickAddButton} />}
    >
      <Table
        data={estatePropertyData}
        columns={createEstatePropertyTableColumns(t, {
          onClickDelete: handleClickDeleteButton,
          onClickEdit: handleClickEditButton,
        })}
        pagination={pagination}
        sorting={columnSorting}
        isLoading={isLoading}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
      />
      <AdminEstatePropertyModificationModal
        isOpen={isShowModificationModal}
        estateProperty={selectedProperty ?? undefined}
        onClose={handleCloseModificationModal}
        onCreated={getEstateProvinceData}
      />
      <AdminEstatePropertyDeletionModal
        isOpen={isShowDeleteConfirmationModal}
        id={selectedProperty?.id as number}
        onClose={handleCloseDeleteConfirmationModal}
        onDeleted={getEstateProvinceData}
      />
    </LayoutContent>
  );
};

export default AdminEstatePropertyList;
