import React, { useState } from "react";

// Styles/CSS/Theme.
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// Layout components.
// eslint-disable-next-line
import { Grid, Paper, Fade, Slide, Button } from "@material-ui/core";

// Icons.
import {
  Filter1 as Filter1Icon,
  Settings as SettingsIcon,
} from "@material-ui/icons";

import FormSimpleInput from "./FormSimpleInput";
import FormTimers from "./FormTimers";
import Panel from "./Panel";
import Card from "./Card";

// eslint-disable-next-line
// @ts-ignore // No type definition provided by the lib.
import { slideInLeft as slideBar } from "react-animations";
import styled, { keyframes } from "styled-components";

const slideInLeft = slideBar;
const slideFoo = keyframes`${slideInLeft}`;
const SlideFooDiv = styled.div`
  animation: infinite 5s ${slideFoo};
  position: absolute;
  left: 100;
`;

export const FooBar0: React.FC = () => {
  return (
    <SlideFooDiv>
      <img src="https://picsum.photos/300/200/?random" />
    </SlideFooDiv>
  );
};

export const FooBar: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.animatedItem}>
      <img src="https://picsum.photos/300/200/?random" />
    </div>
  );
};

const MainSettingsPanel: React.FC = () => {
  return (
    <Panel icon={<SettingsIcon />} title="Main Settings">
      <FormTimers label="Global Times" />
    </Panel>
  );
};

// eslint-disable-next-line
// @ts-ignore // Temp.
// eslint-disable-next-line
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {},
    graphRoot: {
      background: "red",
    },
    graph1: {
      order: 1,
      width: "0.3em",
      height: "8em",
      background: "#47D7AC",
      boxShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",
      position: "absolute",
    },
    graph2: {
      background: "rgba(55,85,112,0.46)",
      opacity: "",
      border: "solid 0rem",
      borderColor: "none",
      borderRadius: "calc(1.24rem * 1.1)",
      boxShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",

      order: 3,
      zIndex: -1,
      position: "absolute",

      left: 50,
      marginRight: "-1.8em",
      paddingRight: "1.8em",
      marginLeft: "-1.8em",
      paddingLeft: "1.8em",
      marginBottom: "-1.8em",
      paddingBottom: "1.8em",
      marginTop: "-1.8em",
      paddingTop: "1.8em",

      width: "100px",
      height: "calc(100% + 2em)",
      margin: "0 -1em",
      padding: "0 1em",

      boxSizing: "border-box",
    },
    animatedItem: {
      animation: `$myEffect 3000ms ${theme.transitions.easing.easeInOut}`,
    },
    "@keyframes myEffect": slideInLeft as any,
    graph4: {},
  }),
);

/* from: {transform: "translate3d(-100%, 0, 0)", visibility: "visible"}
 * to: {transform: "translate3d(0, 0, 0)"}
 *  */

export const Foo: React.FC = () => {
  const classes = useStyles();
  const isRunning = true;
  return (
    <div className={classes.graphRoot}>
      {/* <Slide
            direction="right"
            in={isRunning}
            timeout={4000}
            mountOnEnter
            unmountOnExit
            >
            <div>
            <Fade in={isRunning} timeout={3000}>
            <Paper elevation={4} className={classes.graph1}></Paper>
            </Fade>
            </div>
            </Slide> */}

      <Slide
        direction="right"
        in={isRunning}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.graph2}></div>
      </Slide>
    </div>
  );
};

const Card1Panel: React.FC<{ name: string }> = (props) => {
  const [primaryText, setMainText] = useState<string>("Hello");
  const [secondaryText, setSecondaryText] = useState<string>("World");

  const [isRunning, setIsRunning] = useState<boolean>(false);

  const start = () => {
    setIsRunning(!isRunning);
  };

  console.log("---->", slideInLeft, slideFoo, SlideFooDiv);
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
        <Button onClick={start}>Hello</Button>
        <Foo />
        <FormTimers label={`${props.name} Times`} />
      </Panel>
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
