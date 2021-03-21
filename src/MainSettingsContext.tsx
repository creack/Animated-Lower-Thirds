import { createContext } from "react";

export interface MainSettingsContext {
  isActive: boolean;
}

export const MainSettingsContext = createContext<MainSettingsContext>({
  isActive: false,
});
