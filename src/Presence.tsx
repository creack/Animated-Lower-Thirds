import { Settings as SettingsIcon } from "@material-ui/icons";
import { Box, Typography, Paper } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import FormTimers, { timersState } from "./FormTimers";
import { defaultValues, MainSettingsContext } from "./MainSettingsContext";
import Panel from "./Panel";
import { useAppDispatch, useAppSelector } from "./app/store";
import {
  createCard,
  updateCard,
  selectCardById,
} from "./features/cards/cardsSlice";

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
  const card = useAppSelector((state) => selectCardById(state, id));
  //if (!card) throw "Fail: missing card";
  const dispatch = useAppDispatch();

  if (!card) return null;
  return (
    <Panel cardId={card.id}>
      <>
        <SettingsIcon />
        {`${card.name} Settings - ${card.id}`}
      </>
      <FormTimers
        label="Timers"
        disabled={!card.enabled}
        timersState={card.timers}
        handleChange={(timers: Partial<timersState>) => {
          dispatch(updateCard({ id: card.id, timers }));
        }}
      />
    </Panel>
  );
};

const Foo: React.FC = () => {
  const [state, setState] = useState<MainSettings>(defaultValues);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      createCard({
        id: "1",
        name: "Card0",
        iconName: "Settings",
        primaryText: "hellored",
        secondaryText: "world",
        enabled: true,
        visible: true,
        timers: {
          easeInOut: 5,
          active: 25,
          inactive: 420,
          activeLock: false,
          inactiveLock: false,
        },
      }),
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
