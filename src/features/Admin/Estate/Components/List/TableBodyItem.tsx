import dayjs from 'dayjs';
import { IoTimeOutline } from 'react-icons/io5';

import { EstateDataType } from '@interfaces/Admin/estateTypes';

import { getImageURL } from '@utils/helpers';

interface AdminEstateListTableBodyItemProps {
  data: EstateDataType;
}

const AdminEstateListTableBodyItem = ({ data }: AdminEstateListTableBodyItemProps) => {
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="aspect-video w-full">
        <img src={getImageURL(data.avatar)} alt={data.title} className="h-full w-full object-cover" />
      </div>
      <div className="rounded-b-lg border-2 border-t-0 border-gray-100 px-4 py-3">
        <div className="font-semibold">{data.title}</div>
        <div className="mt-1 flex items-center justify-start space-x-2">
          <IoTimeOutline />
          <span className="text-sm">{dayjs(data.updatedAt).format('DD/MM/YYYY')}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminEstateListTableBodyItem;
