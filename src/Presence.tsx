import { Settings as SettingsIcon } from "@material-ui/icons";
import { Grid, Box, Typography, Paper } from "@material-ui/core";
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
import FormSimpleInput from "./FormSimpleInput";

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
  const [primaryText, setMainText] = useState<string>("Hello");
  const [secondaryText, setSecondaryText] = useState<string>("World");

  if (!card) return null;

  return (
    <Panel cardId={card.id}>
      <>
        <SettingsIcon />
        {`${card.name} Settings - ${card.id}`}
      </>
      <>
        <Grid container style={{ border: "1px solid red" }}>
          <Grid item style={{ border: "1px solid yellow" }} xs={2}>
            <div
              style={{
                minWidth: "fit-content",
                overflow: "hidden",
                border: "1px solid blue",
              }}
            >
              <img src="//:0" />
            </div>
          </Grid>
          <Grid
            item
            container
            direction="column"
            style={{ border: "1px solid green" }}
            xs={10}
          >
            <Grid item>
              <FormSimpleInput
                label="Main text"
                disabled={!card.enabled}
                value={primaryText}
                handleChange={(v) => setMainText(v)}
              />
            </Grid>
            <Grid item>
              <FormSimpleInput
                label="Secondary text"
                disabled={!card.enabled}
                value={secondaryText}
                handleChange={(v) => setSecondaryText(v)}
              />
            </Grid>
          </Grid>
        </Grid>

        <FormTimers
          label="Timers"
          disabled={!card.enabled}
          timersState={card.timers}
          handleChange={(timers: Partial<timersState>) => {
            dispatch(updateCard({ id: card.id, timers }));
          }}
        />
      </>
    </Panel>
  );
};

const Foo: React.FC = () => {
  const [state, setState] = useState<MainSettings>(defaultValues);

  const dispatch = useAppDispatch();

  useEffect((): void => {
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
