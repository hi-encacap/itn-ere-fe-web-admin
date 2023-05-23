import { Route, Routes } from "react-router-dom";

import SiteConfig from "../SiteConfig/SiteConfig";

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/site" element={<SiteConfig />} />
    </Routes>
  );
};

export default ConfigRoutes;
