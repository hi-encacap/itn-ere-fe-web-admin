import { PERMISSION_CODE_ENUM } from "@encacap-group/common/dist/account";
import { ComponentType } from "react";

import usePermission from "@hooks/usePermission";

const withPermission =
  <P extends object>(
    requiredPermissions: Array<keyof typeof PERMISSION_CODE_ENUM>,
    Component: ComponentType<P>,
  ) =>
  (props: P) => {
    const permissions = usePermission();
    const hasPermission = requiredPermissions.every((permission) => permissions[permission]);

    if (!hasPermission) {
      return null;
    }

    return <Component {...props} />;
  };

export default withPermission;
