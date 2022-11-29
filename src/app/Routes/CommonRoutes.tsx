import { useLayoutEffect, useState } from 'react';
import { matchPath, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { USER_ROLE_ENUM } from '@constants/enums';
import { AUTHENTICATION_PATH } from '@constants/urls';
import { authService } from '@services/index';
import { setUser } from '@slices/userSlice';

import { LoadingOverlay } from '@components/Loading';

import AuthRoutes from '@common/Auth/Routes/AuthRoutes';

import useDispatch from '@hooks/useDispatch';
import useSelector from '@hooks/useSelector';

import AdminRoutes from '@admin/Routes/AdminRoutes';

import PrivateRoutes from './PrivateRoutes';

const CommonRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user);
  const location = useLocation();

  const excludeRedirectPaths = ['error/*', 'auth/*'];
  const excludeGetUserPaths = ['auth/*'];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (user.id) {
      setIsLoading(false);
      return;
    }

    const isMatchedExcludeRedirectPath = excludeRedirectPaths.some((path) =>
      matchPath(path, location.pathname),
    );
    const isMatchedGetUserExcludePath = excludeGetUserPaths.some((path) =>
      matchPath(path, location.pathname),
    );

    if (isMatchedGetUserExcludePath) {
      setIsLoading(false);
      return;
    }

    authService
      .getMe()
      .then((data) => {
        return dispatch(setUser(data));
      })
      .catch(() => {
        if (isMatchedExcludeRedirectPath) {
          return;
        }
        navigate(AUTHENTICATION_PATH.LOGIN_PATH);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [location, user]);

  return isLoading ? (
    <LoadingOverlay />
  ) : (
    <Routes>
      <Route
        path="admin/*"
        element={
          <PrivateRoutes requiredRoles={[USER_ROLE_ENUM.ADMIN]}>
            <AdminRoutes />
          </PrivateRoutes>
        }
      />
      <Route path="auth/*" element={<AuthRoutes />} />
    </Routes>
  );
};

export default CommonRoutes;
