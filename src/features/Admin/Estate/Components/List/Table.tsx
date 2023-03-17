import { SortingState, createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_PAGE_SIZE } from '@constants/defaultValues';
import { EstateDataType } from '@interfaces/Admin/estateTypes';
import { BaseGetListQueryType, TablePaginationType } from '@interfaces/Common/commonTypes';
import { ColumnDef, TableColumnFilterState } from '@interfaces/Common/elementTypes';
import { adminLocationService } from '@services/index';

import Table from '@components/Table/Table';

import AdminEstateListTableBody from './TableBody';

interface AdminEstateListTableProps {
  data: EstateDataType[];
  isLoading: boolean;
}

const AdminEstateListTable = ({ data, isLoading }: AdminEstateListTableProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.list.table',
  });

  const [pagination, setPagination] = useState<TablePaginationType>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [columnSorting, setColumnSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TableColumnFilterState[]>([]);
  const [queryParams, setQueryParams] = useState<BaseGetListQueryType>({
    ...pagination,
  });

  const columnHelper = useMemo(() => createColumnHelper<EstateDataType>(), []);

  const columns: Array<ColumnDef<EstateDataType>> = [
    columnHelper.accessor((row) => row.province, {
      id: 'province',
      header: String(t('column.province')),
      meta: {
        filterBy: 'provinceCode',
        filterValueBy: 'name',
        filterSearchBy: 'code',
        getFilterOptions: adminLocationService.getAllProvinces,
      },
    }),
    columnHelper.accessor((row) => row.district, {
      id: 'district',
      header: String(t('column.district')),
      meta: {
        filterBy: 'districtCode',
        filterValueBy: 'name',
        filterSearchBy: 'code',
        getFilterOptions: adminLocationService.getAllDistricts,
      },
    }),
    columnHelper.accessor((row) => row.ward, {
      id: 'ward',
      header: String(t('column.ward')),
      meta: {
        filterBy: 'wardCode',
        filterValueBy: 'name',
        filterSearchBy: 'code',
        getFilterOptions: adminLocationService.getAllWards,
      },
    }),
  ];

  return (
    <Table
      data={data}
      columns={columns}
      pagination={pagination}
      sorting={columnSorting}
      isLoading={isLoading}
      renderTableBody={(props) => <AdminEstateListTableBody {...props} />}
      onChangePagination={setPagination}
      onChangeSorting={setColumnSorting}
      onChangeFilters={setColumnFilters}
    />
  );
};

export default AdminEstateListTable;
