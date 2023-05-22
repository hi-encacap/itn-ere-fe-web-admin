import { createSelector } from "@reduxjs/toolkit";

import { USER_ROLE_ENUM } from "@constants/enums";

import { RootState } from "../store";

const userRoleSelector = createSelector(
  (state: RootState) => state.common.user,
  (user) => {
    const roles = user?.roles ?? [];
    const isRoot = roles.some((role) => role.slug === USER_ROLE_ENUM.ROOT);
    const isUser = roles.some((role) => role.slug === USER_ROLE_ENUM.USER);

    return {
      isRoot,
      isUser,
    };
  },
);

export { userRoleSelector };
