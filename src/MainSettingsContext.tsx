import { createContext } from "react";
import { timersState } from "./FormTimers";

export interface MainSettingsContext {
  enabled: boolean;
  visible: boolean;
  timersState: timersState;
}

export const defaultValues = {
  enabled: true,
  visible: true,
  timersState: {
    easeInOut: 4,
    active: 25,
    activeLock: false,
    inactive: 420,
    inactiveLock: false,
  },
};

export const MainSettingsContext = createContext<MainSettingsContext>(
  defaultValues,
);
