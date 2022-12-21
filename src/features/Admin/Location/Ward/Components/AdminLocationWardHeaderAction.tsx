import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { Button } from '@components/Form';

interface AdminLocationWardHeaderActionProps {
  onClick?: () => void;
}

const AdminLocationWardHeaderAction = ({ onClick }: AdminLocationWardHeaderActionProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.location.ward.header',
  });

  return (
    <Button size="sm" className="pr-5" onClick={onClick}>
      <MdAdd className="mr-3" size={22} />
      {t('create')}
    </Button>
  );
};

export default AdminLocationWardHeaderAction;
