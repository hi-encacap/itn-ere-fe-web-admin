import { SortingState, createColumnHelper } from '@tanstack/react-table';
import { isEqual } from 'lodash';
import { Key, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_PAGE_SIZE } from '@constants/defaultValues';
import { EstateDataType } from '@interfaces/Admin/estateTypes';
import { BaseGetListQueryType, TablePaginationType } from '@interfaces/Common/commonTypes';
import { ColumnDef, TableColumnFilterState } from '@interfaces/Common/elementTypes';
import { adminLocationService } from '@services/index';

import { ConfirmationModal } from '@components/Modal';
import Table from '@components/Table/Table';

import useToast from '@hooks/useToast';
import { generateColumnFilterObject } from '@utils/helpers';

import AdminEstateListTableBody from './TableBody';

interface AdminEstateListTableProps {
  data: EstateDataType[];
  isLoading: boolean;
  onChangeQueryParams?: (queryParams: BaseGetListQueryType) => void;
  onUnPublish: (estateId: Key) => Promise<void>;
  onMoveToTop: (estateId: Key) => Promise<void>;
}

const AdminEstateListTable = ({
  data,
  isLoading,
  onChangeQueryParams,
  onUnPublish,
  onMoveToTop,
}: AdminEstateListTableProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.list',
  });
  const toast = useToast();

  const [pagination, setPagination] = useState<TablePaginationType>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [columnSorting, setColumnSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TableColumnFilterState[]>([]);
  const [queryParams, setQueryParams] = useState<BaseGetListQueryType>({
    ...pagination,
  });
  const [isShowUnPublishConfirmModal, setIsShowUnPublishConfirmModal] = useState(false);
  const [selectedEstateId, setSelectedEstateId] = useState<Key | null>(null);

  const selectedEstate = useMemo(
    () => data.find((estate) => estate.id === selectedEstateId),
    [data, selectedEstateId],
  );

  const columnHelper = useMemo(() => createColumnHelper<EstateDataType>(), []);

  const columns: Array<ColumnDef<EstateDataType>> = useMemo(
    () => [
      columnHelper.accessor((row) => row.province, {
        id: 'province',
        header: String(t('table.column.province')),
        meta: {
          filterBy: 'provinceCode',
          filterValueBy: 'name',
          filterSearchBy: 'code',
          getFilterOptions: adminLocationService.getAllProvinces,
        },
      }),
      columnHelper.accessor((row) => row.district, {
        id: 'district',
        header: String(t('table.column.district')),
        meta: {
          filterBy: 'districtCode',
          filterValueBy: 'name',
          filterSearchBy: 'code',
          getFilterOptions: adminLocationService.getAllDistricts,
        },
      }),
      columnHelper.accessor((row) => row.ward, {
        id: 'ward',
        header: String(t('table.column.ward')),
        meta: {
          filterBy: 'wardCode',
          filterValueBy: 'name',
          filterSearchBy: 'code',
          getFilterOptions: adminLocationService.getAllWards,
        },
      }),
    ],
    [columnHelper, t],
  );

  const handleInteraction = useCallback(() => {
    onChangeQueryParams?.(queryParams);
  }, [onChangeQueryParams, queryParams]);

  const handleClickUnPublish = useCallback((id: Key) => {
    setIsShowUnPublishConfirmModal(true);
    setSelectedEstateId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowUnPublishConfirmModal(false);
    setSelectedEstateId(null);
  }, []);

  const handleConfirmUnPublish = useCallback(async () => {
    if (!selectedEstateId) {
      return;
    }

    try {
      await onUnPublish(selectedEstateId);
      handleCloseModal();
      toast.success(t('notification.unPublished'));
    } catch (error) {
      toast.error(t('notification.unPublishFailed'));
    }
  }, [selectedEstateId]);

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

  useEffect(() => {
    onChangeQueryParams?.(queryParams);
  }, [queryParams]);

  return (
    <>
      <Table
        data={data}
        columns={columns}
        pagination={pagination}
        sorting={columnSorting}
        isLoading={isLoading}
        tableBodyProps={{
          onClickUnPublish: handleClickUnPublish,
          onMoveToTop,
          onInteraction: handleInteraction,
        }}
        renderTableBody={(props) => <AdminEstateListTableBody {...props} />}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
      />
      <ConfirmationModal
        title={t('publication.title.unPublish', {
          title: selectedEstate?.title,
        })}
        message={t('publication.message.unPublish')}
        isOpen={isShowUnPublishConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmUnPublish}
      />
    </>
  );
};

export default AdminEstateListTable;
