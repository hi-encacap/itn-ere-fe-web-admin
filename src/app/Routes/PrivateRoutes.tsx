import { useMemo } from 'react';

import NotFoundError from '../../features/Common/Errors/Components/NotFoundError';
import useSelector from '../../features/Common/Hooks/useSelector';
import { USER_ROLE_ENUM } from '../Constants/enums';

interface PrivateRoutesProps {
  children: JSX.Element;
  requiredRoles?: USER_ROLE_ENUM[];
}

const PrivateRoutes = ({ children, requiredRoles }: PrivateRoutesProps): JSX.Element => {
  const user = useSelector((state) => state.user);
  const userRoleSlugs = useMemo(() => user.roles?.map((role) => role.slug) ?? [], [user]);

  const hasPermissionToAccess = useMemo(() => {
    if (!requiredRoles) {
      return true;
    }

    return requiredRoles.some((role) => userRoleSlugs.includes(role));
  }, [requiredRoles, userRoleSlugs]);

  return hasPermissionToAccess ? children : <NotFoundError />;
};

export default PrivateRoutes;
