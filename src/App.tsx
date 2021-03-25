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

//const AppAntd: React.FC = () => <DatePicker />;

export default App;

/*
(helm-mode)
(require 'helm-xref)
(define-key global-map [remap find-file] #'helm-find-files)
(define-key global-map [remap execute-extended-command] #'helm-M-x)
*/
