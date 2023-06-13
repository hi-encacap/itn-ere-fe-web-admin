import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { DropdownProvider } from "@components/Dropdown";

import CommonRoutes from "./app/Routes/CommonRoutes";
import { store } from "./app/store";

import "./locales/config";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/*",
      element: <CommonRoutes />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <DropdownProvider />
      <ToastContainer />
      <div className="fixed inset-0 z-70 flex items-center justify-center bg-white px-20 text-center lg:hidden">
        Trang này hiện không thể sử dụng trên thiết bị di động. Vui lòng truy cập trên một màn hình có kích
        thước lớn hơn.
      </div>
    </Provider>
  );
};

export default App;
