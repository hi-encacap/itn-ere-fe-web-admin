import { userRoleSelector } from "@selectors/commonSliceSelectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ADMIN_PATH, AUTHENTICATION_PATH, ROOT_PATH } from "@constants/urls";
import useSelector from "@hooks/useSelector";

const Home = () => {
  const { isAdmin, isRoot } = useSelector(userRoleSelector);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate(ADMIN_PATH.HOME_PATH);
      return;
    }

    if (isRoot) {
      navigate(ROOT_PATH.HOME_PATH);
      return;
    }

    navigate(AUTHENTICATION_PATH.LOGIN_PATH);
  }, [isAdmin, isRoot, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <h1>Home</h1>
    </div>
  );
};

export default Home;
