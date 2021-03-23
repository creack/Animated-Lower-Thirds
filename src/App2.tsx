import React from "react";
//import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
//import "./App.css";

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "./app/store";
import { createCard, selectAllCards } from "./features/cards/cardsSlice";

const Div = styled.div`
  background: lightgreen;
  height: 50px;
  width: 200px;
`;

function App(): React.ReactElement {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectAllCards);

  return (
    <>
      <Counter />
      <Div
        onClick={() =>
          dispatch(createCard({ primaryText: new Date().toISOString() }))
        }
      >
        {JSON.stringify(cards)}
      </Div>
    </>
  );
}

export default App;
