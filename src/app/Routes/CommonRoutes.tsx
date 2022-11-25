import { useLayoutEffect, useState } from 'react';
import { matchPath, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import AdminRoutes from '../../features/Admin/Routes/AdminRoutes';
import AuthRoutes from '../../features/Common/Auth/Routes/AuthRoutes';
import { LoadingOverlay } from '../../features/Common/Components/Loading';
import useDispatch from '../../features/Common/Hooks/useDispatch';
import useSelector from '../../features/Common/Hooks/useSelector';
import { USER_ROLE_ENUM } from '../Constants/enums';
import { AUTHENTICATION_PATH } from '../Constants/urls';
import { AuthService } from '../Services';
import { setUser } from '../Slices/userSlice';
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

    AuthService.getMe()
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
        path="*"
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
