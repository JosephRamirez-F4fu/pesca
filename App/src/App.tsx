import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/context";
import { AppTheme } from "./core/components/app-theme";
import { AppRouter } from "./core/router";

export function App() {
  return (
    <AppTheme>
      <AuthProvider>
        <BrowserRouter unstable_useTransitions={false}>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </AppTheme>
  );
}
