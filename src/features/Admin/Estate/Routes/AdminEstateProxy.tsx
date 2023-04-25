import { useSearchParams } from 'react-router-dom';

import { ESTATE_PROXY_ACTION_ENUM } from '@constants/enums';

import AdminEstateList from '../AdminEstateList';
import AdminEstateModification from '../EstateModification/AdminEstateModification';

const AdminEstateProxy = () => {
  const [searchParams] = useSearchParams();

  const action = searchParams.get('action');
  const id = searchParams.get('id');

  if (action === ESTATE_PROXY_ACTION_ENUM.CREATE) {
    return <AdminEstateModification />;
  }

  if (action === ESTATE_PROXY_ACTION_ENUM.MODIFY && id) {
    return <AdminEstateModification id={Number(id)} />;
  }

  return <AdminEstateList />;
};

export default AdminEstateProxy;
