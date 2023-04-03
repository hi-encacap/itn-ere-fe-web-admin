import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiTrash2, FiUpload } from 'react-icons/fi';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdAccessTime } from 'react-icons/md';
import striptags from 'striptags';

import { DROPDOWN_MENU_TYPE_ENUM } from '@constants/enums';
import { EstateDataType } from '@interfaces/Admin/estateTypes';

import DropdownContainerV2 from '@components/Dropdown/DropdownContainerV2';
import { DropdownMenuItemType } from '@components/Dropdown/DropdownContainerV2MenuItem';
import { Button } from '@components/Form';

import { getImageURL } from '@utils/helpers';

import AdminEstateListTableBodyItemBadge from './TableBodyItemBadge';

interface AdminEstateListTableBodyItemProps {
  data: EstateDataType;
  onClickDelete?: (data: EstateDataType) => void;
}

const AdminEstateListTableBodyItem = ({ data, onClickDelete }: AdminEstateListTableBodyItemProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.list.table',
  });

  const handleClickDelete = useCallback(() => {
    onClickDelete?.(data);
    console.log('handleClickDelete', data);
  }, [data, onClickDelete]);

  const dropdownMenu = useMemo<DropdownMenuItemType[]>(
    () => [
      {
        icon: <FiUpload />,
        id: 'moveToTop',
        label: t('action.moveToTop'),
        onClick: handleClickDelete,
      },
      {
        icon: <AiOutlineEyeInvisible />,
        id: 'unPublish',
        label: t('action.unPublish'),
        onClick: handleClickDelete,
      },
      { id: 'divider', type: DROPDOWN_MENU_TYPE_ENUM.DIVIDER },
      {
        className: 'text-red-500',
        icon: <FiTrash2 />,
        id: 'delete',
        label: t('action.delete'),
        onClick: handleClickDelete,
      },
    ],
    [handleClickDelete],
  );

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="aspect-video w-full">
        <img src={getImageURL(data.avatar)} alt={data.title} className="h-full w-full object-cover" />
      </div>
      <div className="rounded-b-lg border-2 border-t-0 border-gray-100 px-4 py-4">
        <div className="mb-2 flex items-center justify-start space-x-2">
          {data.customId && (
            <AdminEstateListTableBodyItemBadge>#{data.customId}</AdminEstateListTableBodyItemBadge>
          )}
          <AdminEstateListTableBodyItemBadge>{data.category.name}</AdminEstateListTableBodyItemBadge>
        </div>
        <div>
          <div className="font-semibold">{data.title}</div>
          <div className="mt-1 flex items-center justify-start space-x-2">
            <MdAccessTime />
            <span className="text-sm">
              {t('column.updatedAt', {
                date: dayjs(data.updatedAt).format('DD/MM/YYYY'),
              })}
            </span>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: striptags(data.description),
          }}
          className="mt-3 mb-2.5 overflow-hidden border-t-2 border-gray-100 pt-2 line-clamp-3"
        />
        <div className="flex items-center space-x-4 border-t-2 border-gray-100 pt-4">
          <DropdownContainerV2 menu={dropdownMenu}>
            <Button className="rounded-sm py-2.5" color="light" size="sm">
              <HiDotsHorizontal size={20} />
            </Button>
          </DropdownContainerV2>
          <Button className="flex-1 rounded-sm" size="sm">
            {t('action.edit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminEstateListTableBodyItem;
