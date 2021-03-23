import { Settings as SettingsIcon } from "@material-ui/icons";
import { Paper } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import FormTimers, { timersState } from "./FormTimers";
import { defaultValues, MainSettingsContext } from "./MainSettingsContext";
import Panel from "./Panel";

type Settings = {
  enabled: boolean;
  visible: boolean;
  timersState: Partial<timersState>;
};

type MainSettings = Settings & {
  timersState: Required<timersState>;
};

type CardSettings = Partial<Settings>;

export const MainSettingsPanel: React.FC<{
  setStateContext: (s: MainSettings) => void;
}> = (props) => {
  const ctx = useContext(MainSettingsContext);

  const [state, setState] = useState<MainSettings>(ctx);

  const setTimersState: (s: Partial<timersState>) => void = (durations) => {
    setState({
      ...state,
      timersState: {
        ...defaultValues.timersState,
        ...Object.fromEntries(
          Object.entries(durations).filter(([, v]) => v !== undefined),
        ),
      },
    });
  };

  const setEnableState = (v: boolean) => {
    setState({ ...state, enabled: v });
  };
  const setVisibleState = (v: boolean) => {
    setState({ ...state, visible: v });
  };

  useEffect(() => {
    props.setStateContext({ ...state });
  }, [state]);

  return (
    <>
      <Panel
        handleEnabledChange={setEnableState}
        handleVisibilityChange={setVisibleState}
        enabled={state.enabled}
        visible={state.visible}
      >
        <>
          <SettingsIcon />
          Main Settings
        </>
        <FormTimers
          label="Global Times"
          handleChange={setTimersState}
          timersState={state.timersState}
        />
      </Panel>
      <div>{JSON.stringify(state)}</div>
    </>
  );
};

export const Card0: React.FC = () => {
  const mainSettings = useContext(MainSettingsContext);

  const [state, setState] = useState<CardSettings>();

  const setTimersState: (s: Partial<timersState>) => void = (durations) => {
    setState({
      ...state,
      timersState: { ...state?.timersState, ...durations },
    });
  };

  const setEnableState = (v: boolean) => {
    if (!mainSettings.enabled) return;
    setState({ ...state, enabled: v });
  };
  const setVisibleState = (v: boolean) => {
    if (!mainSettings.enabled) return;
    setState({ ...state, visible: v });
  };

  return (
    <>
      <Panel
        handleEnabledChange={setEnableState}
        handleVisibilityChange={setVisibleState}
        enabled={
          (mainSettings.enabled && state?.enabled) ?? mainSettings.enabled
        }
        visible={
          (mainSettings.enabled && state?.visible) ?? mainSettings.visible
        }
      >
        <>
          <SettingsIcon />
          Card0 Settings
        </>
        <FormTimers
          label="Card0 Times"
          handleChange={setTimersState}
          timersState={{ ...mainSettings.timersState, ...state?.timersState }}
        />
      </Panel>
      <div>{JSON.stringify(state)}</div>
    </>
  );
};

const Foo: React.FC = () => {
  const [state, setState] = useState<MainSettings>(defaultValues);

  return (
    <div>
      <MainSettingsContext.Provider value={state}>
        <MainSettingsPanel setStateContext={setState} />
        <Card0 />
      </MainSettingsContext.Provider>
    </div>
  );
};

export default Foo;
