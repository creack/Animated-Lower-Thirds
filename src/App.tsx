import {
  Container,
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";
import React from "react";
import ControlPanel from "./Presence";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

// Hello.
const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <ControlPanel />
      </Container>
    </MuiThemeProvider>
  );
};

export default App;
