import { Route, Routes } from "react-router-dom";

import NotFoundError from "@common/Errors/Components/NotFoundError";

import Home from "../Home";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFoundError />} />
    </Routes>
  );
};

export default HomeRoutes;
