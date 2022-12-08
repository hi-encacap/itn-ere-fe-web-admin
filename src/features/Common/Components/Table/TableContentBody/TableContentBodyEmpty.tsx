import { useTranslation } from 'react-i18next';
import { BsFolder2Open } from 'react-icons/bs';

export interface TableBodyEmptyProps {
  columns: number;
}

const TableBodyEmpty = ({ columns }: TableBodyEmptyProps) => {
  const { t } = useTranslation(['common'], {
    keyPrefix: 'table.pagination',
  });

  return (
    <tr>
      <td colSpan={columns}>
        <div className="flex flex-col items-center justify-center pt-24 pb-20 text-center text-gray-500">
          <BsFolder2Open size={40} className="text-gray-200" />
          <div className="mt-2 text-gray-300">{t('emptyData')}</div>
        </div>
      </td>
    </tr>
  );
};

export default TableBodyEmpty;
