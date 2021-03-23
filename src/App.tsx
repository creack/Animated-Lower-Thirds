import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider, Theme } from "@material-ui/core";
import { blue, pink } from "@material-ui/core/colors";

import Presence from "./Presence";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    action: {
      disabledBackground: blue[500],
    },
  },
});

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Presence />
      </Container>
    </MuiThemeProvider>
  );
};

export default App;
