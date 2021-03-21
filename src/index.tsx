import React from "react";
import ReactDOM from "react-dom";

import App from "./Presence";
import { CssBaseline, Container } from "@material-ui/core";

//import "./index.css";

// NOTE: Material UI doesn't comply with React strict mode. It should be fixed in MaterialUI v5.
//       Disable the strict mode for now. Needed for transitions.
ReactDOM.render(
  <>
    <React.StrictMode>
      <CssBaseline />
      <Container>
        <App />
      </Container>
    </React.StrictMode>
  </>,
  document.getElementById("root"),
);
