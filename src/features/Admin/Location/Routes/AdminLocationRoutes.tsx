import { Route, Routes } from 'react-router-dom';

import AdminLocationAddressBookList from '../AddressBook/AdminLocationAddressBookList';
import AdminLocationDistrictList from '../District/AdminLocationDistrictList';
import AdminLocationProvinceList from '../Province/AdminLocationProvinceList';
import AdminLocationWardList from '../Ward/AdminLocationWardList';

const AdminLocationRoutes = () => {
  return (
    <Routes>
      <Route path="provinces" element={<AdminLocationProvinceList />} />
      <Route path="districts" element={<AdminLocationDistrictList />} />
      <Route path="wards" element={<AdminLocationWardList />} />
      <Route path="address-books" element={<AdminLocationAddressBookList />} />
    </Routes>
  );
};

export default AdminLocationRoutes;
