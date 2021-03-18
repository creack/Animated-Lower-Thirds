import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { UnfoldLess, UnfoldMore } from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";

import "./Form.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBarGridRoot: {
      paddingBottom: theme.spacing(1),
    },
    gridRoot: {},
    paperRoot: {
      padding: theme.spacing(1),
      alignItems: "center",
      color: theme.palette.text.secondary,
    },
  }),
);

type panelPropTypes = {
  title: React.ReactNode;
  icon?: React.ReactNode;
};

type topBarPropTypes = panelPropTypes & {
  isActive: boolean;
  setIsActive: (b: boolean) => void;
  isFolded: boolean;
  setIsFolded: (b: boolean) => void;
};

const TopBar: React.FC<topBarPropTypes> = (props) => {
  const classes = useStyles();

  const foldIcon = (
    <div onClick={() => props.setIsFolded(!props.isFolded)}>
      {props.isFolded ? <UnfoldLess /> : <UnfoldMore />}
    </div>
  );

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.topBarGridRoot}
    >
      <Grid container item sm={10} alignItems="center">
        <Grid item>{props.icon}</Grid>
        <Grid item>{props.title}</Grid>
      </Grid>

      <Grid container item sm={2} justify="flex-end" alignItems="center">
        <Grid item>{foldIcon}</Grid>

        <Grid item>
          <Switch
            size="small"
            checked={props.isActive}
            color="primary"
            onChange={() => props.setIsActive(!props.isActive)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const Panel: React.FC<panelPropTypes> = (props) => {
  const classes = useStyles();

  const [isActive, setIsActive] = useState<boolean>(true);
  const [isFolded, setIsFolded] = useState<boolean>(false);

  return (
    <Paper className={classes.paperRoot}>
      <Grid container direction="column" className={classes.gridRoot}>
        <Grid container>
          <TopBar
            {...props}
            isActive={isActive}
            setIsActive={setIsActive}
            isFolded={isFolded}
            setIsFolded={setIsFolded}
          />
        </Grid>
        <Grid item>{props.children}</Grid>
      </Grid>
    </Paper>
  );
};

export default Panel;
