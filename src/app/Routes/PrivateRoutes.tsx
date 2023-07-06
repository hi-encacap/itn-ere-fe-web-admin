import { useMemo } from "react";

import NotFoundError from "@common/Errors/Components/NotFoundError";
import { UserRoleSlugEnum } from "@constants/enums";
import useSelector from "@hooks/useSelector";

interface PrivateRoutesProps {
  children: JSX.Element;
  requiredRoles?: UserRoleSlugEnum[];
}

const PrivateRoutes = ({ children, requiredRoles }: PrivateRoutesProps): JSX.Element => {
  const user = useSelector((state) => state.common.user);
  const userRoleSlugs = useMemo(() => user?.roles?.map((role) => role.slug) ?? [], [user]);

  const hasPermissionToAccess = useMemo(() => {
    if (!requiredRoles) {
      return true;
    }

    return requiredRoles.some((role) => userRoleSlugs.includes(role));
  }, [requiredRoles, userRoleSlugs]);

  return hasPermissionToAccess ? children : <NotFoundError />;
};

export default PrivateRoutes;
