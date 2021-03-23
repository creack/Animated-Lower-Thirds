import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";

import counterReducer from "../features/counter/counterSlice";
import cardsReducer from "../features/cards/cardsSlice";
import { useDispatch, useSelector } from "react-redux";

const reducers = combineReducers({
  counter: counterReducer,
  cards: cardsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["REMOVE ME"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export const useAppSelector: <T>(s: (state: RootState) => T) => T = (s) =>
  useSelector(s);
