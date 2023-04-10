import { ESTATE_STATUS_ENUM } from 'encacap/dist/re';

import { EstateDataType } from '@interfaces/Admin/estateTypes';

import { CustomTableBodyProps } from '@components/Table/Table';
import TableContentBodyEmptyContent from '@components/Table/TableContentBody/TableContentBodyEmptyContent';

import AdminEstateListTableBodyItem from './TableBodyItem';
import AdminEstateListTableBodyLoading from './TableBodyLoading';

const AdminEstateListTableBody = ({
  data,
  isLoading,
  status,
  ...props
}: CustomTableBodyProps<EstateDataType>) => {
  if (isLoading && !data.length) return <AdminEstateListTableBodyLoading />;

  if (!data.length) return <TableContentBodyEmptyContent />;

  return (
    <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading && <div className="absolute inset-0 bg-white bg-opacity-50" />}
      {data.map((item) => (
        <AdminEstateListTableBodyItem
          key={item.id}
          data={item}
          status={status as ESTATE_STATUS_ENUM}
          {...props}
        />
      ))}
    </div>
  );
};

export default AdminEstateListTableBody;
