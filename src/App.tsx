import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import ControlPanel from "./Presence";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <ControlPanel />
      </Container>
    </MuiThemeProvider>
  );
};

export default App;
