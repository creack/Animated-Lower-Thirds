// Layout components.
import { Grid, IconButton, Paper } from "@material-ui/core";
// Styles/CSS/Theme.
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// Icons.
import {
  Lock as LockCloseIcon,
  LockOpen as LockOpenIcon,
  Timer as TimerOnIcon,
  TimerOff as TimerOffIcon,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import FormSimpleInput from "./FormSimpleInput";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      "& .MuiInputBase-root": {
        //border: "1px solid pink",
      },
      "& .MuiInputBase-input": {
        //border: "1px solid lightblue",
      },
      "& .MuiInputLabel-root": {
        //border: "1px solid pink",
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
  disabled?: boolean;
  timersState?: Partial<timersState>;
  defaultTimersState: timersState;
  handleChange?: (s: Partial<timersState>) => void;
};

const FormTimers: React.FC<propTypes> = (props): React.ReactElement => {
  const classes = useStyles({ disabled: props.disabled ?? false });

  const [easeInOutDuration, setEaseInOutDuration] = useState(
    props.timersState?.easeInOut,
  );

  const [activeDuration, setActiveDuration] = useState(
    props.timersState?.active,
  );
  const [localActiveLock, setActiveLock] = useState(
    props.timersState?.activeLock,
  );
  const activeLock =
    localActiveLock ||
    (activeDuration === undefined && props.defaultTimersState.activeLock);

  const [inactiveDuration, setInactiveDuration] = useState(
    props.timersState?.inactive,
  );
  const [localInactiveLock, setInacticeLock] = useState(
    props.timersState?.inactiveLock,
  );
  const inactiveLock =
    localInactiveLock ||
    (inactiveDuration === undefined && props.defaultTimersState.inactiveLock);

  const activeLockIcon = (
    <IconButton
      disabled={props.disabled}
      edge="end"
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
  }, [props.timersState, props.defaultTimersState]);

  useEffect(() => {
    props.handleChange?.({
      easeInOut: easeInOutDuration,
      active: activeDuration,
      activeLock: localActiveLock,
      inactive: inactiveDuration,
      inactiveLock: localInactiveLock,
    });
  }, [
    easeInOutDuration,
    activeDuration,
    localActiveLock,
    inactiveDuration,
    localInactiveLock,
  ]);

  return (
    <Paper className={classes.root}>
      <Grid container justify="space-between" alignItems="center" spacing={1}>
        <Grid item xs={4}>
          <FormSimpleInput
            handleChange={updateDuration(setEaseInOutDuration)}
            disabled={props.disabled}
            value={easeInOutDuration?.toFixed()}
            placeholder={props.defaultTimersState.easeInOut.toFixed()}
            label="Ease in-out duration"
            startAdornment="sec"
          />
        </Grid>
        <Grid item xs={4}>
          <FormSimpleInput
            handleChange={updateDuration(setActiveDuration)}
            disabled={props.disabled || activeLock}
            value={!activeLock ? activeDuration?.toFixed() : "Always active"}
            placeholder={props.defaultTimersState.active.toFixed()}
            label="Active duration"
            startAdornment={!activeLock && "sec"}
            endAdornment={activeLockIcon}
          />
        </Grid>
        <Grid item xs={4}>
          <FormSimpleInput
            handleChange={updateDuration(setInactiveDuration)}
            disabled={props.disabled || inactiveLock}
            value={!inactiveLock ? inactiveDuration?.toFixed() : "Disabled"}
            placeholder={props.defaultTimersState.inactive.toFixed()}
            label="Inactive duration"
            startAdornment={!inactiveLock && "sec"}
            endAdornment={inactiveTimerIcon}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormTimers;
