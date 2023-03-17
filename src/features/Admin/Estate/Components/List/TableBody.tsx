import { CustomTableBodyProps } from '@components/Table/Table';

const AdminEstateListTableBody = ({ rows }: CustomTableBodyProps) => {
  if (!rows.length) return <div>Empty</div>;

  return (
    <div>
      {rows.map((row) => {
        return <div key={row.id}>{JSON.stringify(row.original)}</div>;
      })}
    </div>
  );
};

export default AdminEstateListTableBody;
