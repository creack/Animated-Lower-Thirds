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
import Icons from "./Icons";

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
  id?: string;
}> = ({ id = "main" }) => {
  const ctx = useContext(MainSettingsContext);
  const card = useAppSelector((state) => selectCardById(state, id));

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

  if (!card) return null;

  return (
    <>
      <Panel cardId={id}>
        <>
          <Icons name={card.iconName} />
          Main Settings
        </>
        <FormTimers
          handleChange={setTimersState}
          timersState={state.timersState}
        />
      </Panel>
    </>
  );
};

export const Card: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => selectCardById(state, id));
  const mainSettings = useAppSelector((state) => selectCardById(state, "main"));
  const [primaryText, setMainText] = useState<string>("Hello");
  const [secondaryText, setSecondaryText] = useState<string>("World");

  if (!card || !mainSettings) return null;

  return (
    <Panel cardId={card.id} canBeEnabled={!!mainSettings?.enabled}>
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
  const dispatch = useAppDispatch();

  useEffect((): void => {
    dispatch(
      createCard({
        id: "main",
        name: "Main Settings",
        iconName: "Settings",
        primaryText: "hellored",
        secondaryText: "world",
        ...defaultValues,
      }),
    );
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
          easeInOut: undefined,
          active: undefined,
          inactive: undefined,
          activeLock: false,
          inactiveLock: false,
        },
      }),
    );
  }, []);

  return (
    <>
      <MainSettingsPanel />
      <Card id="1" />
    </>
  );
};

export default Foo;
