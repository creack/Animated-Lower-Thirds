import React from "react";
import store from "./app/store";
import { Provider } from "react-redux";
import App from "./App2";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const a = () => {
  const persistor = persistStore(store);

  const App2: React.FC = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
  return App2;
};

const b = () => {
  const App2: React.FC = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
  return App2;
};

export default a();
