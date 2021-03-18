import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
//import "./index.css";

// NOTE: Material UI doesn't comply with React strict mode. It should be fixed in MaterialUI v5.
//       Disable the strict mode for now. Needed for transitions.
// <React.StrictMode>
ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById("root"),
);
