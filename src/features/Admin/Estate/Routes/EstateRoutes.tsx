import { Route, Routes } from 'react-router-dom';

import AdminEstatePropertyList from '../EstateProperty/AdminEstatePropertyList';

const EstateRoutes = () => {
  return (
    <Routes>
      <Route path="properties" element={<AdminEstatePropertyList />} />
    </Routes>
  );
};

export default EstateRoutes;
