import { EstateDataType } from '@interfaces/Admin/estateTypes';

import { CustomTableBodyProps } from '@components/Table/Table';
import TableContentBodyEmptyContent from '@components/Table/TableContentBody/TableContentBodyEmptyContent';

import AdminEstateListTableBodyItem from './TableBodyItem';
import AdminEstateListTableBodyLoading from './TableBodyLoading';

const AdminEstateListTableBody = ({ data, isLoading }: CustomTableBodyProps<EstateDataType>) => {
  if (isLoading) return <AdminEstateListTableBodyLoading />;

  if (!data.length) return <TableContentBodyEmptyContent />;

  return (
    <div className="grid grid-cols-4 gap-6">
      {data.map((item) => {
        return <AdminEstateListTableBodyItem key={item.id} data={item} />;
      })}
    </div>
  );
};

export default AdminEstateListTableBody;
