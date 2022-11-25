import { Route, Routes } from 'react-router-dom';

import NotFoundError from '../Components/NotFoundError';

const ErrorRoutes = () => {
  return (
    <Routes>
      <Route path="404" element={<NotFoundError />} />
      <Route path="*" element="Error" />
    </Routes>
  );
};

export default ErrorRoutes;
