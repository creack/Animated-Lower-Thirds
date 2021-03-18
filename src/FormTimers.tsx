import React, { useState } from "react";
// Styles/CSS/Theme.
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// Layout components.
import { Grid, Paper } from "@material-ui/core";
// Icons.
import {
  Lock as LockCloseIcon,
  LockOpen as LockOpenIcon,
  Timer as TimerOnIcon,
  TimerOff as TimerOffIcon,
} from "@material-ui/icons";

import Duration, { unitOfTime } from "./lib/duration";
import FormSimpleInput from "./FormSimpleInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    paperRoot: {},
    paper: {},
  }),
);

type propTypes = {
  label: string;
};

const FormTimers: React.FC<propTypes> = (props) => {
  const classes = useStyles();

  const [easeInOutDuration, setEaseInOutDuration] = useState<Duration>(
    new Duration(4, unitOfTime.Second),
  );

  const [activeLock, setActiveLock] = useState<boolean>(false);
  const [activeDuration, setActiveDuration] = useState<Duration>(
    new Duration(5, unitOfTime.Second),
  );

  const [inactiveTimer, setInactiveTimer] = useState<boolean>(false);
  const [inactiveDuration, setInactiveDuration] = useState<Duration>(
    new Duration(420, unitOfTime.Second),
  );

  const activeLockIcon = (
    <div onClick={() => setActiveLock(!activeLock)}>
      {activeLock ? (
        <LockCloseIcon fontSize="small" color="primary" />
      ) : (
        <LockOpenIcon fontSize="small" />
      )}
    </div>
  );
  const inactiveTimerIcon = (
    <div onClick={() => setInactiveTimer(!inactiveTimer)}>
      {inactiveTimer ? (
        <TimerOnIcon fontSize="small" color="primary" />
      ) : (
        <TimerOffIcon fontSize="small" />
      )}
    </div>
  );

  const updateDuration = (setDuration: (d: Duration) => void) => (
    v: string,
  ) => {
    const n = parseFloat(v);
    const duration = new Duration(n > 0 ? n : 0, unitOfTime.Second);

    setDuration(duration);
    return duration.toFixed();
  };

  return (
    <Paper className={classes.paperRoot}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        spacing={1}
        className={classes.root}
      >
        <Grid item xs={3}>
          {props.label}
        </Grid>
        <Grid item xs={3}>
          <FormSimpleInput
            onChange={updateDuration(setEaseInOutDuration)}
            value={easeInOutDuration.toFixed()}
            label="Ease in-out duration"
            endAbornment={easeInOutDuration.unitAbbrev()}
          />
        </Grid>
        <Grid item xs={3}>
          <Grid container alignItems="flex-end">
            <Grid item xs>
              <FormSimpleInput
                onChange={updateDuration(setActiveDuration)}
                disabled={activeLock}
                value={!activeLock ? activeDuration.toFixed() : "Always active"}
                label="Active duration"
                startAbornment={activeLockIcon}
                endAbornment={!activeLock && activeDuration.unitAbbrev()}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container alignItems="flex-end">
            <Grid item>
              <FormSimpleInput
                onChange={updateDuration(setInactiveDuration)}
                disabled={inactiveTimer}
                value={!inactiveTimer ? inactiveDuration.toFixed() : "Disabled"}
                label="Inactive duration"
                startAbornment={inactiveTimerIcon}
                endAbornment={!inactiveTimer && inactiveDuration.unitAbbrev()}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormTimers;
