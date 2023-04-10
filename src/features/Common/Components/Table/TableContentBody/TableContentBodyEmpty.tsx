import TableContentBodyEmptyContent from './TableContentBodyEmptyContent';

export interface TableBodyEmptyProps {
  columns: number;
}

const TableBodyEmpty = ({ columns }: TableBodyEmptyProps) => {
  return (
    <tr>
      <td colSpan={columns}>
        <TableContentBodyEmptyContent />
      </td>
    </tr>
  );
};

export default TableBodyEmpty;
