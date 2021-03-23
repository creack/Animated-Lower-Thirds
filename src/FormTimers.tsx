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
import { MainSettingsContext } from "./MainSettingsContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridRoot: {},
    paperRoot: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: theme.spacing(1),
      padding: theme.spacing(0.5),
    },
    paper: {},
    abbrev: {
      color: theme.palette.text.secondary,
    },
  }),
);

export type timersState = {
  easeInOut: number;
  active: number;
  activeLock: boolean;
  inactive: number;
  inactiveLock: boolean;
};

type propTypes = {
  label: string;
  timersState: Partial<timersState>;
  handleChange?: (s: Partial<timersState>) => void;
};

const FormTimers: React.FC<propTypes> = (props) => {
  const classes = useStyles();

  const [easeInOutDuration, setEaseInOutDuration] = useState<
    number | undefined
  >(props.timersState.easeInOut);

  const [activeLock, setActiveLock] = useState<boolean>(
    props.timersState?.activeLock ?? false,
  );
  const [activeDuration, setActiveDuration] = useState<number | undefined>(
    props.timersState?.active,
  );

  const [inactiveLock, setInacticeLock] = useState<boolean>(
    props.timersState?.inactiveLock ?? false,
  );
  const [inactiveDuration, setInactiveDuration] = useState<number | undefined>(
    props.timersState?.inactive,
  );

  const activeLockIcon = (
    <IconButton edge="end" onClick={() => setActiveLock(!activeLock)}>
      {activeLock ? (
        <LockCloseIcon fontSize="small" color="primary" />
      ) : (
        <LockOpenIcon fontSize="small" />
      )}
    </IconButton>
  );
  const inactiveTimerIcon = (
    <IconButton edge="end" onClick={() => setInacticeLock(!inactiveLock)}>
      {inactiveLock ? (
        <TimerOnIcon fontSize="small" color="primary" />
      ) : (
        <TimerOffIcon fontSize="small" />
      )}
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
    setActiveLock(props.timersState?.activeLock ?? activeLock);
    setInacticeLock(props.timersState?.inactiveLock ?? inactiveLock);
    setActiveDuration(props.timersState?.active ?? activeDuration);
    setInactiveDuration(props.timersState?.inactive ?? inactiveDuration);
    setEaseInOutDuration(props.timersState?.easeInOut ?? easeInOutDuration);
  }, [props.timersState]);

  useEffect(() => {
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
    <Paper className={classes.paperRoot}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={1}
        className={classes.gridRoot}
      >
        <Grid item xs={3}>
          {props.label}
        </Grid>
        <Grid item xs={3}>
          <FormSimpleInput
            onChange={updateDuration(setEaseInOutDuration)}
            value={easeInOutDuration?.toFixed()}
            label="Ease in-out duration"
            endAbornment={"sec"}
          />
        </Grid>
        <Grid item xs={3}>
          <FormSimpleInput
            onChange={updateDuration(setActiveDuration)}
            disabled={activeLock}
            value={!activeLock ? activeDuration?.toFixed() : "Always active"}
            label="Active duration"
            endAbornment={
              <>
                {!activeLock && (
                  <Typography className={classes.abbrev}>{"sec"}</Typography>
                )}
                {activeLockIcon}
              </>
            }
          />
        </Grid>
        <Grid item xs={3}>
          <FormSimpleInput
            onChange={updateDuration(setInactiveDuration)}
            disabled={inactiveLock}
            value={!inactiveLock ? inactiveDuration?.toFixed() : "Disabled"}
            label="Inactive duration"
            endAbornment={
              <>
                {!inactiveLock && (
                  <Typography className={classes.abbrev}>
                    {inactiveDuration}
                  </Typography>
                )}
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
