import { EstateDataType } from '@interfaces/Admin/estateTypes';

import { CustomTableBodyProps } from '@components/Table/Table';
import TableContentBodyEmptyContent from '@components/Table/TableContentBody/TableContentBodyEmptyContent';

import AdminEstateListTableBodyItem from './TableBodyItem';
import AdminEstateListTableBodyLoading from './TableBodyLoading';

const AdminEstateListTableBody = ({ data, isLoading }: CustomTableBodyProps<EstateDataType>) => {
  if (isLoading) return <AdminEstateListTableBodyLoading />;

  if (!data.length) return <TableContentBodyEmptyContent />;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((item) => {
        return <AdminEstateListTableBodyItem key={item.id} data={item} />;
      })}
    </div>
  );
};

export default AdminEstateListTableBody;
