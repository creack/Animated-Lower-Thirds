import { Settings as SettingsIcon } from "@material-ui/icons";
import { Paper } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import FormTimers, { timersState } from "./FormTimers";
import { defaultValues, MainSettingsContext } from "./MainSettingsContext";
import Panel from "./Panel";
import { useAppDispatch, useAppSelector } from "./app/store";
import { createCard, selectCardById } from "./features/cards/cardsSlice";

type Settings = {
  enabled: boolean;
  visible: boolean;
  timersState: Partial<timersState>;
};

type MainSettings = Settings & {
  timersState: Required<timersState>;
};

//type CardSettings = Partial<Settings>;

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
      <Panel cardId="0">
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

export const Card0: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => selectCardById(state, id));
  //if (!card) throw "Fail: missing card";
  if (!card) return null;
  return (
    <>
      <Panel cardId={card.id}>
        <>
          <SettingsIcon />
          {`Card Settings - ${id}`}
        </>
        <>{`hello ${card.primaryText}`}</>
      </Panel>
    </>
  );
  //<FormTimers label="Card0 Times" />
};

const Foo: React.FC = () => {
  const [state, setState] = useState<MainSettings>(defaultValues);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      createCard({ id: "1", primaryText: "hellored", secondaryText: "world" }),
    );
  }, []);

  return (
    <div>
      <MainSettingsContext.Provider value={state}>
        <MainSettingsPanel setStateContext={setState} />
        <Card0 id="1" />
      </MainSettingsContext.Provider>
    </div>
  );
};

export default Foo;
