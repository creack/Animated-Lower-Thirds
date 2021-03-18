import React, { useState } from "react";
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

import Duration, { unitOfTime } from "./lib/duration";
import FormSimpleInput from "./FormSimpleInput";

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
    <IconButton edge="end" onClick={() => setActiveLock(!activeLock)}>
      {activeLock ? (
        <LockCloseIcon fontSize="small" color="primary" />
      ) : (
        <LockOpenIcon fontSize="small" />
      )}
    </IconButton>
  );
  const inactiveTimerIcon = (
    <IconButton edge="end" onClick={() => setInactiveTimer(!inactiveTimer)}>
      {inactiveTimer ? (
        <TimerOnIcon fontSize="small" color="primary" />
      ) : (
        <TimerOffIcon fontSize="small" />
      )}
    </IconButton>
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
        className={classes.gridRoot}
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
          <FormSimpleInput
            onChange={updateDuration(setActiveDuration)}
            disabled={activeLock}
            value={!activeLock ? activeDuration.toFixed() : "Always active"}
            label="Active duration"
            endAbornment={
              <>
                {!activeLock && (
                  <Typography className={classes.abbrev}>
                    {activeDuration.unitAbbrev()}
                  </Typography>
                )}
                {activeLockIcon}
              </>
            }
          />
        </Grid>
        <Grid item xs={3}>
          <FormSimpleInput
            onChange={updateDuration(setInactiveDuration)}
            disabled={inactiveTimer}
            value={!inactiveTimer ? inactiveDuration.toFixed() : "Disabled"}
            label="Inactive duration"
            endAbornment={
              <>
                {!inactiveTimer && (
                  <Typography className={classes.abbrev}>
                    {inactiveDuration.unitAbbrev()}
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
