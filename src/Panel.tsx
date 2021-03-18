import React, { useState } from "react";
// Styles/CSS/Theme.
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// Layout components.
import { Grid, Paper, Switch, Collapse } from "@material-ui/core";
// Icons.
import {
  UnfoldLess as UnfoldLessIcon,
  UnfoldMore as UnfoldMoreIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBarGridRoot: {
      //paddingBottom: theme.spacing(1),
    },
    gridRoot: {},
    paperRoot: {
      padding: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    paperDisabled: {
      padding: theme.spacing(1),
      background: theme.palette.action.disabled,
    },
  }),
);

type panelPropTypes = {
  title: React.ReactNode;
  icon?: React.ReactNode;
};

type topBarPropTypes = panelPropTypes & {
  active: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  folded: [boolean, React.Dispatch<React.SetStateAction<boolean>> | null];
};

const TopBar: React.FC<topBarPropTypes> = (props) => {
  const classes = useStyles();

  const [isActive, setIsActive] = props.active;
  const [isFolded, setIsFolded] = props.folded;

  const foldIcon = (
    <div
      onClick={() => {
        setIsFolded?.(!isFolded);
      }}
    >
      {!isFolded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
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
        {props.icon}
        {props.title}
      </Grid>

      <Grid container item sm={2} justify="flex-end" alignItems="center">
        {foldIcon}
        <Switch
          size="small"
          checked={isActive}
          color="primary"
          onChange={() => setIsActive(!isActive)}
        />
      </Grid>
    </Grid>
  );
};

const Panel: React.FC<panelPropTypes> = (props) => {
  const classes = useStyles();

  const activeState = useState<boolean>(true);
  const foldedState = useState<boolean>(false);
  const [isActive] = activeState;
  const [isFolded] = foldedState;

  return (
    <Paper className={isActive ? classes.paperRoot : classes.paperDisabled}>
      <Grid container direction="column" className={classes.gridRoot}>
        <TopBar
          {...props}
          active={activeState}
          folded={isActive ? foldedState : [true, null]}
        />
        <Collapse in={isActive && !isFolded}>{props.children}</Collapse>
      </Grid>
    </Paper>
  );
};

export default Panel;
