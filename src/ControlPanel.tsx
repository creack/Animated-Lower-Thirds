// Layout components.
// eslint-disable-next-line
import { BoxProps, Button, Grid, Slide } from "@material-ui/core";
// Styles/CSS/Theme.
import {
  createStyles,
  makeStyles,
  StylesProvider,
} from "@material-ui/core/styles";
// Icons.
import {
  Filter1 as Filter1Icon,
  Settings as SettingsIcon,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Card2 from "./Card2";
import FormSimpleInput from "./FormSimpleInput";
import FormTimers from "./FormTimers";
import slideInLeft from "./lib/animations/SlideInLeft";
import makeAnimation from "./lib/makeAnimation";
import Panel from "./Panel";

import styled, { keyframes, Keyframes } from "styled-components";

import { translate3d } from "./lib/react-animations/utils";
import { Animation } from "./lib/react-animations/types";

const graph1A: Animation = {
  "0%": {
    opacity: 0,
    transform: translate3d("10em", 0, 0),
  },
  "25%": {
    opacity: 0,
    transform: translate3d("10em", 0, 0),
  },
  "50%": {
    opacity: 1,
  },
  "75%": {
    transform: translate3d(0, 0, 0),
  },
  "100%": {
    transform: translate3d(0, 0, 0),
  },
};

const Wrap = styled.div`
  animation: cubic-bezier(0.19, 0.76, 0.32, 1) 1 normal both;
  animation-duration: 5s;
`;

const _ = styled.div``;

const AnimationF: React.FC<BoxProps> = (props) => {
  const [Ann1, setAnn1] = useState<typeof _>(Wrap);

  useEffect(() => {
    setTimeout(() => {
      setAnn1(
        styled(Ann1)`
          animation: cubic-bezier(0.19, 0.76, 0.32, 1) 1 reverse both;
        `,
      );
    }, 6000);
  }, []);

  const Inn = makeAnimation(graph1A, `animation-duration: 5s;`);

  return (
    <div>
      <StylesProvider injectFirst>
        <Ann1 {...props}>
          <div>
            <Inn>
              <div>{props.children}</div>
            </Inn>
          </div>
        </Ann1>
      </StylesProvider>
    </div>
  );
};

export const FooBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AnimationF>
      <div
        style={{
          background: "#47D7AC",
          height: "3.5em",
          width: "0.3em",
          boxShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",
          border: "2px solid blue",
          position: "absolute",
          fontSize: "28px",
          bottom: "6rem",
          left: "4rem",
          flexDirection: "row",

          fontFamily: "Open Sans, sans-serif",
          fontWeight: "normal",
          color: "#F2F2F2",
          textTransform: "none",

          transition: "margin 0.1s",
          marginBottom: "0em",
        }}
      />
    </AnimationF>
  );
};

const MainSettingsPanel: React.FC = () => {
  return (
    <Panel icon={<SettingsIcon />} title="Main Settings">
      <FormTimers label="Global Times" />
    </Panel>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    animf: {
      animationDuration: "5s",
    },
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
    empty: {},
    graph4: {
      background: "rgba(55,85,112,0.46)",
      opacity: "",
      border: "solid 0rem",
      borderColor: "none",
      borderRadius: "calc(1.24rem * 1.1)",
      boxShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",

      order: 3,
      zIndex: -1,
      position: "absolute",

      right: "50px",
      bottom: "50px",

      width: "100px",
      height: "8em",
      margin: "0 -1em",
      padding: "0 1em",

      boxSizing: "border-box",
    },

    graph001: {
      position: "absolute",
      top: "50px",
      right: "50px",
      order: 1,
      width: "0.3em",
      height: "8em",
      background: "#47D7AC",
      boxShadow: "0.1rem 0.1rem 0.2rem rgba(0,0,0,0.5)",
    },
  }),
);

/* from: {transform: "translate3d(-100%, 0, 0)", visibility: "visible"}
 * to: {transform: "translate3d(0, 0, 0)"}
 *  */

export const Foo: React.FC = () => {
  const classes = useStyles();
  const isRunning = true;
  return <></>;
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
        direction="left"
        in={isRunning}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.graph4}></div>
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
        <FormTimers label={`${props.name} Times`} />
      </Panel>
      <Card2 />
      {true && (
        <Card
          primaryText={primaryText}
          secondaryText={secondaryText}
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
      )}
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
