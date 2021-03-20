import React from "react";
import ReactDOM from "react-dom";

import App from "./AppM";
import { CssBaseline, Container } from "@material-ui/core";

import Card from "./Card";

//import "./index.css";

// NOTE: Material UI doesn't comply with React strict mode. It should be fixed in MaterialUI v5.
//       Disable the strict mode for now. Needed for transitions.
ReactDOM.render(
  <>
    <React.StrictMode>
      <CssBaseline />
      <div
        style={{
          height: window.innerHeight,
          width: window.innerWidth,
        }}
      >
        <Container
          style={{
            position: "absolute",
            bottom: "250px",
            right: "0",
          }}
        >
          <App />
        </Container>
        <Card
          primaryText={"hello"}
          secondaryText={"world"}
          align="right"
          anim={{
            animType: "style-1",
            animDurationMs: 4000,
            activeDurationMs: 500,
          }}
          titleStyle={{
            fontFamily: "Fira Code, monospace",
            fontSize: "1.6em",
            color: "#F2F2F2",
          }}
          textStyle={{
            fontFamily: "Fira Code, monospace",
            fontSize: "1.4em",
            color: "#8A8A8A",
          }}
        />
      </div>
    </React.StrictMode>
  </>,
  document.getElementById("root"),
);
