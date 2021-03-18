import React, { useState } from "react";

// Styles/CSS/Theme.
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// Layout components.
import { Grid, Paper } from "@material-ui/core";

// Icons.
import {
  Filter1 as Filter1Icon,
  Settings as SettingsIcon,
} from "@material-ui/icons";

import FormSimpleInput from "./FormSimpleInput";
import FormTimers from "./FormTimers";
import Panel from "./Panel";
import Card from "./Card";

const MainSettingsPanel: React.FC = () => {
  return (
    <Panel icon={<SettingsIcon />} title="Main Settings">
      <FormTimers label="Global Times" />
    </Panel>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {},
  }),
);

const Card1Panel: React.FC<{ name: string }> = (props) => {
  const classes = useStyles();

  const [primaryText, setMainText] = useState<string>("Hello");
  const [secondaryText, setSecondaryText] = useState<string>("World");
  return (
    <>
      <Panel icon={<Filter1Icon />} title={props.name}>
        <FormSimpleInput
          label="Main text"
          value={primaryText}
          onChange={(v) => setMainText(v)}
        />
        <FormSimpleInput
          label="Secondary text"
          value={secondaryText}
          onChange={(v) => setSecondaryText(v)}
        />
        <FormTimers label={`${props.name} Times`} />
      </Panel>
      <Paper elevation={4} className={classes.paper}>
        <svg>
          <polygon points="0,0 0,100, 100,100 100,0" />
        </svg>
      </Paper>
      <Card
        primaryText={primaryText}
        secondaryText={secondaryText}
        align="right"
        anim={{
          animType: "style-1",
          animDurationMs: 4000,
          activeDurationMs: 5000,
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
    </>
  );
};

const ControlPanel: React.FC = () => {
  return (
    <div className="ControlPanel">
      <Grid container direction="column" spacing={1}>
        <Grid item sm>
          <MainSettingsPanel />
        </Grid>
        <Grid item sm>
          <Card1Panel name="Card1" />
        </Grid>
      </Grid>
    </div>
  );
};

export default ControlPanel;
