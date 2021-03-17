import React, { ReactElement, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { UnfoldLess, UnfoldMore } from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";
//import "./Panel.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { flexGrow: 1 },
    paper: {
      padding: theme.spacing(1),
      textAlign: "left",
      alignItems: "center",
      color: theme.palette.text.secondary,
    },
  }),
);

type panelPropTypes = {
  title: React.ReactNode;
  icon?: React.ReactNode;
};

type panelStateTypes = {
  isActive: boolean;
  isFolded: boolean;
};

const Panel: React.FC<panelPropTypes> = (props): ReactElement => {
  const [state, setState] = useState<panelStateTypes>({
    isActive: true,
    isFolded: false,
  });

  const toggleFold = () => setState({ ...state, isFolded: !state.isFolded });
  const toggleActive = () => setState({ ...state, isActive: !state.isActive });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="column">
          <Grid container style={{ background: "red" }} alignItems="center">
            <Grid container xs={10} alignItems="center">
              <Grid item style={{ background: "darkgreen" }}>
                {props.icon}
              </Grid>
              <Grid item style={{ background: "darkred" }}>
                {props.title}
              </Grid>
            </Grid>

            <Grid
              container
              xs={2}
              style={{ background: "lightgray" }}
              alignItems="center"
            >
              <Grid item xs style={{ background: "yellow" }}>
                <div
                  style={{ textAlign: "right", background: "red" }}
                  onClick={toggleFold}
                >
                  {state.isFolded ? <UnfoldLess /> : <UnfoldMore />}
                </div>
              </Grid>

              <Grid item xs style={{ background: "brown" }}>
                <div style={{ background: "pink" }}>
                  <Switch
                    checked={state.isActive}
                    color="primary"
                    onChange={toggleActive}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              {props.children}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Panel;
