import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { DropdownProvider } from '@components/Dropdown';

import CommonRoutes from './app/Routes/CommonRoutes';
import { store } from './app/store';
import './locales/config';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CommonRoutes />
      </BrowserRouter>
      <DropdownProvider />
    </Provider>
  );
};

export default App;
