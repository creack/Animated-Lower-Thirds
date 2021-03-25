import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { SvgIcon } from "@material-ui/core";
import type { timersState } from "../../FormTimers";

export interface Card {
  id: string;
  name: string;
  iconName?: string;

  primaryText: string;
  secondaryText: string;

  visible: boolean;
  enabled: boolean;

  timers: timersState;
}

const cardsAdapter = createEntityAdapter<Card>({
  sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = cardsAdapter.getInitialState();

export const slice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    createCard(state, action) {
      cardsAdapter.upsertOne(state, action.payload);
    },
    updateCard(state, action) {
      const { id, visible, enabled } = action.payload;
      const existingCard = state.entities[id];
      if (existingCard) {
        existingCard.visible = visible ?? existingCard.visible;
        existingCard.enabled = enabled ?? existingCard.enabled;
      }
    },
  },
});

export default slice.reducer;

export const { createCard, updateCard } = slice.actions;

export const {
  selectAll: selectAllCards,
  selectById: selectCardById,
} = cardsAdapter.getSelectors((state: RootState) => state.cards);
