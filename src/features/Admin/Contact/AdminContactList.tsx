import { SortingState } from '@tanstack/react-table';
import { isEqual } from 'lodash';
import { Key, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_PAGE_SIZE } from '@constants/defaultValues';
import { ContactDataType } from '@interfaces/Admin/contactTypes';
import { BaseQueryParamsType, TablePaginationType } from '@interfaces/Common/commonTypes';
import { TableColumnFilterState } from '@interfaces/Common/elementTypes';
import { adminContactService } from '@services/index';

import Table from '@components/Table/Table';

import LayoutContent from '@common/Layout/Components/LayoutContent';

import { generateColumnFilterObject, setDocumentTitle } from '@utils/helpers';

import createContactTableColumns from './Columns/adminContactTableColumn';
import AdminContactHeaderAction from './Components/AdminContactHeaderAction';

const AdminContactList = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.contact',
  });

  const [contactData, setContactData] = useState<ContactDataType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationType>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [columnSorting, setColumnSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<TableColumnFilterState[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useState<BaseQueryParamsType>({
    ...pagination,
  });

  const getContactData = useCallback(() => {
    setIsLoading(true);

    adminContactService
      .getContacts(queryParams)
      .then(({ data, meta }) => {
        setContactData(data);
        setPagination((prev) => ({
          ...prev,
          totalPages: meta.totalPages,
          totalRows: meta.totalRows,
        }));
      })
      .catch(() => {
        setContactData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryParams]);

  const handleClickAddButton = useCallback(() => {
    console.log('Add button clicked');
  }, []);

  const handleClickEditButton = useCallback((id: Key) => {
    console.log('Edit button clicked', id);
  }, []);

  const handleClickDeleteButton = useCallback((id: Key) => {
    console.log('Delete button clicked', id);
  }, []);

  useEffect(() => {
    getContactData();
  }, [queryParams]);

  useEffect(() => {
    const newQueryParams: BaseQueryParamsType = {
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
    <LayoutContent title={t('title')} actions={<AdminContactHeaderAction onClick={handleClickAddButton} />}>
      <Table
        data={contactData}
        columns={createContactTableColumns(t, {
          onClickEdit: handleClickEditButton,
          onClickDelete: handleClickDeleteButton,
        })}
        pagination={pagination}
        sorting={columnSorting}
        isLoading={isLoading}
        onChangePagination={setPagination}
        onChangeSorting={setColumnSorting}
        onChangeFilters={setColumnFilters}
      />
    </LayoutContent>
  );
};

export default AdminContactList;
