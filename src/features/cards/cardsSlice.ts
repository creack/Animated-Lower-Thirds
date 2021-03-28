import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { SvgIcon } from "@material-ui/core";
import type { timersState } from "../../FormTimers";

export interface Card {
  id: string;
  name: string;
  iconName?: string;

  primaryText: string;
  primaryTextColor: string;
  secondaryText: string;
  secondaryTextColor: string;

  visible: boolean;
  enabled: boolean;

  timers: Partial<timersState>;
}

export type FullCard = Required<Card> & { timers: Required<timersState> };

export const defaultValues: Card = {
  id: "",
  name: "",
  iconName: "",
  primaryText: "hello",
  primaryTextColor: "#ff0000",
  secondaryText: "world",
  secondaryTextColor: "#00ff00",
  enabled: true,
  visible: true,
  timers: {},
};

export const defaultMainValues: FullCard = {
  ...defaultValues,
  name: "Main",
  iconName: "Settings",
  timers: {
    easeInOut: 5,
    active: 10,
    inactive: 420,
    activeLock: false,
    inactiveLock: false,
  },
};

const cardsAdapter = createEntityAdapter<Card>({
  sortComparer: (a, b) => a.id.localeCompare(b.id),
});

export const slice = createSlice({
  name: "cards",
  initialState: cardsAdapter.getInitialState(),
  reducers: {
    createCard: cardsAdapter.addOne,
    updateCard: cardsAdapter.updateOne,
  },
});

export default slice.reducer;

export const { createCard, updateCard } = slice.actions;

export const MainSettingsCardId = "main";

const { selectAll, selectById } = cardsAdapter.getSelectors(
  (state: RootState) => state.cards,
);

// Lookup selector, can return undefined if id not found.
export const selectAllCards = selectAll;

// Lookup selector, can return undefined if id not found.
export const selectCardById = selectById;

// "must" lookup select, throw exception if id not found.
export const getCardById = (id: string) => (state: RootState): Card => {
  const ret = selectCardById(state, id);
  if (!ret) {
    throw new Error(`Card '${id}' not found in state.`);
  }
  return ret;
};

export const getMainSettings = (state: RootState): FullCard =>
  getCardById(MainSettingsCardId)(state) as FullCard;

const mergeDefaults = <T>(target: Partial<T>, defaults: Required<T>): T => {
  return {
    ...defaults,
    ...(Object.fromEntries(
      Object.entries(target).filter(([, v]) => v !== undefined),
    ) as Partial<T>),
  };
};

export const updateMainSettings = (
  changes: Partial<Card>,
): ReturnType<typeof updateCard> => {
  return updateCard({
    id: MainSettingsCardId,
    changes: {
      ...changes,
      timers: mergeDefaults(changes.timers ?? {}, defaultMainValues.timers),
    },
  });
};
