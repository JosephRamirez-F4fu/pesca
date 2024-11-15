import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  ViajeProvider,
  PescaProvider,
  GastoProvider,
  FlotaProvider,
} from "@/context";
import { AppRouter } from "./router/appRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ViajeProvider>
      <PescaProvider>
        <GastoProvider>
          <FlotaProvider>
            <AppRouter />
          </FlotaProvider>
        </GastoProvider>
      </PescaProvider>
    </ViajeProvider>
  </StrictMode>
);
