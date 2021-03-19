import React from "react";
// import "./App.css";
/* import Card from "./Card"; */
import ControlPanel from "./ControlPanel";
//import { shuffle } from "./utils";
//import Foo from "./Foo";
import Multi from "./Multi";

import { useSpring, animated } from "react-spring";
import { Keyframes } from "react-spring/renderprops";

function App1() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return <animated.div style={props}>I will fade in</animated.div>;
}

const App: React.FC = () => {
  return (
    <div className="App" style={{ maxWidth: "600px", margin: "auto" }}>
      <ControlPanel />
    </div>
  );
};

export default App;
