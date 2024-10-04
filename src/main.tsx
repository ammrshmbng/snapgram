import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
