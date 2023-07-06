import { createSelector } from "@reduxjs/toolkit";

import { UserRoleSlugEnum } from "@constants/enums";

import { RootState } from "../store";

const userRoleSelector = createSelector(
  (state: RootState) => state.common.user,
  (user) => {
    const roles = user?.roles ?? [];
    const isRoot = roles.some((role) => role.slug === UserRoleSlugEnum.ROOT);
    const isUser = roles.some((role) => role.slug === UserRoleSlugEnum.USER);
    const isAdmin = roles.some((role) => role.slug === UserRoleSlugEnum.ADMIN);

    return {
      isRoot,
      isUser,
      isAdmin,
      isAuth: isRoot || isUser || isAdmin,
    };
  },
);

export { userRoleSelector };
