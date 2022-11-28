import { IoCheckmarkCircleSharp, IoInformationCircle, IoWarning } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

import { AlertType } from '../../../../app/Types/Common/elementTypes';

export interface AlertIconProps {
  type: AlertType;
}

const AlertIcon = ({ type }: AlertIconProps) => {
  switch (type) {
    case 'success':
      return <IoCheckmarkCircleSharp size={24} className="text-green-400" />;
    case 'error':
      return <MdCancel size={24} className="text-red-400" />;
    case 'warning':
      return <IoWarning size={24} className="text-yellow-500" />;
    default:
      return <IoInformationCircle size={24} className="text-blue-400" />;
  }
};

export default AlertIcon;
