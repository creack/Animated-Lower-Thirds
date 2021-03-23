import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Card {
  id: string;

  primaryText: string;
  secondaryText: string;
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
      cardsAdapter.addOne(state, action.payload);
    },
    updateCard(state, action) {
      console.log(state, action);
    },
  },
});

export default slice.reducer;

export const { createCard } = slice.actions;

export const { selectAll: selectAllCards } = cardsAdapter.getSelectors(
  (state: RootState) => state.cards,
);
