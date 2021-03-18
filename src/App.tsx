import React from "react";
// import "./App.css";
/* import Card from "./Card"; */
import ControlPanel from "./ControlPanel";
//import { shuffle } from "./utils";
//import Foo from "./Foo";

const App: React.FC = () => {
  return (
    <div className="App" style={{ maxWidth: "600px", margin: "auto" }}>
      <ControlPanel />
    </div>
  );
};

export default App;
