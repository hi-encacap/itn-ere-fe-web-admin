import { Route, Routes } from "react-router-dom";

import AdminEstatePropertyList from "../EstateProperty/AdminEstatePropertyList";
import AdminEstateProxy from "./AdminEstateProxy";

const EstateRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<AdminEstateProxy />} />
      <Route path="properties" element={<AdminEstatePropertyList />} />
    </Routes>
  );
};

export default EstateRoutes;
