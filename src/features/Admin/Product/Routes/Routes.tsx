import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import Product from "../Product";

const AdminProductRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
    </Routes>
  );
};

export default memo(AdminProductRoutes);
