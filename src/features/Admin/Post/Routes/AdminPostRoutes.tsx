import { Route, Routes } from "react-router-dom";

import AdminPostList from "../AdminPostList";
import AdminPostModification from "../PostModification/AdminPostModification";

const AdminPostRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPostList />} />
      <Route path=":tabId" element={<AdminPostList />} />
      <Route path="/categories/:categoryId" element={<AdminPostList />} />
      <Route path="/categories/:categoryId/:tabId" element={<AdminPostList />} />
      <Route path="/add" element={<AdminPostModification />} />
      <Route path="/edit" element={<AdminPostModification />} />
    </Routes>
  );
};

export default AdminPostRoutes;
