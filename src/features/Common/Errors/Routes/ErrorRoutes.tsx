import { Route, Routes } from "react-router-dom";

import NotFoundError from "../Components/NotFoundError";
import UnknownError from "../Components/UnknownError";

const ErrorRoutes = () => {
  return (
    <Routes>
      <Route path="404" element={<NotFoundError />} />
      <Route path="unknown" element={<UnknownError />} />
      <Route path="*" element="Error" />
    </Routes>
  );
};

export default ErrorRoutes;
