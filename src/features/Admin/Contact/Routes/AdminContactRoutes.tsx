import { Route, Routes } from "react-router-dom";

import AdminContactList from "../AdminContactList";

const AdminContactRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminContactList />} />
    </Routes>
  );
};

export default AdminContactRoutes;
