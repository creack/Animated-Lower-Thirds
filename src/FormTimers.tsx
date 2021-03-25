import React, { useEffect, useState, useContext } from "react";
// Styles/CSS/Theme.
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// Layout components.
import { Grid, Paper, IconButton, Typography } from "@material-ui/core";
// Icons.
import {
  Lock as LockCloseIcon,
  LockOpen as LockOpenIcon,
  Timer as TimerOnIcon,
  TimerOff as TimerOffIcon,
} from "@material-ui/icons";

import FormSimpleInput from "./FormSimpleInput";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      "& .MuiInputBase-root": {
        //border: "1px solid pink",
      },
      "& .MuiInputBase-input": {
        border: "1px solid lightblue",
      },
      "& .MuiInputLabel-root": {
        border: "1px solid pink",
      },

      display: "flex",
      flexWrap: "wrap",
      marginTop: spacing(1),
      padding: spacing(0.5),
      background: "inherit",
      color: "inherit",
    },
  }),
);

export interface timersState {
  easeInOut: number;
  active: number;
  activeLock: boolean;
  inactive: number;
  inactiveLock: boolean;
}

type propTypes = {
  label: string;
  disabled?: boolean;
  timersState?: Partial<timersState>;
  handleChange?: (s: Partial<timersState>) => void;
};

const FormTimers: React.FC<propTypes> = (props) => {
  const classes = useStyles({ disabled: props.disabled ?? false });

  const [easeInOutDuration, setEaseInOutDuration] = useState(
    props.timersState?.easeInOut,
  );

  const [activeLock, setActiveLock] = useState(
    props.timersState?.activeLock ?? false,
  );
  const [activeDuration, setActiveDuration] = useState(
    props.timersState?.active,
  );

  const [inactiveLock, setInacticeLock] = useState(
    props.timersState?.inactiveLock ?? false,
  );
  const [inactiveDuration, setInactiveDuration] = useState(
    props.timersState?.inactive,
  );

  const activeLockIcon = (
    <IconButton
      disabled={props.disabled}
      onClick={() => setActiveLock(!activeLock)}
    >
      {activeLock ? <LockCloseIcon /> : <LockOpenIcon color="disabled" />}
    </IconButton>
  );
  const inactiveTimerIcon = (
    <IconButton
      disabled={props.disabled}
      edge="end"
      onClick={() => setInacticeLock(!inactiveLock)}
    >
      {inactiveLock ? <TimerOnIcon /> : <TimerOffIcon color="disabled" />}
    </IconButton>
  );

  const updateDuration = (setDuration: (d?: number) => void) => (v: string) => {
    const n = parseFloat(v);
    if (!n) {
      setDuration(undefined);
      return "";
    }
    setDuration(n);
    return n.toFixed();
  };

  useEffect(() => {
    return;
    setActiveLock(props.timersState?.activeLock ?? activeLock);
    setInacticeLock(props.timersState?.inactiveLock ?? inactiveLock);
    setActiveDuration(props.timersState?.active ?? activeDuration);
    setInactiveDuration(props.timersState?.inactive ?? inactiveDuration);
    setEaseInOutDuration(props.timersState?.easeInOut ?? easeInOutDuration);
  }, [props.timersState]);

  useEffect(() => {
    return;
    props.handleChange?.({
      easeInOut: easeInOutDuration,
      active: activeDuration,
      activeLock: activeLock,
      inactive: inactiveDuration,
      inactiveLock: inactiveLock,
    });
  }, [
    easeInOutDuration,
    activeLock,
    activeDuration,
    inactiveLock,
    inactiveDuration,
  ]);

  return (
    <Paper className={classes.root}>
      <Grid container justify="space-between" alignItems="center" spacing={1}>
        <Grid item xs>
          {props.label}
        </Grid>
        <Grid item xs>
          <FormSimpleInput
            handleChange={updateDuration(setEaseInOutDuration)}
            disabled={props.disabled}
            value={easeInOutDuration?.toFixed()}
            label="Ease in-out duration"
            endAdornment={<>sec</>}
          />
        </Grid>
        <Grid item xs>
          <FormSimpleInput
            handleChange={updateDuration(setActiveDuration)}
            disabled={props.disabled || activeLock}
            value={!activeLock ? activeDuration?.toFixed() : "Always active"}
            label="Active duration"
            endAdornment={
              <>
                {!activeLock && "sec"}
                {activeLockIcon}
              </>
            }
          />
        </Grid>
        <Grid item xs>
          <FormSimpleInput
            handleChange={updateDuration(setInactiveDuration)}
            disabled={props.disabled || inactiveLock}
            value={!inactiveLock ? inactiveDuration?.toFixed() : "Disabled"}
            label="Inactive duration"
            endAdornment={
              <>
                {!inactiveLock && "sec"}
                {inactiveTimerIcon}
              </>
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormTimers;
