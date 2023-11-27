import { useLayoutEffect, useMemo, useState } from "react";
import { Route, Routes, matchPath, useLocation, useNavigate } from "react-router-dom";
import HomeRoutes from "src/features/Home/Routes/HomeRoutes";
import RootRoutes from "src/features/Root/Routes/RootRoutes";

import AuthRoutes from "@common/Auth/Routes/AuthRoutes";
import ErrorRoutes from "@common/Errors/Routes/ErrorRoutes";
import { LoadingOverlay } from "@components/Loading";
import { UserRoleSlugEnum } from "@constants/enums";
import { AUTHENTICATION_PATH, ERROR_PATH } from "@constants/urls";
import useDispatch from "@hooks/useDispatch";
import useSelector from "@hooks/useSelector";
import { authService } from "@services/index";
import { setUser } from "@slices/commonSlice";

import AdminRoutes from "@admin/Routes/AdminRoutes";

import PrivateRoutes from "./PrivateRoutes";

const CommonRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.common.user);
  const location = useLocation();

  const excludeRedirectPaths = useMemo(() => ["error/*", "auth/*"], []);
  const excludeGetUserPaths = useMemo(() => ["auth/*"], []);
  const ignoreLoadingPaths = useMemo(() => ["error/*"], []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (user?.id) {
      setIsLoading(false);
      return;
    }

    const isMatchedExcludeRedirectPath = excludeRedirectPaths.some((path) =>
      matchPath(path, location.pathname),
    );
    const isMatchedGetUserExcludePath = excludeGetUserPaths.some((path) =>
      matchPath(path, location.pathname),
    );
    const isMatchedIgnoreLoadingPath = ignoreLoadingPaths.some((path) => matchPath(path, location.pathname));

    if (isMatchedGetUserExcludePath) {
      setIsLoading(false);
      return;
    }

    if (isMatchedIgnoreLoadingPath) {
      setIsLoading(false);
    }

    authService
      .getMe()
      .then((data) => {
        return dispatch(setUser(data));
      })
      .catch((error) => {
        if (isMatchedExcludeRedirectPath) {
          return;
        }

        const { response } = error;

        if (!response) {
          navigate(ERROR_PATH.UNKNOWN_PATH);
          return;
        }

        navigate(AUTHENTICATION_PATH.LOGIN_PATH);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    dispatch,
    excludeGetUserPaths,
    excludeRedirectPaths,
    ignoreLoadingPaths,
    location.pathname,
    navigate,
    user?.id,
  ]);

  return isLoading ? (
    <LoadingOverlay />
  ) : (
    <Routes>
      <Route
        path={`${UserRoleSlugEnum.ROOT}/*`}
        element={
          <PrivateRoutes requiredRoles={[UserRoleSlugEnum.ROOT]}>
            <RootRoutes />
          </PrivateRoutes>
        }
      />
      <Route
        path={`${UserRoleSlugEnum.ADMIN}/*`}
        element={
          <PrivateRoutes requiredRoles={[UserRoleSlugEnum.ADMIN]}>
            <AdminRoutes />
          </PrivateRoutes>
        }
      />
      <Route path="auth/*" element={<AuthRoutes />} />
      <Route path="error/*" element={<ErrorRoutes />} />
      <Route path="*" element={<HomeRoutes />} />
    </Routes>
  );
};

export default CommonRoutes;
