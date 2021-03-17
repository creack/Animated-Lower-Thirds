import React, { ReactElement } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { flexGrow: 1 },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }),
);

const NestedGrid: React.FC = (): ReactElement => {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={8} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>item</Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default NestedGrid;
