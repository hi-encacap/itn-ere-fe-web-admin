import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DropdownProvider } from "@components/Dropdown";

import CommonRoutes from "./app/Routes/CommonRoutes";
import { store } from "./app/store";

import "./locales/config";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CommonRoutes />
      </BrowserRouter>
      <DropdownProvider />
      <ToastContainer />
    </Provider>
  );
};

export default App;
