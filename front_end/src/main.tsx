import { createRoot } from 'react-dom/client'
import 'node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './routes/AppRouter.tsx'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { Provider } from 'react-redux';
// import "./services/axios-global.js";
import './api/axios-global'
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ConfirmDialog />
      <Toaster position="top-center"
        reverseOrder={false} />
    </PersistGate>

  </Provider>,
)
