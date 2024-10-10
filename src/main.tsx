import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Analytics } from '@vercel/analytics/react'; // Impor Analytics
import { store } from "./redux/store";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";
import { ThemeProvider } from "./components/shared/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Analytics /> 
              <App />
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
