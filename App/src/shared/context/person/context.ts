import { createContext } from "react";

export type PescaContextProps = Record<string, never>;

export const PescaContext = createContext<PescaContextProps | null>(null);
