import { PERMISSION_CODE_ENUM } from "@encacap-group/common/dist/account";
import { keys } from "lodash";
import { useMemo } from "react";

import useSelector from "./useSelector";

const usePermission = (): Record<keyof typeof PERMISSION_CODE_ENUM, boolean> => {
  const user = useSelector((state) => state.common.user);
  const userPermissionCodes = useMemo(() => user?.permissions?.map((permission) => permission.code), [user]);
  const permissions = useMemo(
    () =>
      keys(PERMISSION_CODE_ENUM).reduce(
        (acc, key) => ({
          ...acc,
          [key]: userPermissionCodes?.includes(
            PERMISSION_CODE_ENUM[key as keyof typeof PERMISSION_CODE_ENUM],
          ),
        }),
        {} as Record<keyof typeof PERMISSION_CODE_ENUM, boolean>,
      ),
    [userPermissionCodes],
  );

  return permissions;
};

export default usePermission;
