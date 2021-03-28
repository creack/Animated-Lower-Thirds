import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/store";
import {
  createCard,
  defaultMainValues,
  defaultValues,
  getCardById,
  getMainSettings,
  MainSettingsCardId,
  selectAllCards,
  selectCardById,
  updateCard,
  updateMainSettings,
} from "./features/cards/cardsSlice";
import FormSimpleInput from "./FormSimpleInput";
import FormTimers, { timersState } from "./FormTimers";
import Icons from "./Icons";
import Panel from "./Panel";
import {
  TextFields as TextFieldsIcon,
  FormatBold as FormatBoldIcon,
} from "@material-ui/icons";
import ColorPicker from "./SketchColorPicker";
import Card2 from "./AppM";

export const MainSettingsPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const card = useAppSelector(getMainSettings);

  const [state, setState] = useState(card.timers);

  return (
    <Panel cardId={MainSettingsCardId}>
      <>
        <Icons name={card.iconName} />
        Main Settings
      </>
      <FormTimers
        handleChange={(timers: Partial<timersState>) => {
          dispatch(updateMainSettings({ timers }));
          setState({
            ...state,
            ...timers,
          });
        }}
        timersState={state}
        defaultTimersState={defaultMainValues.timers}
      />
    </Panel>
  );
};

export const Card: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector(getCardById(id));
  const mainSettings = useAppSelector(getMainSettings);

  return (
    <>
      <Panel cardId={card.id} canBeEnabled={!!mainSettings?.enabled}>
        <>
          <Icons name={card.iconName} />
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
            <Grid item container direction="column" xs={10}>
              <Grid item>
                <FormSimpleInput
                  label="Main text"
                  value={card.primaryText}
                  handleChange={(v) =>
                    void dispatch(
                      updateCard({ id: card.id, changes: { primaryText: v } }),
                    )
                  }
                  endAdornment={
                    <Grid container direction="row">
                      <Grid item xs={12} sm={6}>
                        <TextFieldsIcon />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormatBoldIcon />
                      </Grid>
                      <Grid item xs={12}>
                        <ColorPicker
                          handleChangeComplete={(c) => {
                            dispatch(
                              updateCard({
                                id: card.id,
                                changes: { primaryTextColor: c.color },
                              }),
                            );
                          }}
                          color={card.primaryTextColor}
                        />
                      </Grid>
                    </Grid>
                  }
                />
              </Grid>
              <Grid item>
                <FormSimpleInput
                  label="Secondary text"
                  value={card.secondaryText}
                  handleChange={(v) =>
                    void dispatch(
                      updateCard({
                        id: card.id,
                        changes: { secondaryText: v },
                      }),
                    )
                  }
                  endAdornment={
                    <Grid container direction="row">
                      <Grid item xs={12} sm={6}>
                        <TextFieldsIcon />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormatBoldIcon />
                      </Grid>
                      <Grid item xs={12}>
                        <ColorPicker
                          handleChangeComplete={(c) => {
                            dispatch(
                              updateCard({
                                id: card.id,
                                changes: { secondaryTextColor: c.color },
                              }),
                            );
                          }}
                          color={card.secondaryTextColor}
                        />
                      </Grid>
                    </Grid>
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <FormTimers
            timersState={card.timers}
            defaultTimersState={mainSettings.timers}
            handleChange={(timers: Partial<timersState>) => {
              dispatch(updateCard({ id: card.id, changes: { timers } }));
            }}
          />
        </>
      </Panel>
      <Card2
        primaryText={card.primaryText}
        primaryTextColor={card.primaryTextColor}
        secondaryText={card.secondaryText}
        secondaryTextColor={card.secondaryTextColor}
      />
    </>
  );
};

const Foo: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect((): void => {
    dispatch(
      createCard({
        ...defaultMainValues,
        id: MainSettingsCardId,
        name: "Main Settings",
        iconName: "Settings",
      }),
    );
    const cardCount = 1;
    for (let i = 1; i <= cardCount; i++) {
      dispatch(
        createCard({
          ...defaultValues,
          id: `${i}`,
          name: `Card${i}`,
          iconName: `Filter${i}`,
          primaryText: "hellored",
          primaryTextColor: "#F2F2F2",
          secondaryText: "world",
          secondaryTextColor: "#8A8A8A",
        }),
      );
    }
  }, []);

  const mainCard = useAppSelector((state) =>
    selectCardById(state, MainSettingsCardId),
  );
  const cards = useAppSelector(selectAllCards);

  if (!mainCard) {
    return <>Loading...</>;
  }
  return (
    <>
      <MainSettingsPanel />
      {cards
        .filter((card) => card.id !== MainSettingsCardId)
        .map((card) => (
          <Card key={card.id} id={card.id} />
        ))}
    </>
  );
};

export default Foo;
